"use strict";

var videoContainer = document.getElementById("jsVideoPlayer");
var videoPlayer = document.querySelector("#jsVideoPlayer video");
var playBtn = document.getElementById("jsPlayBtn");
var volumeBtn = document.getElementById("jsVolumeBtn");
var volumeRange = document.getElementById("jsVolume");
var fullScreenBtn = document.getElementById("jsFullScreen");
var currentTime = document.getElementById("currentTime");
var totalTime = document.getElementById("totalTime");
var juice = document.getElementById("juice");
var progressBar = document.getElementById("progress__bar"); //데이터베이스 조회만할 경우 get
//데이터베이스를 수정할 경우에는 post 사용하면됨

var registerView = function registerView() {
  //비디오 ID 따오기
  var videoId = window.location.href.split("/videos/")[1];
  fetch("/api/".concat(videoId, "/view"), {
    method: "POST"
  });
};

var getCurrentTime = function getCurrentTime() {
  currentTime.innerHTML = formatDate(videoPlayer.currentTime);
};

var setTotalTime = function setTotalTime() {
  var totalTimeString = formatDate(videoPlayer.duration);
  totalTime.innerHTML = totalTimeString;
  setInterval(getCurrentTime, 500);
};

var formatDate = function formatDate(seconds) {
  var secondsNumber = parseInt(seconds, 10);
  var hours = Math.floor(secondsNumber / 3600);
  var minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  var totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0".concat(hours);
  }

  if (minutes < 10) {
    minutes = "0".concat(minutes);
  }

  if (totalSeconds < 10) {
    totalSeconds = "0".concat(totalSeconds);
  }

  return "".concat(minutes, ":").concat(totalSeconds);
};

var handlePlayClick = function handlePlayClick() {
  //현재 비디오가 정지되어있는 상태라면
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
};

var handleVolumeClick = function handleVolumeClick() {
  //음소거가 되어있다면
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>'; //뮤트 시켜도 비디오플레이어의 볼륨값은 기억하고있음 0 이 아님

    volumeRange.value = videoPlayer.volume;
  } else {
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    volumeRange.value = 0;
  }
};

var goFullScreen = function goFullScreen() {
  videoContainer.requestFullscreen();
  videoPlayer.style.width = 100 + "%";
  fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
  fullScreenBtn.removeEventListener("click", goFullScreen);
  fullScreenBtn.addEventListener("click", exitFullScreen);
};

var exitFullScreen = function exitFullScreen() {
  videoPlayer.style.removeProperty("width");
  document.exitFullscreen();
  fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
  fullScreenBtn.addEventListener("click", goFullScreen);
  fullScreenBtn.removeEventListener("click", exitFullScreen);
};

var handleSpacebar = function handleSpacebar(event) {
  if (videoPlayer.paused && event.which == 32) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else if (!videoPlayer.paused && event.which == 32) {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
};

var dontScrollDown = function dontScrollDown(e) {
  if (e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
};

var handlefastFoward = function handlefastFoward(e) {
  if (e.which == 39 && !videoPlayer.paused) {
    videoPlayer.currentTime += 5;
  }
};

var handlebackFoward = function handlebackFoward(e) {
  if (e.which == 37 && !videoPlayer.paused) {
    videoPlayer.currentTime -= 5;
  }
};

var handleTimeUpdate = function handleTimeUpdate() {
  var positon = videoPlayer.currentTime / videoPlayer.duration;
  juice.style.width = positon * 100 + "%";
}; //클릭으로 빨리감기 되감기


var scrub = function scrub(event) {
  var scrubTime = event.offsetX / progressBar.offsetWidth * videoPlayer.duration;
  videoPlayer.currentTime = scrubTime;
};

var handleEsc = function handleEsc(event) {
  if (event.keyCode == 27) {
    videoPlayer.style.removeProperty("width");
    fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    fullScreenBtn.addEventListener("click", goFullScreen);
    fullScreenBtn.removeEventListener("click", exitFullScreen);
  }
}; //비디오가 끝날때 조회수 1증가


var handleEnded = function handleEnded() {
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
  registerView();
}; //볼륨 바 마우스 오버


var handleVolumeBarOn = function handleVolumeBarOn() {
  volumeRange.style.opacity = 1;
  volumeRange.style.transition = "all 0.4s linear";
  volumeRange.style.visibility = "visible";
  volumeRange.style.width = 100 + "px";
}; //볼륨 바 마우스 리브


var handleVolumeBarOff = function handleVolumeBarOff() {
  volumeRange.style.opacity = 0;
  volumeRange.style.transition = "all 0.4s linear";
  volumeRange.style.visibility = "hidden";
  volumeRange.style.width = 0 + "px";
};

var handleDrag = function handleDrag(e) {
  var value = e.target.value;
  videoPlayer.volume = value;

  if (value > 0.5) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (value == 0.0) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
};

var init = function init() {
  //스페이스바 막기
  playBtn.addEventListener("click", handlePlayClick);
  videoPlayer.addEventListener("ended", handleEnded);
  videoPlayer.addEventListener("click", handlePlayClick);
  videoPlayer.addEventListener("timeupdate", handleTimeUpdate);

  videoPlayer.onloadeddata = function () {
    setTotalTime();
  };

  volumeRange.addEventListener("input", handleDrag);
  window.addEventListener("keydown", dontScrollDown);
  window.addEventListener("keydown", handleSpacebar);
  window.addEventListener("keydown", handlefastFoward);
  window.addEventListener("keydown", handlebackFoward);
  window.addEventListener("keydown", handleEsc);
  volumeBtn.addEventListener("click", handleVolumeClick);
  volumeBtn.addEventListener("mouseover", handleVolumeBarOn);
  videoContainer.addEventListener("mouseleave", handleVolumeBarOff);
  fullScreenBtn.addEventListener("click", goFullScreen);
  progressBar.addEventListener("click", scrub);
}; //videoContainer가 존재하는지 먼저확인함 홈페이지 전체에 걸쳐서 적용되기 때문에
//이 조건문이 없으면 console창에 에러가 뜸


if (videoContainer) {
  init();
}