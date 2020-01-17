"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
//여기서 URL을 생성하고 ~~Router.js 에서 가져다 쓸거임
//Global 전역
var HOME = "/"; //홈

var JOIN = "/join"; //회원가입

var LOGIN = "/login";
var LOGOUT = "/logout";
var SEARCH = "/search"; //About Users

var USERS = "/users";
var USER_DETAIL = "/:id"; //EX /users/1921

var EDIT_PROFILE = "/edit-profile";
var CHANGE_PASSWORD = "/change-password";
var MY_PROFILE = "/myProfile"; //About videos

var VIDEOS = "/videos";
var UPLOAD = "/upload";
var VIDEO_DETAIL = "/:id"; //:id 같은 경우 Express가 변수라고 알아챔

var EDIT_VIDEO = "/:id/edit";
var DELETE_VIDEO = "/:id/delete"; //Github

var GITHUB = "/auth/github";
var GITHUB_CALLBACK = "/auth/github/callback"; //Facebook

var FB = "/auth/facebook";
var FB_CALLBACK = "/auth/facebook/callback"; //API
//이 URL은 어떤것도 렌더링할 수 없음

var API = "/api";
var REGISTER_VIEW = "/:id/view";
var ADD_COMMENT = "/:id/comment";
var DELTE_COMMENT = "/:id/deleteComment";
var UPDATE_COMMENT = "/:id/updateComment";
var routes = {
  home: HOME,
  github: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  facebook: FB,
  facebookCallback: FB_CALLBACK,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  userDetail: function userDetail(id) {
    if (id) {
      return "/users/".concat(id);
    } else {
      return USER_DETAIL;
    }
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  videos: VIDEOS,
  upload: UPLOAD,
  videoDetail: function videoDetail(id) {
    if (id) {
      return "/videos/".concat(id);
    } else {
      return VIDEO_DETAIL;
    }
  },
  editVideo: function editVideo(id) {
    if (id) {
      return "/videos/".concat(id, "/edit");
    } else {
      return EDIT_VIDEO;
    }
  },
  deleteVideo: function deleteVideo(id) {
    if (id) {
      return "/videos/".concat(id, "/delete");
    } else {
      return DELETE_VIDEO;
    }
  },
  myProfile: MY_PROFILE,
  api: API,
  registerView: REGISTER_VIEW,
  addComment: ADD_COMMENT,
  deleteComment: DELTE_COMMENT,
  updateComment: UPDATE_COMMENT
};
var _default = routes;
exports["default"] = _default;