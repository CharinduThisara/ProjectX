const express = require('express');
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const {Server} = require("socket.io")
const userRoutes = require("./routes/userRoutes")
const messageRoutes = require("./routes/messageRoute")


const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth",userRoutes)
app.use("/api/messages",messageRoutes)

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("DB connected")
}).catch((err)=>{
    console.log(err.message);
})

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        credentials:true,   
        methods:["GET","POST"],
    }
})  

// io.on("connection",(socket)=>{
//     console.log("User connected",socket.id);

//     socket.on("join_room",(data)=>{
//         socket.join(data);
//         console.log(`User with ID: ${socket.id} joined room: ${data}`);
//     })

//     socket.on('send_message',(data)=>{
//         socket.to(data.room).emit('receive_message',data);
//         console.log(data);
//     })

//     socket.on("disconnect",()=>{
//         console.log("User Disconnected", socket.id);
//     })
// })

server.listen(process.env.PORT,()=>{
    console.log("Server Running");
})

global.onlineUsers = new Map();

io.on( "connection", (socket)=>{
    global.chatSocket = socket;
    socket.on("add-user",(userID)=>{
        onlineUsers.set(userID,socket.id);
    });

    socket.on("send-msg",(data)=>{
        const sendUserSocket = onlineUsers.get(data.to)

        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-received",data.msg);

        }
    });
    
});     