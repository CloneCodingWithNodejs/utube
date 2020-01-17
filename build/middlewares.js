"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadAvatar = exports.uploadVideo = exports.onlyPrivate = exports.onlyPublic = exports.localMiddleware = void 0;

var _routes = _interopRequireDefault(require("./routes"));

var _multer = _interopRequireDefault(require("multer"));

var _multerS = _interopRequireDefault(require("multer-s3"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var s3 = new _awsSdk["default"].S3({
  secretAccessKey: process.env.AWS_SECRET,
  accessKeyId: process.env.AWS_ACCESSKEY
}); //local에 저장하는 방식
// const multerVideo = multer({ dest: "uploads/videos/" });
// const multerAvater = multer({ dest: "uploads/avatars" });
//S3에 저장하는 방식

var multerVideo = (0, _multer["default"])({
  storage: (0, _multerS["default"])({
    s3: s3,
    acl: "public-read",
    bucket: "utube-com/video"
  })
});
var multerAvater = (0, _multer["default"])({
  storage: (0, _multerS["default"])({
    s3: s3,
    acl: "public-read",
    bucket: "utube-com/avatar"
  })
});

var localMiddleware = function localMiddleware(req, res, next) {
  res.locals.siteName = "Utube";
  res.locals.routes = _routes["default"];
  res.locals.loggedUser = req.user || null;
  next();
}; //로그인한 사용자가 접근하지 못하도록 하는 미들웨어


exports.localMiddleware = localMiddleware;

var onlyPublic = function onlyPublic(req, res, next) {
  if (req.user) {
    res.redirect(_routes["default"].home);
  } else {
    next();
  }
}; //로그인한 사용자만 접근하도록 하는 미들웨어


exports.onlyPublic = onlyPublic;

var onlyPrivate = function onlyPrivate(req, res, next) {
  if (!req.user) {
    res.redirect(_routes["default"].home);
  } else {
    next();
  }
}; //input 태그의 Name  , multer를 사용한 미들웨어


exports.onlyPrivate = onlyPrivate;
var uploadVideo = multerVideo.single("videoFile");
exports.uploadVideo = uploadVideo;
var uploadAvatar = multerAvater.single("avatar");
exports.uploadAvatar = uploadAvatar;