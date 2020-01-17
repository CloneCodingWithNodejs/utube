import routes from "./routes";
import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  secretAccessKey: process.env.AWS_SECRET,
  accessKeyId: process.env.AWS_ACCESSKEY
});

//local에 저장하는 방식
// const multerVideo = multer({ dest: "uploads/videos/" });
// const multerAvater = multer({ dest: "uploads/avatars" });

//S3에 저장하는 방식
const multerVideo = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "utube-com/video"
  })
});
const multerAvater = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "utube-com/avatar"
  })
});

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "Utube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;

  next();
};

//로그인한 사용자가 접근하지 못하도록 하는 미들웨어
export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

//로그인한 사용자만 접근하도록 하는 미들웨어
export const onlyPrivate = (req, res, next) => {
  if (!req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

//input 태그의 Name  , multer를 사용한 미들웨어
export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvater.single("avatar");
