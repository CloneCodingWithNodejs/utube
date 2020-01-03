import routes from "./routes";
import multer from "multer";


 const multerVideo = multer({dest: "uploads/videos/"});


export const localMiddleware = (req, res, next) => {
    res.locals.siteName = "Utube";
    res.locals.routes = routes;
    res.locals.user = {
        isAuthenticated : true,
        id : 3
    };

    next();
};


                                        //input 태그의 Name
export const uploadVideo = multerVideo.single("videoFile");