import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 }
  } = req;

  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email,
        avatarUrl: ""
      });

      await User.register(user, password);

      next();
    } catch (error) {
      //유저 로그인
      res.redirect(routes.home);
    }
  }
};

//로그인 창
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Log In" });

//로그인 버튼을 클릭했을때
export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home
});

//로그아웃 처리
export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

//깃허브 login
export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  const {
    _json: { id, avatar_url, name, email }
  } = profile;

  try {
    const user = await User.findOne({ email });

    //깃허브에서 사용하는 이메일과 회원가입되어있는 같은 이메일이 있다면
    //깃허브 ID를 API에서 얻어온 ID로 업데이트함
    if (user) {
      user.githubId = id;
      user.save();
      //콜백함수에 찾은 user를 전달함
      return cb(null, user);
    } else {
      //그렇지않다면 새로 DB에 추가함
      const newUser = await User.create({
        email,
        name,
        githubId: id,
        avatarUrl: avatar_url
      });

      //콜백함수에 새로생성한 user를 전달함
      return cb(null, newUser);
    }
  } catch (error) {
    return cb(error);
  }
};

export const facebookLogin = passport.authenticate("facebook");

export const facebookLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  const {
    _json: { id, name, email }
  } = profile;

  try {
    const user = await User.findOne({ email });

    //깃허브에서 사용하는 이메일과 회원가입되어있는 같은 이메일이 있다면
    //깃허브 ID를 API에서 얻어온 ID로 업데이트함
    if (user) {
      user.facebookId = id;
      user.avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
      user.save();
      //콜백함수에 찾은 user를 전달함
      return cb(null, user);
    } else {
      //그렇지않다면 새로 DB에 추가함
      const newUser = await User.create({
        email,
        name,
        facebookId: id,
        avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`
      });

      //콜백함수에 새로생성한 user를 전달함
      return cb(null, newUser);
    }
  } catch (error) {
    return cb(error);
  }
};

export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const myProfile = (req, res) => {
  res.render("userDetail", { pageTitle: "User Detail", user: req.user });
};

export const userDetail = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const user = await User.findById(id);

    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const users = (req, res) => res.send("USERS");

export const geteditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file
  } = req;

  try {
    //브라우저에서 서버값을 바로 반영못하는 이슈가있음

    // await User.findByIdAndUpdate(req.user._id, {
    //   name,
    //   email,
    //   avatarUrl: file ? file.path : req.user.avatarUrl
    // });

    req.user.name = name;
    req.user.email = email;
    req.user.avatarUrl = file ? file.path : req.user.avatarUrl;
    req.user.save();

    res.redirect(routes.myProfile);
  } catch (error) {
    console.log(error);
    res.render("editProfile", { pageTitle: "Edit Profile" });
  }
};

export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 }
  } = req;

  try {
    if (newPassword !== newPassword1) {
      res.status(400);
      res.redirect(`/users${routes.changePassword}`);
    }

    await req.user.changePassword(oldPassword, newPassword);

    res.redirect(routes.myProfile);
  } catch (error) {
    console.log("비밀번호 변경 에러" + error);
    res.redirect(`/users${routes.changePassword}`);
  }
};
