import User from "../models/user.model.js";

export const retrieveUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
