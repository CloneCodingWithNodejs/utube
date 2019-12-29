import routes from "../routes";

export const getJoin = (req,res) => {
  
    res.render("join", {pageTitle : "Join"});
};


export const postJoin =(req,res) => {
    
    const {
        body : {name, email, password, password2}
    } = req;

    if(password !== password2){
        res.status(400);
        res.render("join", {pageTitle : "Join"});
    }else{
        //유저 회원가입 
        //유저 로그인 
        res.redirect(routes.home);
    }

    res.render("join", {pageTitle : "Join"});


};


//로그인 창 
export const getLogin = (req,res) => res.render("login",{pageTitle : "Log In"});

//로그인 버튼을 클릭했을때 
export const postLogin =(req,res) => {

    res.redirect(routes.home);

};

//로그아웃 처리 
export const logout = (req,res) => {

    
    
    res.redirect(routes.home);    

};


export const users = (req,res) => res.send("USERS");
export const userDetail = (req,res) => res.render("userDetail");
export const editProfile = (req,res) => res.render("editProfile",{pageTitle : "Edit Profile"});
export const changePassword = (req,res) => res.render("changePassword",{pageTitle : "Change Password"});



