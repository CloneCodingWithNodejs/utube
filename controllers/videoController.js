import routes from "../routes";
import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/Comment";

//홈 화면
export const home = async (req, res) => {
  try {
    // DB에 있는 모든 비디오를 가져와라 , 최신순으로 가져오기 sort()
    // -1을 줄 경우 reverse 하겠다는 예약어임
    const videos = await Video.find({}).sort({
      _id: -1
    });

    res.render("home", {
      pageTitle: "Home",
      videos
    });
  } catch (error) {
    // 에러가 날 경우 빈 배열을 전송
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

//검색
export const search = async (req, res) => {
  const {
    query: { term: searchingBy }
  } = req;

  let videos = [];

  //insesitive = i 덜민감함
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" }
    });
  } catch (error) {
    console.log(error);
  }

  res.render("search", { pageTitle: "search", searchingBy, videos });
};

//동영상 업로드 폼
export const getUpload = (req, res) =>
  res.render("upload", {
    pageTitle: "upload"
  });

//동영상 업로드
export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path }
  } = req;

  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    //작성자는 현재 로그인한 사용자의 id임
    creator: req.user.id
  });

  //그리고 작성자의 비디오에 현재 비디오를 추가함 비디오의 ID만!
  req.user.videos.push(newVideo.id);
  req.user.save();

  res.redirect(routes.videoDetail(newVideo.id));
};

//동영상 상세보기
export const videoDetail = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate({
        path: "comments",
        populate: { path: "creator" }
      });

    // for (const comment of video.comments) {
    //   console.log(comment.creator);
    //   const newComment = await Comment.findById(comment.creator);

    // }

    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

//동영상 수정 폼
export const getEditVideo = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const video = await Video.findById(id);

    //비디오 작성자랑 현재 로그인한 유저의 id가 다르다 그러면 수정못하게 막는다
    // video.creator는 object고 req.user.id는 string이다 그래서 !== 쓰면 안됨!
    if (video.creator != req.user.id) {
      throw Error();
    }

    res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
  } catch (error) {
    console.log("작성자와 로그인한 유저의 아이디가 다름");
    res.redirect(routes.home);
  }
};

//동영상 수정
export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description }
  } = req;

  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

//동영상 삭제
export const deleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const video = await Video.findById(id);

    if (video.creator != req.user.id) {
      throw Error();
    } else {
      await Video.findByIdAndRemove({ _id: id });
      const findUser = await User.findByIdAndUpdate(req.user.id, {
        $pull: { videos: id }
      });

      const fs = require("fs");

      fs.unlink(video.fileUrl, err => {
        console.log(video.fileUrl);
        console.log("파일삭제 실패");
        console.log(err);
        res.redirect(routes.home);
      });

      findUser.save();
    }
  } catch (error) {
    console.log(error);
  }

  res.redirect(routes.home);
};

//조회수 1증가
export const postRegisterView = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

//비디오 댓글 추가

export const postAddComment = async (req, res) => {
  const {
    body: { comment },
    params: { id },
    user
  } = req;

  try {
    const video = await Video.findById(id);

    //새로운 댓글 생성
    const newComment = await Comment.create({
      text: comment,
      creator: user.id
    });

    //비디오가 갖고있는 댓글 배열에 새로운 댓글 추가
    video.comments.push(newComment._id);
    video.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

//비디오 댓글 삭제

export const postDeleteComment = async (req, res) => {
  console.log("요청옴");

  const {
    body: { commentId }
  } = req;

  console.log(commentId);
};
