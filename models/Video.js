import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: "파일의 URL이 반드시 필요합니다"
  },
  title: {
    type: String,
    required: "제목이 반드시 필요합니다"
  },
  description: {
    type: String
  },
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  //비디오에 달린 댓글 정보들, 각각의 댓글들은 ObjectId를 가지고있음
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});
//매개변수 1 :  모델의 이름, 2 : 사용할 스키마
const model = mongoose.model("Video", VideoSchema);

export default model;
