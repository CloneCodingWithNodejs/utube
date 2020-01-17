const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayBtn");
const volumeBtn = document.getElementById("jsVolumeBtn");
const volumeRange = document.getElementById("jsVolume");
const fullScreenBtn = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const juice = document.getElementById("juice");
const progressBar = document.getElementById("progress__bar");

//데이터베이스 조회만할 경우 get
//데이터베이스를 수정할 경우에는 post 사용하면됨
const registerView = () => {
  //비디오 ID 따오기
  const videoId = window.location.href.split("/videos/")[1];

  fetch(`/api/${videoId}/view`, {
    method: "POST"
  });
};

const getCurrentTime = () => {
  currentTime.innerHTML = formatDate(videoPlayer.currentTime);
};

const setTotalTime = () => {
  const totalTimeString = formatDate(videoPlayer.duration);
  totalTime.innerHTML = totalTimeString;
  setInterval(getCurrentTime, 500);
};

const formatDate = seconds => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${minutes}:${totalSeconds}`;
};

const handlePlayClick = () => {
  //현재 비디오가 정지되어있는 상태라면
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
};

const handleVolumeClick = () => {
  //음소거가 되어있다면
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    //뮤트 시켜도 비디오플레이어의 볼륨값은 기억하고있음 0 이 아님
    volumeRange.value = videoPlayer.volume;
  } else {
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    volumeRange.value = 0;
  }
};

const goFullScreen = () => {
  videoContainer.requestFullscreen();

  videoPlayer.style.width = 100 + "%";

  fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
  fullScreenBtn.removeEventListener("click", goFullScreen);
  fullScreenBtn.addEventListener("click", exitFullScreen);
};

const exitFullScreen = () => {
  videoPlayer.style.removeProperty("width");
  document.exitFullscreen();

  fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
  fullScreenBtn.addEventListener("click", goFullScreen);
  fullScreenBtn.removeEventListener("click", exitFullScreen);
};

const handleSpacebar = event => {
  if (videoPlayer.paused && event.which == 32) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else if (!videoPlayer.paused && event.which == 32) {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
};

const dontScrollDown = e => {
  if (e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
};

const handlefastFoward = e => {
  if (e.which == 39 && !videoPlayer.paused) {
    videoPlayer.currentTime += 5;
  }
};

const handlebackFoward = e => {
  if (e.which == 37 && !videoPlayer.paused) {
    videoPlayer.currentTime -= 5;
  }
};

const handleTimeUpdate = () => {
  let positon = videoPlayer.currentTime / videoPlayer.duration;
  juice.style.width = positon * 100 + "%";
};

//클릭으로 빨리감기 되감기
const scrub = event => {
  const scrubTime =
    (event.offsetX / progressBar.offsetWidth) * videoPlayer.duration;

  videoPlayer.currentTime = scrubTime;
};

const handleEsc = event => {
  if (event.keyCode == 27) {
    videoPlayer.style.removeProperty("width");
    fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    fullScreenBtn.addEventListener("click", goFullScreen);
    fullScreenBtn.removeEventListener("click", exitFullScreen);
  }
};

//비디오가 끝날때 조회수 1증가
const handleEnded = () => {
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
  registerView();
};

//볼륨 바 마우스 오버
const handleVolumeBarOn = () => {
  volumeRange.style.opacity = 1;
  volumeRange.style.transition = "all 0.4s linear";
  volumeRange.style.visibility = "visible";
  volumeRange.style.width = 100 + "px";
};
//볼륨 바 마우스 리브
const handleVolumeBarOff = () => {
  volumeRange.style.opacity = 0;
  volumeRange.style.transition = "all 0.4s linear";
  volumeRange.style.visibility = "hidden";
  volumeRange.style.width = 0 + "px";
};

const handleDrag = e => {
  const {
    target: { value }
  } = e;

  videoPlayer.volume = value;

  if (value > 0.5) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (value == 0.0) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
};

const init = () => {
  //스페이스바 막기
  playBtn.addEventListener("click", handlePlayClick);

  videoPlayer.addEventListener("ended", handleEnded);
  videoPlayer.addEventListener("click", handlePlayClick);
  videoPlayer.addEventListener("timeupdate", handleTimeUpdate);
  videoPlayer.onloadeddata = () => {
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
};

//videoContainer가 존재하는지 먼저확인함 홈페이지 전체에 걸쳐서 적용되기 때문에
//이 조건문이 없으면 console창에 에러가 뜸
if (videoContainer) {
  init();
}
