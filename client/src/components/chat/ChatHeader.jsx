import { useAuthStore } from "@/store/authStore";
import { useChatStore } from "@/store/chatStore";
import { SearchIcon, XIcon } from "lucide-react"; // Import XIcon
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Input } from "../ui/input";

const ChatHeader = ({ searchQuery, setSearchQuery }) => {
  const { getUsers, users } = useChatStore();
  const { id } = useParams();
  const { onlineUsers } = useAuthStore();

  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const user = users?.find((item) => item?._id === id);

  const getLastActive = (lastActive) => {
    if (!lastActive) return "unknown";
    return `${formatDistanceToNow(new Date(lastActive), { addSuffix: true })}`;
  };

  const toggleSearch = () => {
    setIsSearchVisible((prev) => !prev);
  };

  const clearSearch = () => {
    setIsSearchVisible(false);
    setSearchQuery("");
  };

  return (
    <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4 w-full">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent">
            <img
              src={user?.picture}
              width="100%"
              height="100%"
              referrerpolicy="no-referrer"
              className="rounded-full"
              alt="user avatar"
            />
          </div>

          <div>
            <p className="font-medium capitalize antialiased tracking-wide">
              {user?.userName || "loading..."}
            </p>

            {onlineUsers.includes(user?._id) ? (
              <p className="text-sm antialiased tracking-wide text-green-500">
                Online
              </p>
            ) : (
              <p className="text-sm antialiased tracking-wide text-slate-400">
                Last active{" "}
                {getLastActive(
                  user?.lastActive ? user?.lastActive : user?.createdAt
                )}
              </p>
            )}
          </div>
        </div>

        {!isSearchVisible && (
          <div>
            <div
              className="w-10 h-10 hover:bg-accent rounded-xl flex-center"
              onClick={toggleSearch}
            >
              <SearchIcon size={20} />
            </div>
          </div>
        )}
      </div>

      {isSearchVisible && (
        <div className="flex items-center transition-all duration-300">
          <Input
            type="text"
            className="border w-[400px] rounded-2xl h-10 transition-all duration-300"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          <div
            className="w-10 h-10 hover:bg-accent rounded-xl flex-center ml-2"
            onClick={clearSearch}
          >
            <XIcon size={20} />
          </div>
        </div>
      )}
    </header>
  );
};

export default ChatHeader;
