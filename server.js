const express = require("express");
const path = require("path");
const socketio = require("socket.io");


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
    //console.log("New connection is connected...");

    //Welcome current user
    socket.emit('message','Welcome to ChatCord');

    //Broadcast when a user connects
    socket.broadcast.emit("message","A person has joined the chat");

    //Run when a client discount
    socket.on('disconnect',()=>{
        io.emit("message","A person has just left the chat");
    })

    //Listen for chatMessage
    socket.on("chatMessage",(msg)=>{
        io.emit("message",msg);
    })
})