const express = require('express')
const app = express()

const PORT = 4000;

function handleListening(){
    console.log('Listening on : http://localhost:${PORT}');
}

//request, response Object 파라미터 
function handleHome(req,res){
 res.send("Hello from Home");
}

function handleProfile(req,res){
    res.send("You are on my profile");
}

// 루트 URL로 접근하여 fucntion 호출함 
app.get("/",handleHome)

app.get("/profile",handleProfile);

//4000번 포트를 리스닝하고 function 호출해라 
app.listen(PORT, handleListening);