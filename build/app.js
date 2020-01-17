"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _helmet = _interopRequireDefault(require("helmet"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _userRouter = _interopRequireDefault(require("./routers/userRouter"));

var _videoRouter = _interopRequireDefault(require("./routers/videoRouter"));

var _globalRouter = _interopRequireDefault(require("./routers/globalRouter"));

var _apiRouter = _interopRequireDefault(require("./routers/apiRouter"));

var _routes = _interopRequireDefault(require("./routes"));

var _middlewares = require("./middlewares");

var _passport = _interopRequireDefault(require("passport"));

var _expressSession = _interopRequireDefault(require("express-session"));

require("./passport");

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//const express = require('express')
var app = (0, _express["default"])();
var cookieStore = (0, _connectMongo["default"])(_expressSession["default"]); //해당 URL로 접근하면 fucntion 호출함
//handleHome이 완료되기전까지 betwwenHome이 실행되는 함수라는 뜻임
//이런 경우에 bewteenHome을 미들웨어라고 하는것임
//app.use(betweenHome); 이 함수를 모든 함수의 미들웨어로 use하겠다는 뜻
//미들웨어 설정은 순서가 중요함 프로필위에 넣었으면 프로필 접속할때만 미들웨어가 실행됐을거임
//pug 설정

app.use((0, _helmet["default"])()); //view directory 설정하고싶으면
//app.set("view", "디렉토리경로")

app.set("view engine", "pug");
app.set("views", _path["default"].join(__dirname, "views")); //비디오 재생

app.use("/uploads", _express["default"]["static"]("uploads")); //webpack에서 사용할 정적 파일 불러옴

app.use("/static", _express["default"]["static"](_path["default"].join(__dirname, "static")));
app.use((0, _cookieParser["default"])()); //json에 대한 데이터도 서버가 이해해줬음 좋겠음

app.use(_bodyParser["default"].json()); //form에서 받은 데이터를 서버가 이해해줬음좋겠음

app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use((0, _morgan["default"])("dev"));
app.use((0, _expressSession["default"])({
  secret: process.env.COOKIE_SECRET,
  resave: true,
  saveUninitialized: false,
  store: new cookieStore({
    mongooseConnection: _mongoose["default"].connection
  })
}));
app.use(_passport["default"].initialize());
app.use(_passport["default"].session());
app.use(_middlewares.localMiddleware);
app.use(_routes["default"].home, _globalRouter["default"]);
app.use(_routes["default"].users, _userRouter["default"]);
app.use(_routes["default"].videos, _videoRouter["default"]);
app.use(_routes["default"].api, _apiRouter["default"]);
var _default = app;
exports["default"] = _default;