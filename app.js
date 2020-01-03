
//const express = require('express')
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter  from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes"
import { localMiddleware  } from "./middlewares";

const app = express()





//해당 URL로 접근하면 fucntion 호출함 
//handleHome이 완료되기전까지 betwwenHome이 실행되는 함수라는 뜻임 
//이런 경우에 bewteenHome을 미들웨어라고 하는것임 
//app.use(betweenHome); 이 함수를 모든 함수의 미들웨어로 use하겠다는 뜻 
//미들웨어 설정은 순서가 중요함 프로필위에 넣었으면 프로필 접속할때만 미들웨어가 실행됐을거임 

//pug 설정 
app.use(helmet());
app.set("view engine", "pug");

//비디오 재생 
app.use("/uploads", express.static("uploads"));

//view directory 설정하고싶으면 
//app.set("view", "디렉토리경로")
app.use(cookieParser());
//json에 대한 데이터도 서버가 이해해줬음 좋겠음 
app.use(bodyParser.json());
//form에서 받은 데이터를 서버가 이해해줬음좋겠음 
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan("dev"));



app.use(localMiddleware);

app.use(routes.home,globalRouter);
app.use(routes.users,userRouter);
app.use(routes.videos,videoRouter);

export default app;