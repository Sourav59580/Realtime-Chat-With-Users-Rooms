
const users = [];

function userJoin(id,username,room){
    const user = {id,username,room};
    users.push(user);
    return user;
}

//Get current user
function getCurrentUser(id){
    return users.find((users)=>users.id === id);
}

//User leave the chat
function userLeave(id){
    var index = users.findIndex(users => users.id ===id)
    
    if(index!==-1){
        return users.splice(index,1)[0];
    }
}

//Get room users
function getRoomUsers(room){
    return users.filter(users => users.room === room)
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
};