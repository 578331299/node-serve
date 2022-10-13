// 引入http模块
var http = require('http');
// 创建服务
const serve = http.createServer(
    function (request, response) {
        console.log(request.url);
        response.setHeader("content-type", "text/html;charset=utf8")
        response.end('发送成功');
    }
)
// 启动服务
serve.listen(8080, function () {
    console.log('服务器已开启，请访问8080端口')
})