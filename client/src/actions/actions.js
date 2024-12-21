import axios from "axios";
import { BASE_URL } from "./BASE_URL";

export const handleGetAuthURL = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/auth/google`, {
      method: "GET",
    });
    return res;
  } catch (error) {
    return error;
  }
};

// handle get users

export const handleGetUsers = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/user/users`, {
      method: "GET",
      withCredentials: true,
    });
    return res;
  } catch (error) {
    return error;
  }
};

// handle get messages

export const handleGetMessage = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/chat/${id}`, {
      method: "GET",
      withCredentials: true,
    });

    return res;
  } catch (error) {
    return error;
  }
};

// handle send message

export const handleSendMessage = async (data, id) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/chat/send/${id}`, data, {
      withCredentials: true,
    });

    console.log(res);

    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};
