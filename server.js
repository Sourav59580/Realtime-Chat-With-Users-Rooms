const express = require("express");
const path = require("path");
const socketio = require("socket.io");
const formateMessage = require('./utils/messages');

const app = express();

//set static file
app.use(express.static(path.join(__dirname,"public")));


//Routes
app.get("/",(req,res)=>{
    res.sendFile("index.html");
})

//connection create
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT,()=>{
    console.log("Server is running at port 3000");
    
})

//socket.io connection
const io = socketio(server); 

//Run when client connects
io.on("connection", socket =>{
    
    //Get username and room
    socket.on('joinRoom',({username,room})=>{
    //Welcome current user
    socket.emit('message',formateMessage('ChatCord','own','Welcome to ChatCord'));

    //Broadcast when a user connects
    socket.broadcast.emit("message",formateMessage('Souav','other',"A person has joined the chat"));
       
    });

    

    //Run when a client discount
    socket.on('disconnect',()=>{
        io.emit("message",formateMessage('Sourav','all',"A person has just left the chat"));
    })

    //Listen for chatMessage
    socket.on("chatMessage",(msg)=>{
        //own see mesg
        socket.emit("message",formateMessage('USER','own',msg));

        //other people send msg
        socket.broadcast.emit("message",formateMessage('USER','other',msg));
    })
})