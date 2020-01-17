"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var recordContainer = document.getElementById("jsRecordContainer");
var recordBtn = document.getElementById("jsRecordButton");
var videoPreview = document.getElementById("jsVideoPreview"); //미디어 스트림 전역변수

var streamObject; //비디오 레코더API

var videoRecorder;

var getVideo =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var stream;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return navigator.mediaDevices.getUserMedia({
              audio: true,
              video: {
                width: 1280,
                height: 720
              }
            });

          case 3:
            stream = _context.sent;
            //stream 비디오 태그의 src에 들어갈 소스임
            videoPreview.srcObject = stream; //프리뷰의 음성이 같이 녹음되면 안되니까 음소거

            videoPreview.muted = true;
            videoPreview.play();
            recordBtn.innerHTML = "Stop Recording";
            recordBtn.style.background = "red";
            streamObject = stream;
            startRecording();
            _context.next = 17;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            recordBtn.innerHTML = ": ( Can't record";

          case 17:
            _context.prev = 17;
            recordBtn.removeEventListener("click", getVideo);
            return _context.finish(17);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 13, 17, 20]]);
  }));

  return function getVideo() {
    return _ref.apply(this, arguments);
  };
}();

var handleVideoData = function handleVideoData(e) {
  var videoFile = e.data;
  var link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = "recorded.webm";
  document.body.appendChild(link);
  link.click();
};

var startRecording = function startRecording() {
  videoRecorder = new MediaRecorder(streamObject);
  videoRecorder.start();
  videoRecorder.addEventListener("dataavailable", handleVideoData);
  recordBtn.removeEventListener("click", getVideo);
  recordBtn.addEventListener("click", stopRecording);
};

var stopRecording = function stopRecording() {
  videoRecorder.stop();
  recordBtn.removeEventListener("click", stopRecording);
  recordBtn.addEventListener("click", getVideo);
  recordBtn.innerHTML = "Start Recording";
  recordBtn.style.background = "#1c7ed6";
  streamObject.getVideoTracks()[0].stop();
};

var init = function init() {
  recordBtn.addEventListener("click", getVideo);
};

if (recordContainer) {
  init();
}