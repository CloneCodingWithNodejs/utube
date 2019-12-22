
export const home = (req,res) => res.render("home");
export const search = (req,res) => res.send("SEARCH");
export const videos = (req,res) => res.send("VIDEOS");
export const upload = (req,res) => res.send("UPLOAD");
export const videoDetail = (req,res) => res.send("VIDEO DETAIL");
export const editVideo = (req,res) => res.send("EDIT VIDEO");
export const deleteVideo = (req,res) => res.send("DELETE VIDEO");