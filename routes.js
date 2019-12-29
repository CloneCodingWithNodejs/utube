//여기서 URL을 생성하고 ~~Router.js 에서 가져다 쓸거임 

//Global 전역 
const HOME ="/"; //홈 
const JOIN ="/join"; //회원가입
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

//About Users

const USERS ="/users";
const USER_DETAIL ="/:id"; //EX /users/1921
const EDIT_PROFILE = "/edit-profile"; 
const CHANGE_PASSWORD = "/change-password";

//About videos

const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id"; //:id 같은 경우 Express가 변수라고 알아챔 
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDED ="/:id/delete";


const routes = { 
    home: HOME,
    join: JOIN,
    login : LOGIN,
    logout : LOGOUT,
    search : SEARCH,
    users : USERS,
    userDetail : (id) => {
        if(id){
            return `/users/${id}`;
        }else{
         return USER_DETAIL;   
        }
    },
    editProfile : EDIT_PROFILE,
    changePassword : CHANGE_PASSWORD,
    videos : VIDEOS,
    upload : UPLOAD,
    videoDetail : (id) => {
        if(id){
            return `/videos/${id}`;
        }else{
            return VIDEO_DETAIL;
        }
    },
    editVideo : EDIT_VIDEO,
    deleteVideo : DELETE_VIDED
};

export default routes;