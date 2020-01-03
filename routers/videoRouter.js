import express from "express";
import routes from "../routes";
import { videos, 
    getUpload, 
    postUpload, 
    videoDetail, 
    editVideo, 
    deleteVideo, 
    search } from "../controllers/videoController";
import { uploadVideo } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get(routes.upload,getUpload);
videoRouter.post(routes.upload, uploadVideo , postUpload);

videoRouter.get(routes.videoDetail(),videoDetail);
videoRouter.get(routes.editVideo,editVideo);
videoRouter.get(routes.deleteVideo,deleteVideo);
videoRouter.get(routes.search, search);

export default videoRouter;