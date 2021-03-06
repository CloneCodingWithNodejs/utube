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
    req.flash("error", "비밀번호가 일치하지 않습니다");
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email,
        avatarUrl:
          "https://utube-com.s3.ap-northeast-2.amazonaws.com/avatar/4787416a153dafef34097ad9166b1178"
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
  successRedirect: routes.home,
  failureFlash: "로그인 실패 비밀번호나 이메일을 확인해주세요",
  successFlash: "로그인 성공 -Welcome-"
});

//로그아웃 처리
export const logout = (req, res) => {
  req.flash("success", "성공적으로 로그아웃 되었습니다");
  req.logout();
  res.redirect(routes.home);
};

//깃허브 로그인
export const githubLogin = passport.authenticate("github", {
  failureFlash: "로그인 실패 비밀번호나 이메일을 확인해주세요",
  successFlash: "로그인 성공 -Welcome-"
});

//깃허브 로그인 콜백
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

export const facebookLogin = passport.authenticate("facebook", {
  failureFlash: "로그인 실패 비밀번호나 이메일을 확인해주세요",
  successFlash: "로그인 성공 -Welcome-"
});

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

//내 정보 페이지
export const myProfile = (req, res) => {
  res.render("myProfile", { pageTitle: "User Detail", user: req.user });
};

//사용자 상세보기
export const userDetail = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const user = await User.findById(id).populate("videos");

    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const users = (req, res) => res.send("USERS");

//프로필 수정 폼
export const geteditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });

//프로필 수정
export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file
  } = req;

  try {
    const updateUser = await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.location : req.user.avatarUrl
    });

    //이거 까먹지 말고 꼭 해줘라
    updateUser.save();

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
