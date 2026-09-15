import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  roles: [
    {
      tyrp: String,
      default: " Employee",
    },
  ],
  active: {
    tyrp: Boolean,
    default: true,
  },
});

export default mongoose.model("User", userSchema);
