import express from "express";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import { join, login, logout } from "../controllers/userControllers";


const globalRouter = express.Router();


//이렇게 관리하면 리다이렉트할때 Home의 URL이 무엇인지 외울필요가 없음 
globalRouter.get(routes.home, home);
globalRouter.get(routes.join, join);
globalRouter.get(routes.login, login);
globalRouter.get(routes.logout, logout);
globalRouter.get(routes.search, search);


export default globalRouter;