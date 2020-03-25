const express = require("express");
const path = require("path");
const socketio = require("socket.io");
const formateMessage = require('./utils/messages');
const { userJoin,getCurrentUser,userLeave,getRoomUsers } = require("./utils/users");

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
       //user join 
       const user = userJoin(socket.id,username,room);

       socket.join(user.room);

       //Welcome current user
       socket.emit('message',formateMessage('ChatCord','own','Welcome to ChatCord'));

       //Broadcast when a user connects
       socket.broadcast.to(user.room).emit("message",formateMessage(`${user.username}`,'other',`${user.username} has joined the chat`));

       //Send users and room info
       socket.to(user.room).emit("roomUsers",{
           room : user.room,
           users : getRoomUsers(user.room)
       })
       
    });

    

    //Run when a client discount
    socket.on('disconnect',()=>{
        const user = userLeave(socket.id);
        if(user){
            io.to(user.room).emit("message",formateMessage(`${user.username}`,'all',`${user.username} has just left the chat`));
        }

        //Send users and room info
       socket.to(user.room).emit("roomUsers",{
        room : user.room,
        users : getRoomUsers(user.room)
      })
       
    })

    //Listen for chatMessage
    socket.on("chatMessage",(msg)=>{
        //get current user
       var user = getCurrentUser(socket.id);
       console.log(user);

       //Send users and room info
       socket.to(user.room).emit("roomUsers",{
        room : user.room,
        users : getRoomUsers(user.room)
       })

        //own see mesg
        socket.emit("message",formateMessage(`${user.username}`,'own',msg));

        //other people send msg
        socket.broadcast.to(user.room).emit("message",formateMessage(`${user.username}`,'other',msg));
    })
})