"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config(); //DB가 어디에 연결되어있는지 주소를 입력함


_mongoose["default"].connect(process.env.MONGO_URL_PRODUCT, {
  useNewUrlParser: true,
  useFindAndModify: false
});

var db = _mongoose["default"].connection;

var handleOpen = function handleOpen() {
  console.log("🔥🔥🔥 Conneted to DB 🔥🔥🔥");
};

var handleError = function handleError(error) {
  console.log("\uD83D\uDCA6\uD83D\uDCA6\uD83D\uDCA6Error on DB Connection ".concat(error));
};

db.once("open", handleOpen);
db.on("error", handleError);