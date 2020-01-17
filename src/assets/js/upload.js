const uploadForm = document.getElementById("jsUploadForm");
const loadingScreen = document.getElementById("loadingScreen");
const submitBtn = document.getElementById("jsSubmit");
const inputFile = document.getElementById("file");
const fileDiv = document.getElementById("file__div");

const handleLoading = () => {
  loadingScreen.style.display = "block";
};

const handleClick = () => {
  if (inputFile.value == "") {
    alert("파일을 선택해주세요");
  }
};

const handleChange = e => {
  const file = e.target.files[0].name;
  console.log(file);
  fileDiv.innerHTML = file;
};

const init = () => {
  submitBtn.addEventListener("click", handleClick);
  uploadForm.addEventListener("submit", handleLoading);
  inputFile.addEventListener("change", handleChange);
};

if (uploadForm) {
  init();
}
