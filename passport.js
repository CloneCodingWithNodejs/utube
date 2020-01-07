import passport from "passport";
import User from "./models/User";
import githubStrategy from "passport-github";
import { githubLoginCallback } from "./controllers/userControllers";
import routes from "./routes";

//로그인하는 방식을 하나 설정
passport.use(User.createStrategy());

passport.use(
  new githubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`
    },
    githubLoginCallback //이 함수에서 유저를 찾거나 생성하면됨
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
