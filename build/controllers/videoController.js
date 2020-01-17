"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postUpdateComment = exports.postDeleteComment = exports.postAddComment = exports.postRegisterView = exports.deleteVideo = exports.postEditVideo = exports.getEditVideo = exports.videoDetail = exports.postUpload = exports.getUpload = exports.search = exports.home = void 0;

var _routes = _interopRequireDefault(require("../routes"));

var _Video = _interopRequireDefault(require("../models/Video"));

var _User = _interopRequireDefault(require("../models/User"));

var _Comment = _interopRequireDefault(require("../models/Comment"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//홈 화면
var home =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var videos;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Video["default"].find({}).populate("creator").sort({
              _id: -1
            });

          case 3:
            videos = _context.sent;
            res.render("home", {
              pageTitle: "Home",
              videos: videos
            });
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            // 에러가 날 경우 빈 배열을 전송
            res.render("home", {
              pageTitle: "Home",
              videos: []
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function home(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); //검색


exports.home = home;

var search =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var searchingBy, videos;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            searchingBy = req.query.term;
            videos = []; //insesitive = i 덜민감함

            _context2.prev = 2;
            _context2.next = 5;
            return _Video["default"].find({
              title: {
                $regex: searchingBy,
                $options: "i"
              }
            });

          case 5:
            videos = _context2.sent;
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](2);
            console.log(_context2.t0);

          case 11:
            res.render("search", {
              pageTitle: "search",
              searchingBy: searchingBy,
              videos: videos
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 8]]);
  }));

  return function search(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); //동영상 업로드 폼


exports.search = search;

var getUpload = function getUpload(req, res) {
  return res.render("upload", {
    pageTitle: "upload"
  });
}; //동영상 업로드


exports.getUpload = getUpload;

var postUpload =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body, title, description, location, newVideo;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, title = _req$body.title, description = _req$body.description, location = req.file.location;
            _context3.next = 3;
            return _Video["default"].create({
              fileUrl: location,
              title: title,
              description: description,
              //작성자는 현재 로그인한 사용자의 id임
              creator: req.user.id
            });

          case 3:
            newVideo = _context3.sent;
            //그리고 작성자의 비디오에 현재 비디오를 추가함 비디오의 ID만!
            req.user.videos.push(newVideo.id);
            req.user.save();
            res.redirect(_routes["default"].videoDetail(newVideo.id));

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function postUpload(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); //동영상 상세보기


exports.postUpload = postUpload;

var videoDetail =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var id, video;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.prev = 1;
            _context4.next = 4;
            return _Video["default"].findById(id).populate("creator").populate({
              path: "comments",
              populate: {
                path: "creator"
              }
            });

          case 4:
            video = _context4.sent;
            // for (const comment of video.comments) {
            //   console.log(comment.creator);
            //   const newComment = await Comment.findById(comment.creator);
            // }
            res.render("videoDetail", {
              pageTitle: video.title,
              video: video
            });
            _context4.next = 12;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](1);
            console.log(_context4.t0);
            res.redirect(_routes["default"].home);

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 8]]);
  }));

  return function videoDetail(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}(); //동영상 수정 폼


exports.videoDetail = videoDetail;

var getEditVideo =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var id, video;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.prev = 1;
            _context5.next = 4;
            return _Video["default"].findById(id);

          case 4:
            video = _context5.sent;

            if (!(video.creator != req.user.id)) {
              _context5.next = 7;
              break;
            }

            throw Error();

          case 7:
            res.render("editVideo", {
              pageTitle: "Edit ".concat(video.title),
              video: video
            });
            _context5.next = 14;
            break;

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](1);
            console.log("작성자와 로그인한 유저의 아이디가 다름");
            res.redirect(_routes["default"].home);

          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 10]]);
  }));

  return function getEditVideo(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}(); //동영상 수정


exports.getEditVideo = getEditVideo;

var postEditVideo =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(req, res) {
    var id, _req$body2, title, description;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.params.id, _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description;
            _context6.prev = 1;
            _context6.next = 4;
            return _Video["default"].findOneAndUpdate({
              _id: id
            }, {
              title: title,
              description: description
            });

          case 4:
            res.redirect(_routes["default"].videoDetail(id));
            _context6.next = 10;
            break;

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](1);
            res.redirect(_routes["default"].home);

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 7]]);
  }));

  return function postEditVideo(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}(); //동영상 삭제


exports.postEditVideo = postEditVideo;

