import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const avatarUrl = document.getElementById("jsCommentUrl").value;
const userId = document.getElementById("jsUserId").value;
const userName = document.getElementById("jsUserName").value;
const toggleBtn = document.getElementsByClassName("fas fa-ellipsis-h");
const deleteBtn = document.getElementsByClassName("fas fa-trash");

const addComment = comment => {
  //Input hidden의 값 받기

  const li = document.createElement("li");
  const spanDate = document.createElement("span");
  const avatar = document.createElement("img");

  //월 일 년도
  spanDate.innerHTML = Date().substr(4, 11);
  const span = document.createElement("span");

  //이미지태그
  avatar.src = avatarUrl;

  //유저 상세보기 링크
  const a = document.createElement("a");
  a.href = `/users/${userId}`;
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

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML) + 1;
};

const sendComment = async comment => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment
    }
  });
  if (response.status === 200) {
    console.log(response);
    addComment(comment);
  }
};

const handleSubmit = event => {
  event.preventDefault();
  const commentInput = document.getElementById("jsComment");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

const handleToggle = e => {
  let i;
  for (i = 0; i < toggleBtn.length; i++) {
    if (e.target === toggleBtn[i]) {
      console.log(i);
      break;
    }
  }

  const selectDiv = document.getElementsByClassName("modify__select")[i];
  if (selectDiv.style.display == "block") {
    selectDiv.style.display = "none";
  } else {
    selectDiv.style.display = "block";
  }
};

const handleDelete = e => {
  let i;

  for (i = 0; i < deleteBtn.length; i++) {
    if (e.target === deleteBtn[i]) {
      console.log(i);
      break;
    }
  }

  let c = deleteBtn[i].childNodes;
  deleteComment(c[1].value);
};

const deleteComment = async id => {
  console.log(`여기는 js ${id}`);

  const response = await axios({
    url: `/api/${id}/deleteComment`,
    method: "POST",
    data: {
      commentId: id
    }
  });
  if (response.status === 200) {
    console.log(response);
  }
};

const init = () => {
  addCommentForm.addEventListener("submit", handleSubmit);

  Array.from(toggleBtn).forEach(element => {
    element.addEventListener("click", handleToggle);
  });

  Array.from(deleteBtn).forEach(element => {
    element.addEventListener("click", handleDelete);
  });
};

if (addCommentForm) {
  init();
}
