// 引入http模块
var http = require('http');
// 创建服务
const serve = http.createServer(
    function (req, res) {
        console.log(req.url);
        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("大家好，我是阿宝哥。感谢你阅读“你不知道的WebSocket”");
    }
)
serve.on("upgrade", function (req, socket) {
    console.log(req.headers);
    if (req.headers['upgrade'] !== "websocket") {
        socket.end("HTTP/1.1 400 Bad Request");
        return;
    }
    const secWsKey = req.headers["sec-websocket-key"];
    const hash = generateAcceptValue(secWsKey);
    // 设置HTTP响应头
    const responseHeaders = [
        "HTTP/1.1 101 Web Socket Protocol Handshake",
        "Upgrade: WebSocket",
        "Connection: Upgrade",
        `Sec-WebSocket-Accept: ${hash}`,
    ];
    // 返回握手请求的响应信息
    socket.write(responseHeaders.join("\r\n") + "\r\n\r\n");
})
// 启动服务
serve.listen(8080, function () {
    console.log(`Server running at http://localhost:8080`)
})




const crypto = require("crypto");
const MAGIC_KEY = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
function generateAcceptValue(secWsKey) {
    return crypto
        .createHash("sha1")
        .update(secWsKey + MAGIC_KEY, "utf8")
        .digest("base64");
}