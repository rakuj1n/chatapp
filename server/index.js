const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const messagesRoutes = require('./routes/messagesRoutes')

const app = express()
const socket = require('socket.io')
require('dotenv').config()
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB Connection Successful")
}).catch((err) => {
    console.log(err.message)
})

app.use(cors())
app.use(express.json())

app.use('/api/auth',userRoutes)
app.use('/api/messages',messagesRoutes)

const server = app.listen(process.env.PORT,() => {
    console.log(`Server started on port ${process.env.PORT}`)
})

const io = socket(server,{
    cors:{
        origin:"https://chatapp-nwqr.onrender.com/",
        credentials: true,
    }
})

global.onlineUsers = new Map()

io.on('connection',(socket) => {
    global.chatSocket = socket
    socket.on('add-user',(userId) => {
        console.log("added user",userId, socket.id)
        onlineUsers.set(userId, socket.id)
    })
    socket.on("send-msg",(data) => {
        console.log("sent msg",data)
        const sendUserSocket = onlineUsers.get(data.to)
        if (sendUserSocket) {
            console.log("emit",data)
            socket.to(sendUserSocket).emit('msg-receive', data.message)
        }
    })
})