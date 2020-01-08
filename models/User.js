import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: Number,
  githubId: Number
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

UserSchema.statics.serializeUser = () => (user, cb) => cb(null, user.id);

UserSchema.statics.deserializeUser = function() {
  const self = this;
  return (id, cb) => self.findById(id, cb);
};

const model = mongoose.model("User", UserSchema);

export default model;
