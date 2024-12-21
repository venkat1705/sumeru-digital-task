import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    emailAddress: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    picture: {
      type: String,
    },
    lastActive: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
