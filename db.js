import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

//DB가 어디에 연결되어있는지 주소를 입력함 
mongoose.connect(
    process.env.MONGO_URL,
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