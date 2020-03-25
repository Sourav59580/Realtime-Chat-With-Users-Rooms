const socket = io();

var msgbox = document.querySelector(".chat-messages");

socket.on('message', message =>{
    console.log(message);
    outputMessage(message);

    //scroll down
    msgbox.scrollTop = msgbox.scrollHeight;
})

const chatForm = document.getElementById("chat-form");
const message = document.getElementById("msg")

chatForm.addEventListener("submit",(e)=>{
    e.preventDefault();

    //Get Message Text value
    var msg = e.target.elements.msg.value;

    //Message send to server
    socket.emit("chatMessage",msg);

    //Clear after submit
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();

    
})

//Output message function
function outputMessage(message){
    var div = document.createElement("DIV");
    div.className = "msg-box bg-primary text-light px-4 py-1 mb-3";
    div.style.borderRadius = "2px 50px 2px 30px";

    div.innerHTML = `Brand <span> 9:20pm</span></Brand><p>${message}</p>`;

    var msgbox = document.querySelector(".chat-messages");
    msgbox.appendChild(div);
}