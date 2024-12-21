import JWT from "jsonwebtoken";
import User from "../models/user.model.js";

export const requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    // const { authorization } = req.headers;

    // if (!authorization) {
    //   return res
    //     .status(202)
    //     .json({ message: "Unauthorized - No token provided" });
    // }
    // const token = authorization.replace("Bearer ", "");

    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Invalid or expired token" });
    }

    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      return res.json(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
