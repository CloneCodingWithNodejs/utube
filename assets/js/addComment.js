import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const avatarUrl = document.getElementById("jsCommentUrl").value;
const userId = document.getElementById("jsUserId").value;
const userName = document.getElementById("jsUserName").value;
const toggleBtn = document.getElementsByClassName("fas fa-ellipsis-h");
const deleteBtn = document.getElementsByClassName("fas fa-trash");
const updateBtn = document.getElementsByClassName("fas fa-pen-square");
const updateForm = document.getElementsByClassName("update__form");
const commentText = document.getElementsByClassName("comment__text");

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

const handleUpdate = e => {
  let i;

  for (i = 0; i < deleteBtn.length; i++) {
    if (e.target === updateBtn[i]) {
      console.log(i);
      break;
    }
  }
  const input = document.createElement("input");
  input.setAttribute("id", "updateInput");

  //   var list = document.getElementById("myList");   // Get the <ul> element with id="myList"
  // list.removeChild(list.childNodes[0]);
  updateForm[i].removeChild(commentText[i]);

  updateForm[i].appendChild(input);
};

const updateComment = e => {
  e.preventDefault();

  console.log("동작됨");

  let i;

  for (i = 0; i < updateForm.length; i++) {
    if (e.target === updateForm[i]) {
      console.log(i);
      break;
    }
  }
  const c = updateForm[i].childNodes;
  const newComment = c[1].value;
  const commentId = c[0].value;

  updateCommentAjax(newComment, commentId, i);
};

const updateCommentAjax = async (newComment, commentId, index) => {
  const response = await axios({
    url: `/api/${commentId}/updateComment`,
    method: "POST",
    data: {
      newComment
    }
  });

  if (response.status == 200) {
    updateCommentFake(newComment, index);
  }
};

const updateCommentFake = (newComment, index) => {
  updateForm[index].removeChild(document.getElementById("updateInput"));

  const text = document.createElement("div");
  text.setAttribute("class", "comment__text");
  text.innerHTML = newComment;

  updateForm[index].appendChild(text);
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
  deleteComment(c[1].value, i);
};

const deleteComment = async (id, index) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${id}/deleteComment`,
    method: "POST",
    data: {
      commentId: id,
      videoId
    }
  });
  if (response.status === 200) {
    deleteCommentFake(index);
  }
};

const deleteCommentFake = index => {
  const deleteList = document.getElementsByClassName("comment__box");

  const elem = deleteList[index];

  elem.parentNode.removeChild(elem);

  commentNumber.innerHTML = parseInt(commentNumber.innerHTML) - 1;
};

const init = () => {
  addCommentForm.addEventListener("submit", handleSubmit);

  Array.from(toggleBtn).forEach(element => {
    element.addEventListener("click", handleToggle);
  });

  Array.from(deleteBtn).forEach(element => {
    element.addEventListener("click", handleDelete);
  });

  Array.from(updateBtn).forEach(element => {
    element.addEventListener("click", handleUpdate);
  });

  Array.from(updateForm).forEach(element => {
    element.addEventListener("submit", updateComment);
  });
};

if (addCommentForm) {
  init();
}
