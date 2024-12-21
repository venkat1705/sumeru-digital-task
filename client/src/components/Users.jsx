import { useAuthStore } from "@/store/authStore";
import { useChatStore } from "@/store/chatStore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "./ui/button";
import Loader from "./Loader";

const Users = ({ searchQuery, selected }) => {
  const { getUsers, users, setSelectedUser, getChats, chats, isUserLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const navigate = useNavigate();
  const { id } = useParams();

  const [lastMessages, setLastMessages] = useState({});

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    if (users?.length > 0) {
      users?.forEach(async (user) => {
        await getChats(user._id);
      });
    }
  }, [users, getChats]);

  useEffect(() => {
    if (chats?.length) {
      const newLastMessages = {};

      users?.forEach((user) => {
        const userMessages = chats?.filter(
          (msg) => msg.senderId === user._id || msg.receiverId === user._id
        );
        const lastMessage = userMessages?.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        )[0];
        newLastMessages[user._id] = lastMessage;
      });

      setLastMessages(newLastMessages);
    }
  }, [chats, users]);

  const filteredUsers = users?.filter((user) =>
    user.userName.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  // Check if the selected user (text) matches any online users
  const isSelectedUserOnline = selected === "online";

  // If selected user is online, only show online users
  const usersToDisplay = isSelectedUserOnline
    ? filteredUsers.filter((user) => onlineUsers.includes(user._id))
    : filteredUsers;

  if (isUserLoading) {
    return (
      <div className="flex items-center flex-col justify-center h-full py-40">
        <Loader />
        <p>Please wait...</p>
      </div>
    );
  }
  if (usersToDisplay?.length === 0) {
    return (
      <div className="flex items-center justify-center h-full py-40">
        <p className="font-semibold">No Online users found</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <div className="space-y-4 w-full">
        {usersToDisplay?.map((user) => {
          const lastMessage = lastMessages[user._id];

          return (
            <Button
              onClick={() => {
                setSelectedUser(user);
                navigate(`/chat/${user._id}`);
              }}
              variant="ghost"
              key={user._id}
              className={`flex h-full transition-all duration-300 w-full items-center gap-2 hover:bg-accent py-3 px-2 rounded-xl cursor-pointer ${
                user?._id === id && "bg-accent"
              }`}
            >
              <div className="relative w-12 h-12 rounded-full bg-accent">
                <img
                  src={user.picture}
                  width="100%"
                  height="100%"
                  referrerPolicy="no-referrer"
                  className="rounded-full"
                />
                {onlineUsers.includes(user._id) && (
                  <span
                    className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                  />
                )}
              </div>

              <div className="flex-1 w-full flex-col">
                <div className="flex items-center justify-between">
                  <p className="font-medium capitalize text-sm antialiased tracking-wide">
                    {user.userName || ""}
                  </p>
                  {lastMessage?.updatedAt && (
                    <p className="text-xs text-green-500">
                      {new Date(lastMessage.updatedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 w-full text-left truncate max-w-[220px]">
                    {lastMessage?.text || "No messages yet..."}
                  </p>
                </div>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Users;
