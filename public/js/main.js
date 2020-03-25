const socket = io();
var msgbox = document.querySelector(".chat-messages");

//get username and room
const { username , room } = Qs.parse(location.search,{
    ignoreQueryPrefix : true
});

//send server username and room
socket.emit('joinroom',{ username , room });
console.log(username , room);



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
    if(message.userstatus=='own')
    {
       var div1 = document.createElement("DIV");
       div1.className = "media media-chat media-chat-reverse";

       var div2 = document.createElement("DIV");
       div2.className = "media-body";

       var p = document.createElement("P");
       p.innerHTML = `${message.text} <small class="ml-3">${message.time}</small>`;

       div2.appendChild(p);
       div1.appendChild(div2);

       var msgbox = document.querySelector(".chat-messages");
       msgbox.appendChild(div1);

        
    }
    else if(message.userstatus=='other'){
        var div1 = document.createElement("DIV");
        div1.className = "media media-chat";
        
        var img = document.createElement("IMG");
        img.src = 'https://img.icons8.com/color/36/000000/administrator-male.png';
        img.className = "avatar";

        div1.appendChild(img);

        var div2 = document.createElement("DIV");
        div2.className = "media-body";

        var p1 = document.createElement("P");
        p1.innerHTML = `<small>${message.username}</small><br>${message.text}`;
        div2.appendChild(p1);

        var p2 = document.createElement("P");
        p2.className = "meta";
        p2.innerHTML = `<time datetime="2018">${message.time}</time>`;
        div2.appendChild(p2);

        div1.appendChild(div2);

        var msgbox = document.querySelector(".chat-messages");
        msgbox.appendChild(div1);


    }
    else{
        var div = document.createElement("DIV");
        div.className = 'text-center';
        
        var button = document.createElement("button");
        button.className = "btn border-0 rounded btn-md shadow-sm px-4";
        button.innerHTML = `${message.text}`;
        button.style.cursor = 'default';

        div.appendChild(button);

        var msgbox = document.querySelector(".chat-messages");
        msgbox.appendChild(div);

    }
    
    // var div = document.createElement("DIV");
    // div.className = "msg-box bg-primary text-light px-4 py-1 mb-3";
    // div.style.borderRadius = "2px 50px 2px 30px";

    // div.innerHTML = `${message.username} <span> ${message.time}</span></Brand><p>${message.text}</p>`;

    // var msgbox = document.querySelector(".chat-messages");
    // msgbox.appendChild(div);
}