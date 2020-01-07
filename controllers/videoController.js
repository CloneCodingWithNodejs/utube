import routes from "../routes";
import Video from "../models/Video";

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

export const getUpload = (req, res) =>
  res.render("upload", {
    pageTitle: "upload"
  });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path }
  } = req;

  const newVideo = await Video.create({ fileUrl: path, title, description });

  // 해야 할일 비디오 업로드 및 저장
  // 업로드가 끝나면 해당 비디오 상세페이지로 이동
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const video = await Video.findById(id);
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const video = await Video.findById(id);
    res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

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

export const deleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    await Video.findOneAndRemove({ _id: id });
  } catch (error) {
    console.log(error);
  }

  res.redirect(routes.home);

  res.send("DELETE VIDEO");
};
