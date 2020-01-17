"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../routes"));

var _videoController = require("../controllers/videoController");

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var videoRouter = _express["default"].Router();

videoRouter.get(_routes["default"].upload, _middlewares.onlyPrivate, _videoController.getUpload);
videoRouter.post(_routes["default"].upload, _middlewares.onlyPrivate, _middlewares.uploadVideo, _videoController.postUpload); //여기서는 id를 매개변수로 넣지않고 실행만 해준다

videoRouter.get(_routes["default"].videoDetail(), _videoController.videoDetail);
videoRouter.get(_routes["default"].editVideo(), _middlewares.onlyPrivate, _videoController.getEditVideo);
videoRouter.post(_routes["default"].editVideo(), _middlewares.onlyPrivate, _videoController.postEditVideo);
videoRouter.get(_routes["default"].deleteVideo(), _middlewares.onlyPrivate, _videoController.deleteVideo);
videoRouter.get(_routes["default"].search, _videoController.search);
var _default = videoRouter;
exports["default"] = _default;