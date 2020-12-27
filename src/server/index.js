const express = require('express')
const app = express()
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const port = process.env.PORT || 5000

app.use(express.static('build'))

app.get('/api/room/:roomId', (req, res) => {
    // res.send("asdasd!11s!")
    res.send('Hello world!' + req.params.roomId)
})

app.get('/api/set-timer', (req, res) => {
    res.send('Hello world!')
})

io.on('connection', (socket) => {
    console.log('a user connected');
});

// app.listen(port, () => {
//     console.log("App running on port", port)
// })

http.listen(port, () => {
    console.log('listening on *:', port);
});
