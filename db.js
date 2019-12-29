import mongoose from 'mongoose';

//DB가 어디에 연결되어있는지 주소를 입력함 
mongoose.connect(
    "mongodb://localhost:27017/utube",
    {
        useNewUrlParser : true,
        useFindAndModify : false
    }
 );

const db = mongoose.connection;

const handleOpen = () => {
    console.log("🔥🔥🔥 Conneted to DB 🔥🔥🔥");
};

const handleError = (error) =>{
    console.log(`💦💦💦Error on DB Connection ${error}`);
};

db.once("open", handleOpen);
db.on("error",handleError);