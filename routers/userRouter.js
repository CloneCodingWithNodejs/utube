import express from "express";
import routes from "../routes";
import {
  userDetail,
  editProfile,
  changePassword
} from "../controllers/userControllers";

const userRouter = express.Router();

//editProfile이 userDetail 보다 위에 있어야함
//아니면 userdetail이 /:id 라고 생겼기때문에 뒤에오는 url을 id로 인식함
userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
