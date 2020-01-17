"use strict";

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var addCommentForm = document.getElementById("jsAddComment");
var commentList = document.getElementById("jsCommentList");
var commentNumber = document.getElementById("jsCommentNumber");
var avatarUrl = document.getElementById("jsCommentUrl").value;
var userId = document.getElementById("jsUserId").value;
var userName = document.getElementById("jsUserName").value;
var toggleBtn = document.getElementsByClassName("fas fa-ellipsis-h");
var deleteBtn = document.getElementsByClassName("fas fa-trash");
var updateBtn = document.getElementsByClassName("fas fa-pen-square");
var updateForm = document.getElementsByClassName("update__form");
var commentText = document.getElementsByClassName("comment__text");

var addComment = function addComment(comment) {
  //Input hidden의 값 받기
  var li = document.createElement("li");
  var spanDate = document.createElement("span");
  var avatar = document.createElement("img"); //월 일 년도

  spanDate.innerHTML = Date().substr(4, 11);
  var span = document.createElement("span"); //이미지태그

  avatar.src = avatarUrl; //유저 상세보기 링크

  var a = document.createElement("a");
  a.href = "/users/".concat(userId);
  a.text = userName;
  span.innerHTML = comment;
  li.classList.add("comment__box");
  avatar.classList.add("comment__avatar");
  li.appendChild(document.createElement("div"));
  li.appendChild(avatar);
  li.appendChild(document.createElement("div"));
  li.appendChild(a);
  li.appendChild(spanDate);
  li.appendChild(span);
  spanDate.appendChild(document.createElement("br"));
  commentList.prepend(li);
  increaseNumber();
};

var increaseNumber = function increaseNumber() {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML) + 1;
};

var sendComment =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(comment) {
    var videoId, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            videoId = window.location.href.split("/videos/")[1];
            _context.next = 3;
            return (0, _axios["default"])({
              url: "/api/".concat(videoId, "/comment"),
              method: "POST",
              data: {
                comment: comment
              }
            });

          case 3:
            response = _context.sent;

            if (response.status === 200) {
              console.log(response);
              addComment(comment);
            }

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function sendComment(_x) {
    return _ref.apply(this, arguments);
  };
}();

var handleSubmit = function handleSubmit(event) {
  event.preventDefault();
  var commentInput = document.getElementById("jsComment");
  var comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

var handleToggle = function handleToggle(e) {
  var i;

  for (i = 0; i < toggleBtn.length; i++) {
    if (e.target === toggleBtn[i]) {
      console.log(i);
      break;
    }
  }

  var selectDiv = document.getElementsByClassName("modify__select")[i];

  if (selectDiv.style.display == "block") {
    selectDiv.style.display = "none";
  } else {
    selectDiv.style.display = "block";
  }
};

var handleUpdate = function handleUpdate(e) {
  var i;

  for (i = 0; i < deleteBtn.length; i++) {
    if (e.target === updateBtn[i]) {
      console.log(i);
      break;
    }
  }

  var input = document.createElement("input");
  input.setAttribute("id", "updateInput"); //   var list = document.getElementById("myList");   // Get the <ul> element with id="myList"
  // list.removeChild(list.childNodes[0]);

  updateForm[i].removeChild(commentText[i]);
  updateForm[i].appendChild(input);
};

var updateComment = function updateComment(e) {
  e.preventDefault();
  console.log("동작됨");
  var i;

  for (i = 0; i < updateForm.length; i++) {
    if (e.target === updateForm[i]) {
      console.log(i);
      break;
    }
  }

  var c = updateForm[i].childNodes;
  var newComment = c[1].value;
  var commentId = c[0].value;
  updateCommentAjax(newComment, commentId, i);
};

var updateCommentAjax =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(newComment, commentId, index) {
    var response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _axios["default"])({
              url: "/api/".concat(commentId, "/updateComment"),
              method: "POST",
              data: {
                newComment: newComment
              }
            });

          case 2:
            response = _context2.sent;

            if (response.status == 200) {
              updateCommentFake(newComment, index);
            }

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function updateCommentAjax(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var updateCommentFake = function updateCommentFake(newComment, index) {
  updateForm[index].removeChild(document.getElementById("updateInput"));
  var text = document.createElement("div");
  text.setAttribute("class", "comment__text");
  text.innerHTML = newComment;
  updateForm[index].appendChild(text);
};

var handleDelete = function handleDelete(e) {
  var i;

  for (i = 0; i < deleteBtn.length; i++) {
    if (e.target === deleteBtn[i]) {
      console.log(i);
      break;
    }
  }

  var c = deleteBtn[i].childNodes;
  deleteComment(c[1].value, i);
};

var deleteComment =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(id, index) {
    var videoId, response;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            videoId = window.location.href.split("/videos/")[1];
            _context3.next = 3;
            return (0, _axios["default"])({
              url: "/api/".concat(id, "/deleteComment"),
              method: "POST",
              data: {
                commentId: id,
                videoId: videoId
              }
            });

          case 3:
            response = _context3.sent;

            if (response.status === 200) {
              deleteCommentFake(index);
            }

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function deleteComment(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var deleteCommentFake = function deleteCommentFake(index) {
  var deleteList = document.getElementsByClassName("comment__box");
  var elem = deleteList[index];
  elem.parentNode.removeChild(elem);
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML) - 1;
};

var init = function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
  Array.from(toggleBtn).forEach(function (element) {
    element.addEventListener("click", handleToggle);
  });
  Array.from(deleteBtn).forEach(function (element) {
    element.addEventListener("click", handleDelete);
  });
  Array.from(updateBtn).forEach(function (element) {
    element.addEventListener("click", handleUpdate);
  });
  Array.from(updateForm).forEach(function (element) {
    element.addEventListener("submit", updateComment);
  });
};

if (addCommentForm) {
  init();
}