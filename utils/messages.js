const moment = require('moment');

function formateMessage(username,userstatus,text){
    return {
        username,
        text,
        userstatus,
        time : moment().format("h:mm a")
    }
}

module.exports = formateMessage;