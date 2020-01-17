import express from "express";
import routes from "../routes";
import {
  userDetail,
  getChangePassword,
  geteditProfile,
  postEditProfile,
  postChangePassword
} from "../controllers/userControllers";
import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

//editProfile이 userDetail 보다 위에 있어야함
//아니면 userdetail이 /:id 라고 생겼기때문에 뒤에오는 url을 id로 인식함
userRouter.get(routes.editProfile, onlyPrivate, geteditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);

userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);

userRouter.get(routes.userDetail(), onlyPrivate, userDetail);

export default userRouter;
