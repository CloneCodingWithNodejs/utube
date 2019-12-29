

import routes from "../routes";

export const home = (req,res) => {

    
    res.render("home", {pageTitle: "Home", videos});

};

export const search = (req,res) => {
   
    const {query : 
             {term : searchingBy}    
          } = req;
        
    res.render("search",{ pageTitle : "search", searchingBy : searchingBy, videos});

};


export const getUpload = (req,res) => res.render("upload",{pageTitle : "upload"});

export const postUpload = (req,res) => {
  
    const {
        body : { file , title, description }
    } = req;
   
    //해야 할일 비디오 업로드 및 저장 
    //업로드가 끝나면 해당 비디오 상세페이지로 이동 

    res.redirect(routes.videoDetail(3828192));    

};

export const videoDetail = (req,res) => res.send("VIDEO DETAIL");
export const editVideo = (req,res) => res.render("editVideo");
export const deleteVideo = (req,res) => res.send("DELETE VIDEO");