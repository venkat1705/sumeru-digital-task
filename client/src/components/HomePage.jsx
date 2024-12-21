import React from "react";
import { AppSidebar } from "./app-sidebar";
import MainSidebarProvider from "./providers/sidebarProvider";
import { useChatStore } from "@/store/chatStore";
import NoSelectedChat from "./NoSelectedChat";
import Chat from "./chat/Chat";
import Users from "./Users";
import ChatUsers from "./ChatUsers";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div>
      <MainSidebarProvider>
        <div className="lg:hidden">
          <ChatUsers />
        </div>
        <div className="hidden lg:block">
          <NoSelectedChat />
        </div>
      </MainSidebarProvider>
    </div>
  );
};

export default HomePage;
