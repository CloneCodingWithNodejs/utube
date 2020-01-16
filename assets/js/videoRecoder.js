const recordContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordButton");
const videoPreview = document.getElementById("jsVideoPreview");

//미디어 스트림 전역변수
let streamObject;

//비디오 레코더API
let videoRecorder;

const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 }
    });

    //stream 비디오 태그의 src에 들어갈 소스임
    videoPreview.srcObject = stream;

    //프리뷰의 음성이 같이 녹음되면 안되니까 음소거
    videoPreview.muted = true;
    videoPreview.play();
    recordBtn.innerHTML = "Stop Recording";
    recordBtn.style.background = "red";
    streamObject = stream;
    startRecording();
  } catch (error) {
    console.log(error);
    recordBtn.innerHTML = ": ( Can't record";
  } finally {
    recordBtn.removeEventListener("click", getVideo);
  }
};

const handleVideoData = e => {
  const { data: videoFile } = e;

  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = "recorded.webm";
  document.body.appendChild(link);
  link.click();
};

const startRecording = () => {
  videoRecorder = new MediaRecorder(streamObject);
  videoRecorder.start();
  videoRecorder.addEventListener("dataavailable", handleVideoData);
  recordBtn.removeEventListener("click", getVideo);
  recordBtn.addEventListener("click", stopRecording);
};

const stopRecording = () => {
  videoRecorder.stop();
  recordBtn.removeEventListener("click", stopRecording);
  recordBtn.addEventListener("click", getVideo);
  recordBtn.innerHTML = "Start Recording";
  recordBtn.style.background = "#1c7ed6";

  streamObject.getVideoTracks()[0].stop();
};

const init = () => {
  recordBtn.addEventListener("click", getVideo);
};

if (recordContainer) {
  init();
}
