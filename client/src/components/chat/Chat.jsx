import { useAuthStore } from "@/store/authStore";
import { useChatStore } from "@/store/chatStore";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import MainSidebarProvider from "../providers/sidebarProvider";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";

const Chat = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const messageEndRef = useRef(null);

  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();

  const { id } = useParams();
  const { getUsers, users } = useChatStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const user = users?.filter((item) => item?._id === id)[0];

  useEffect(() => {
    getMessages(id);
    subscribeToMessages(id);

    return () => unsubscribeFromMessages();
  }, [getMessages, id, subscribeToMessages, unsubscribeFromMessages]);

  // Scroll to the last message when messages update
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Group messages by day
  const groupMessagesByDay = (messages = []) => {
    const groupedMessages = [];

    let currentDay = null;
    let currentDayMessages = [];

    messages.forEach((message) => {
      const messageDate = new Date(message.createdAt);
      const messageDay = messageDate.toDateString();

      if (messageDay !== currentDay) {
        if (currentDayMessages.length > 0) {
          groupedMessages.push({
            day: currentDay,
            messages: currentDayMessages,
          });
        }
        currentDay = messageDay;
        currentDayMessages = [message];
      } else {
        currentDayMessages.push(message);
      }
    });

    // Push the last grouped day messages
    if (currentDayMessages.length > 0) {
      groupedMessages.push({ day: currentDay, messages: currentDayMessages });
    }

    return groupedMessages;
  };

  const filteredMessages = messages.filter((item) =>
    item?.text?.toLowerCase()?.includes(searchQuery?.toLocaleLowerCase())
  );

  const groupedMessages =
    filteredMessages?.length > 0
      ? groupMessagesByDay(filteredMessages ? filteredMessages : [])
      : [];

  return (
    <MainSidebarProvider>
      <div className="flex flex-col overflow-y-auto h-dvh">
        <ChatHeader setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
        <div className="flex-1 overflow-auto px-4 py-6">
          {isMessagesLoading ? (
            <div className="flex items-center flex-col h-max-h-dvh py-40">
              <Loader />
              <p>Please wait we are fetching your messages...</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {groupedMessages?.map((group) => (
                <div key={group.day} className="flex flex-col gap-6">
                  <p className="text-center text-sm opacity-50">{group.day}</p>
                  {group?.messages?.map((message) => (
                    <div
                      key={message._id}
                      className={`chat flex  items-center gap-2 ${
                        message.senderId === authUser._id
                          ? "chat-end"
                          : "chat-start"
                      }`}
                    >
                      <div className="chat-image avatar">
                        <div className="size-10 rounded-full border">
                          <img
                            src={
                              message?.senderId === authUser?._id
                                ? authUser?.picture || "/avatar.png"
                                : user?.picture || "/avatar.png"
                            }
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-full bg-accent"
                            alt="profile pic"
                          />
                        </div>
                      </div>
                      <div
                        className={`chat-bubble p-2 rounded-lg ${
                          message.senderId === authUser._id
                            ? "bg-green-900 text-white"
                            : "bg-accent text-white"
                        }`}
                      >
                        {message.image && (
                          <img
                            src={message.image}
                            alt="Attachment"
                            className="sm:max-w-[200px] rounded-md mb-2"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        {message.text && (
                          <p className="max-w-md">
                            {message.text}{" "}
                            <span>
                              <time className="text-xs opacity-50 ml-1">
                                {new Date(message.createdAt).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </time>
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              {/* This div ensures we scroll to the bottom */}
              <div ref={messageEndRef}></div>
            </div>
          )}
        </div>
        <ChatMessage />
      </div>
    </MainSidebarProvider>
  );
};

export default Chat;
