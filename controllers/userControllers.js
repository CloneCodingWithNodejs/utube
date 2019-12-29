export const join = (req,res) => res.render("join",{pageTitle : "Join"});
export const login = (req,res) => res.render("login",{pageTitle : "Log In"});
export const logout = (req,res) => res.send("LOGOUT");
export const users = (req,res) => res.send("USERS");
export const userDetail = (req,res) => res.send("USERDETAIL");
export const editProfile = (req,res) => res.render("editProfile",{pageTitle : "Edit Profile"});
export const changePassword = (req,res) => res.render("changePassword",{pageTitle : "Change Password"});



