import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/message.model.js";

export const retrieveMessages = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const user_id = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: user_id?.toString(), receiverId: receiverId },
        { senderId: receiverId, receiverId: user_id?.toString() },
      ],
    });

    res.json(messages);
  } catch (error) {
    res.status(200).json({ message: "Internal server error" });
  }
};

export const sendMessages = async (req, res) => {
  try {
    const { text, image } = req.body;

    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageURL;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);

      console.log(uploadResponse);
      imageURL = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageURL,
    });

    await newMessage.save();

    if (newMessage) {
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }
      res.json({ message: "Message delivered successfully", data: newMessage });
    } else {
      res.status(400).json({ message: "Message delivery failed" });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
