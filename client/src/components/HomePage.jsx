import { useChatStore } from "@/store/chatStore";
import ChatUsers from "./ChatUsers";
import NoSelectedChat from "./NoSelectedChat";
import MainSidebarProvider from "./providers/sidebarProvider";

const HomePage = () => {
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
