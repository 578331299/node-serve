const express = require('express')
const app = express()
app.listen(3000, (req, res) => {
    console.log('server is runing');
})
app.get('/api/list', (req, res) => {
    res.send(
        [
            {
                name: 'zangsan',
                age: 10
            }
        ]
    )
})