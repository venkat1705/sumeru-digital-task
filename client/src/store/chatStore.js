import {
  handleGetMessage,
  handleGetUsers,
  handleSendMessage,
} from "@/actions/actions";
import { BASE_URL } from "@/actions/BASE_URL";
import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { useAuthStore } from "./authStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  chats: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,
  isMessageSubmitting: false,
  isChatLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await handleGetUsers();

      if (res.status === 200) {
        set({ users: res?.data });
      } else {
        set({ users: [] });
      }
    } catch (error) {
      toast.error({ error: error.response.data.message });
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const res = await handleGetMessage(userId);

      if (res?.status === 200) {
        set({ messages: res?.data });
      } else {
        set({ messages: [] });
      }
    } catch (error) {
      toast.error({ error: error.response.data.message });
    } finally {
      set({ isMessageLoading: false });
    }
  },
  getChats: async (userId) => {
    set({ isChatLoading: true });
    try {
      const res = await handleGetMessage(userId);

      if (res?.status === 200) {
        set({ chats: res?.data });
      } else {
        set({ chats: [] });
      }
    } catch (error) {
      toast.error({ error: error.response.data.message });
    } finally {
      set({ isChatLoading: false });
    }
  },

  sendMessage: async (data, id) => {
    const { messages } = get();
    set({ isMessageSubmitting: true });
    try {
      const res = await handleSendMessage(data, id);
      if (res.status === 200) {
        set({ messages: [...messages, res?.data?.data] });
      } else {
        toast.error("Filesize is too large");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessageSubmitting: false });
    }
  },

  subscribeToMessages: (id) => {
    if (!id) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === id;
      if (!isMessageSentFromSelectedUser) return;

      console.log(newMessage);

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: async (user) => set({ selectedUser: user }),
}));
