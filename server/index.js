const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors')
const router = require('./router')
const {addUser,removeUser,getUser, getUsersInRoom} = require('./users.js')
const app = express()


app.use(cors())


const port = process.env.PORT || 5000
const server = http.createServer(app)

const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
}
)

io.on("connection", (socket) => {
    socket.on('join',({name,room}, callback)=>{
        const user =addUser({id:socket.id,name,room})
        console.log(user)
        // if(error) return callback(error)

        socket.emit('message', {user:'admin',text:`${user.name}, welcome to room ${user.room}`})
        socket.to(user.room).emit('message',{user:'admin',text:`${user.name} has joined!`})
        socket.join(user.room)

        callback()
    })

    socket.on('sendMessage',(message, callback)=>{
        const user = getUser(socket.id)
        io.to(user.room).emit('message',{user:user.name, text:message})

        callback()
    })

    socket.on('disconnect',()=>{
        console.log('User just left')
    })
});

app.use(router)

server.listen(port, ()=> console.log(`Server running on port ${port}`))