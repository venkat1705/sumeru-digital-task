import React from "react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "../app-sidebar";
import { Separator } from "../ui/separator";
import { useChatStore } from "@/store/chatStore";

const MainSidebarProvider = ({ children }) => {
  const { selectedUser } = useChatStore();
  return (
    <main>
      <SidebarProvider
        style={{
          "--sidebar-width": "400px",
        }}
      >
        <AppSidebar />
        <SidebarInset>
          <div>{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
};

export default MainSidebarProvider;
