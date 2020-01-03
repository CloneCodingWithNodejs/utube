import express from "express";
import routes from "../routes";
import {
    videos,
    getUpload,
    postUpload,
    videoDetail,
    deleteVideo,
    search,
    getEditVideo,
    postEditVideo
} from "../controllers/videoController";
import {
    uploadVideo
} from "../middlewares";

const videoRouter = express.Router();

videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);

//여기서는 id를 매개변수로 넣지않고 실행만 해준다 
videoRouter.get(routes.videoDetail(), videoDetail);

videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);

videoRouter.get(routes.deleteVideo(), deleteVideo);


videoRouter.get(routes.search, search);

export default videoRouter;