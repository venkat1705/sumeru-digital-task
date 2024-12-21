import { google } from "googleapis";
import JWT from "jsonwebtoken";
import * as dotenv from "dotenv";
import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";
dotenv.config();

// oauth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URI
);

// required scopes
const SCOPES = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
];

// controller to get the auth URL
export const googleAuth = (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });
    return res.json({ url: authUrl });
  } catch (error) {
    return res.status(500).json({ error: "Failed to generate OAuth URL" });
  }
};

// controller to get the user Info from oauth
export const googleAuthCallback = async (req, res) => {
  const { code } = req.query;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });

    const userInfo = await oauth2.userinfo.get();

    // console.log("userInfo", userInfo);

    let user = await User.findOne({ userId: userInfo.data.id });

    if (!user) {
      user = new User({
        userId: userInfo.data.id,
        userName: userInfo.data.name,
        emailAddress: userInfo.data.email,
        picture: userInfo.data.picture,
      });

      generateToken(user._id, res);
      await user.save();

      res.redirect("http://localhost:5173/chat");
    } else {
      //   console.log("running else case");
      const token = generateToken(user._id, res);
      console.log(token);

      if (token) {
        res.redirect("http://localhost:5173/chat");
      }
    }

    // console.log(userInfo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to get user info" });
  }
};

// logout user

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    // console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// check user auth
export const checkAuth = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
