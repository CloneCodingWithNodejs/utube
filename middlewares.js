import routes from "./routes";
import multer from "multer";

const multerVideo = multer({ dest: "uploads/videos/" });

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

//input 태그의 Name
export const uploadVideo = multerVideo.single("videoFile");
