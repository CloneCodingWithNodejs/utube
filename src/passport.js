import passport from "passport";
import dotenv from "dotenv";
import User from "./models/User";
import facebookStrategy from "passport-facebook";
import githubStrategy from "passport-github";
import {
  githubLoginCallback,
  facebookLoginCallback
} from "./controllers/userControllers";
import routes from "./routes";

dotenv.config();

//로그인하는 방식을 하나 설정
passport.use(User.createStrategy());

passport.use(
  new githubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: process.env.PRODUCTION
        ? `https://limitless-thicket-99758.herokuapp.com${routes.githubCallback}`
        : `http://localhost:4000${routes.githubCallback}`
    },
    githubLoginCallback //이 함수에서 유저를 찾거나 생성하면됨
  )
);

passport.use(
  new facebookStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `https://limitless-thicket-99758.herokuapp.com${routes.facebookCallback}`,
      profileFields: ["id", "displayName", "photos", "email"],
      scope: ["public_profile", "email"]
    },
    facebookLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
