"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../routes"));

var _userControllers = require("../controllers/userControllers");

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userRouter = _express["default"].Router(); //editProfile이 userDetail 보다 위에 있어야함
//아니면 userdetail이 /:id 라고 생겼기때문에 뒤에오는 url을 id로 인식함


userRouter.get(_routes["default"].editProfile, _middlewares.onlyPrivate, _userControllers.geteditProfile);
userRouter.post(_routes["default"].editProfile, _middlewares.onlyPrivate, _middlewares.uploadAvatar, _userControllers.postEditProfile);
userRouter.get(_routes["default"].changePassword, _middlewares.onlyPrivate, _userControllers.getChangePassword);
userRouter.post(_routes["default"].changePassword, _middlewares.onlyPrivate, _userControllers.postChangePassword);
userRouter.get(_routes["default"].userDetail(), _middlewares.onlyPrivate, _userControllers.userDetail);
var _default = userRouter;
exports["default"] = _default;