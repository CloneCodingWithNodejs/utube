import express from "express";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
  githubLogin,
  postGithubLogin,
  myProfile,
  postFacebookLogin,
  facebookLogin
} from "../controllers/userControllers";
import { onlyPublic, onlyPrivate } from "../middlewares";
import passport from "passport";

const globalRouter = express.Router();

//이렇게 관리하면 리다이렉트할때 Home의 URL이 무엇인지 외울필요가 없음
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.home, home);

globalRouter.get(routes.myProfile, myProfile);

//비로그인 유저만 접근할 수 있음 onlyPublic
globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.search, search);

globalRouter.get(routes.github, githubLogin);
globalRouter.get(routes.facebook, facebookLogin);

//callback URL로 요청이오면
globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: routes.login }),

  //성공하면 홈으로 돌아가는 함수
  postGithubLogin
);

globalRouter.get(
  routes.facebookCallback,
  passport.authenticate("facebook", { failureRedirect: routes.login }),

  postFacebookLogin
);

export default globalRouter;
