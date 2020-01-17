"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../routes"));

var _videoController = require("../controllers/videoController");

var _userControllers = require("../controllers/userControllers");

var _middlewares = require("../middlewares");

var _passport = _interopRequireDefault(require("passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var globalRouter = _express["default"].Router(); //이렇게 관리하면 리다이렉트할때 Home의 URL이 무엇인지 외울필요가 없음


globalRouter.get(_routes["default"].join, _middlewares.onlyPublic, _userControllers.getJoin);
globalRouter.post(_routes["default"].join, _middlewares.onlyPublic, _userControllers.postJoin, _userControllers.postLogin);
globalRouter.get(_routes["default"].home, _videoController.home);
globalRouter.get(_routes["default"].myProfile, _userControllers.myProfile); //비로그인 유저만 접근할 수 있음 onlyPublic

globalRouter.get(_routes["default"].login, _middlewares.onlyPublic, _userControllers.getLogin);
globalRouter.post(_routes["default"].login, _middlewares.onlyPublic, _userControllers.postLogin);
globalRouter.get(_routes["default"].logout, _middlewares.onlyPrivate, _userControllers.logout);
globalRouter.get(_routes["default"].search, _videoController.search);
globalRouter.get(_routes["default"].github, _userControllers.githubLogin);
globalRouter.get(_routes["default"].facebook, _userControllers.facebookLogin); //callback URL로 요청이오면

globalRouter.get(_routes["default"].githubCallback, _passport["default"].authenticate("github", {
  failureRedirect: _routes["default"].login
}), //성공하면 홈으로 돌아가는 함수
_userControllers.postGithubLogin);
globalRouter.get(_routes["default"].facebookCallback, _passport["default"].authenticate("facebook", {
  failureRedirect: _routes["default"].login
}), _userControllers.postFacebookLogin);
var _default = globalRouter;
exports["default"] = _default;