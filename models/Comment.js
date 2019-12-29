import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({

    text : { 
        type : String,
        required : "댓글 내용은 반드시 필요합니다"
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});


const model = mongoose.model("Comment", CommentSchema);

export default model;