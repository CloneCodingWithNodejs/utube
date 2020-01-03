

import routes from "../routes";
import Video from "../models/Video";


export const home = async(req,res) => {
   
    try {
        //DB에 있는 모든 비디오를 가져와라 
        const videos = await Video.find({});
        res.render("home", {pageTitle: "Home", videos});
    } catch (error) {
        console.log(error);
        //에러가 날 경우 빈 배열을 전송 
        res.render("home", {pageTitle: "Home", videos: []});
    }

 
};

export const search = (req,res) => {
   
    const {query : 
             {term : searchingBy}    
          } = req;
        
    res.render("search",{ pageTitle : "search", searchingBy : searchingBy, videos});

};


export const getUpload = (req,res) => res.render("upload",{pageTitle : "upload"});

export const postUpload = async (req,res) => {
  
     const {
         body : { title, description },
         file : { path }
     } = req;

     const newVideo = await Video.create({

        fileUrl : path,
        title,
        description

     });

     console.log(newVideo);
    
    
    //해야 할일 비디오 업로드 및 저장 
    //업로드가 끝나면 해당 비디오 상세페이지로 이동 
    res.redirect(routes.videoDetail(newVideo.id));    

    
};

export const videoDetail = async (req,res) => {

    const {
        params : {id}
    }  = req;
    
    try {
        const video = await Video.findById(id);
        console.log(video);
        res.render("videoDetail",{pageTitle : "Video Detail", video});
    } catch (error) {
        console.log(error);
        res.redirect(routes.home);

    }
    
    };


export const editVideo = (req,res) => res.render("editVideo");
export const deleteVideo = (req,res) => res.send("DELETE VIDEO");