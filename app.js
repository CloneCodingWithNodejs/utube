
//const express = require('express')
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter  from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

const app = express()


const betweenHome = (req, res, next) => {
    console.log("I'm between");
    next(); //다음 미들웨어를 호출
};


//해당 URL로 접근하면 fucntion 호출함 
//handleHome이 완료되기전까지 betwwenHome이 실행되는 함수라는 뜻임 
//이런 경우에 bewteenHome을 미들웨어라고 하는것임 
//app.use(betweenHome); 이 함수를 모든 함수의 미들웨어로 use하겠다는 뜻 
//미들웨어 설정은 순서가 중요함 프로필위에 넣었으면 프로필 접속할때만 미들웨어가 실행됐을거임 

app.use(cookieParser());
//form에서 받은 데이터를 서버가 이해해줬음좋겠음 
app.use(bodyParser.urlencoded({extended:true}));
//json에 대한 데이터도 서버가 이해해줬음 좋겠음 
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("dev"));

app.use("/", globalRouter);
app.use("/users",userRouter);
app.use("/videos",videoRouter);

export default app;