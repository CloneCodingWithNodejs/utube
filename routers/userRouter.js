import express from "express";
import routes from "../routes";
import {
  userDetail,
  editProfile,
  changePassword
} from "../controllers/userControllers";
import { onlyPrivate } from "../middlewares";

const userRouter = express.Router();

//editProfile이 userDetail 보다 위에 있어야함
//아니면 userdetail이 /:id 라고 생겼기때문에 뒤에오는 url을 id로 인식함
userRouter.get(routes.editProfile, onlyPrivate, editProfile);
userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), onlyPrivate, userDetail);

export default userRouter;