var deleteVideo =
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(req, res) {
    var id, video, s3path, findUser, s3, params;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            id = req.params.id;
            _context7.prev = 1;
            _context7.next = 4;
            return _Video["default"].findById(id);

          case 4:
            video = _context7.sent;
            s3path = video.fileUrl.split("/video/")[1];

            if (!(video.creator != req.user.id)) {
              _context7.next = 10;
              break;
            }

            throw Error();

          case 10:
            _context7.next = 12;
            return _Video["default"].findByIdAndRemove({
              _id: id
            });

          case 12:
            _context7.next = 14;
            return _User["default"].findByIdAndUpdate(req.user.id, {
              $pull: {
                videos: id
              }
            });

          case 14:
            findUser = _context7.sent;
            s3 = new _awsSdk["default"].S3({
              secretAccessKey: process.env.AWS_SECRET,
              accessKeyId: process.env.AWS_ACCESSKEY
            });
            console.log("key : ".concat(s3path));
            params = {
              Bucket: "utube-com",
              Key: "video/".concat(s3path)
            };
            s3.deleteObject(params, function (err, data) {
              if (err) console.log(err, err.stack);else console.log("파일삭제 성공");
            });
            findUser.save();

          case 20:
            _context7.next = 25;
            break;

          case 22:
            _context7.prev = 22;
            _context7.t0 = _context7["catch"](1);
            console.log(_context7.t0);

          case 25:
            res.redirect(_routes["default"].home);

          case 26:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 22]]);
  }));

  return function deleteVideo(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}(); //조회수 1증가


exports.deleteVideo = deleteVideo;

var postRegisterView =
/*#__PURE__*/
function () {
  var _ref8 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(req, res) {
    var id, video;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            id = req.params.id;
            _context8.prev = 1;
            _context8.next = 4;
            return _Video["default"].findById(id);

          case 4:
            video = _context8.sent;
            video.views += 1;
            video.save();
            res.status(200);
            _context8.next = 13;
            break;

          case 10:
            _context8.prev = 10;
            _context8.t0 = _context8["catch"](1);
            res.status(400);

          case 13:
            _context8.prev = 13;
            res.end();
            return _context8.finish(13);

          case 16:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 10, 13, 16]]);
  }));

  return function postRegisterView(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}(); //비디오 댓글 추가


exports.postRegisterView = postRegisterView;

var postAddComment =
/*#__PURE__*/
function () {
  var _ref9 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9(req, res) {
    var comment, id, user, video, newComment;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            comment = req.body.comment, id = req.params.id, user = req.user;
            _context9.prev = 1;
            _context9.next = 4;
            return _Video["default"].findById(id);

          case 4:
            video = _context9.sent;
            _context9.next = 7;
            return _Comment["default"].create({
              text: comment,
              creator: user.id
            });

          case 7:
            newComment = _context9.sent;
            //비디오가 갖고있는 댓글 배열에 새로운 댓글 추가
            video.comments.push(newComment._id);
            video.save();
            _context9.next = 15;
            break;

          case 12:
            _context9.prev = 12;
            _context9.t0 = _context9["catch"](1);
            res.status(400);

          case 15:
            _context9.prev = 15;
            res.end();
            return _context9.finish(15);

          case 18:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[1, 12, 15, 18]]);
  }));

  return function postAddComment(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}(); //비디오 댓글 삭제


exports.postAddComment = postAddComment;

var postDeleteComment =
/*#__PURE__*/
function () {
  var _ref10 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee10(req, res) {
    var _req$body3, commentId, videoId, video;

    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _req$body3 = req.body, commentId = _req$body3.commentId, videoId = _req$body3.videoId;
            console.log(videoId);
            _context10.prev = 2;
            _context10.next = 5;
            return _Comment["default"].findByIdAndDelete({
              _id: commentId
            });

          case 5:
            _context10.next = 7;
            return _Video["default"].findByIdAndUpdate({
              _id: videoId
            }, {
              $pull: {
                comments: commentId
              }
            });

          case 7:
            video = _context10.sent;
            video.save();
            res.status(200);
            _context10.next = 16;
            break;

          case 12:
            _context10.prev = 12;
            _context10.t0 = _context10["catch"](2);
            console.log(_context10.t0);
            res.status(400);

          case 16:
            _context10.prev = 16;
            res.end();
            return _context10.finish(16);

          case 19:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[2, 12, 16, 19]]);
  }));

  return function postDeleteComment(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

exports.postDeleteComment = postDeleteComment;

var postUpdateComment =
/*#__PURE__*/
function () {
  var _ref11 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee11(req, res) {
    var newComment, id;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            newComment = req.body.newComment, id = req.params.id;
            console.log("newComment : ".concat(newComment, " , commentId : ").concat(id));
            _context11.prev = 2;
            _context11.next = 5;
            return _Comment["default"].findByIdAndUpdate({
              _id: id
            }, {
              text: newComment
            });

          case 5:
            _context11.next = 11;
            break;

          case 7:
            _context11.prev = 7;
            _context11.t0 = _context11["catch"](2);
            console.log(_context11.t0);
            res.status(400);

          case 11:
            _context11.prev = 11;
            res.end();
            return _context11.finish(11);

          case 14:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[2, 7, 11, 14]]);
  }));

  return function postUpdateComment(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();

exports.postUpdateComment = postUpdateComment;