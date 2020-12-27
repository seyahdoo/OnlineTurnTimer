const express = require('express')
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
const cors = require('cors')

const db = {}

const socketsToRooms = {}

const port = process.env.PORT || 5000

app.use(cors())

app.use(express.static('build'))

app.get('/api/room/:roomId', (req, res) => {
    // res.send("asdasd!11s!")
    res.send('11Hello world!s' + req.params.roomId)
})

app.get('/api/set-timer', (req, res) => {
    res.send('Hello world!')
})

io.on('connection', (socket) => {
    console.log('a user connected');
    // socket.on('set', (msg) => {
    //     console.log('set msg: ' + msg)
    //     socket.emit('custom', "6969")
    // })

    socket.on('create_room', () => {
        socketsToRooms[socket.id] = '1234'
        db['1234'] = {}
        socket.join('1234')
        socket.to('1234').emit('room_created', {
            room: '1234'
        })
    })

    socket.on('join_room', (req) => {
        const room = req.room
        if (!room) {
            console.log('join: No room code specified, skipping')
            return
        }
        socketsToRooms[socket.id] = '1234'
        socket.join('1234')
        socket.to('1234').emit('room_joined', {
            room: '1234',
            id: socket.id
        })
    })

    socket.on('set_timer', (room, timer) => {
        if (!room) {
            console.log('set: No room code specified, skipping');
            return
        }
        if (!db[room]) {
            console.log('Room', room, 'doesnt exist');
            return
        }
        console.log('timer update received:', room, timer);
        db[room].timer = timer;
        socket.to(room).emit('timer_changed', room, timer);
    })

    socket.on('get_timer', (req) => {
        socket.to(socket.id).emit('timer_changed', db.timer)
    })

    io.on('custom', (msg) => {
        console.log('custom: ' + msg)
    })
});

http.listen(port, () => {
    console.log('listening on *:', port);
});
