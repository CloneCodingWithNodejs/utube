const joinForm = document.getElementById("jsJoinform");
const password1 = document.getElementById("jsPassword1");
const password2 = document.getElementById("jsPassword2");
const passwordSpan1 = document.getElementById("jsPasswordSpan1");
const passwordSpan2 = document.getElementById("jsPasswordSpan2");

const handleBlur = () => {
  if (/^[A-Za-z0-9]{6,12}$/.test(password1.value) == false) {
    password1.value = "";
    password2.value = "";
    passwordSpan1.innerHTML = "비밀번호를 확인해주세요";
  } else {
    passwordSpan1.innerHTML = "";
  }
};

const handleBlur2 = () => {
  if (password1.value !== password2.value) {
    password1.value = "";
    password2.value = "";
    passwordSpan2.innerHTML = "비밀번호 확인이 서로 일치하지않습니다";
  } else {
    passwordSpan2.innerHTML = "";
  }
};

const init = () => {
  password1.addEventListener("blur", handleBlur);
  password2.addEventListener("blur", handleBlur2);
};

if (joinForm) {
  init();
}
