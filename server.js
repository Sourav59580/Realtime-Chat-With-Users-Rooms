const express = require("express");



const app = express();

//connection create
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("Server is running at port 3000");
    
})