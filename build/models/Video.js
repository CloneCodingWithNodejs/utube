"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var VideoSchema = new _mongoose["default"].Schema({
  fileUrl: {
    type: String,
    required: "파일의 URL이 반드시 필요합니다"
  },
  title: {
    type: String,
    required: "제목이 반드시 필요합니다"
  },
  description: {
    type: String
  },
  views: {
    type: Number,
    "default": 0
  },
  createdAt: {
    type: Date,
    "default": Date.now
  },
  //비디오에 달린 댓글 정보들, 각각의 댓글들은 ObjectId를 가지고있음
  comments: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Comment"
  }],
  creator: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  }
}); //매개변수 1 :  모델의 이름, 2 : 사용할 스키마

var model = _mongoose["default"].model("Video", VideoSchema);

var _default = model;
exports["default"] = _default;