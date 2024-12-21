import { ListFilterIcon } from "lucide-react";
import Users from "./Users";
import MobileDropdown from "./ui/MobileDropdown";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
} from "./ui/sidebar";
import { useState } from "react";
import { Button } from "./ui/button";

let types = [
  {
    name: "All",
    value: "all",
  },
  {
    name: "Online",
    value: "online",
  },
];

const ChatUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState("all");

  return (
    <Sidebar collapsible="none" className="w-full h-screen">
      <SidebarHeader className="gap-3.5 border-b p-4">
        <div className="flex w-full items-center justify-between">
          <div className="text-base font-medium text-foreground">Chats</div>
          <div className="flex items-center gap-2">
            <div className="lg:hidden">
              <MobileDropdown />
            </div>
            {/* <NavUser user={user} /> */}
          </div>
        </div>
        <SidebarInput
          placeholder="Type to search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex items-center gap-2">
          {types?.map((item, index) => (
            <Button
              onClick={() => setSelected(item?.value)}
              variant="ghost"
              key={index}
              className={`px-6 py-1 hover:text-green-400  rounded-full cursor-pointer ${
                selected === item?.value
                  ? "text-green-400 bg-accent"
                  : "bg-[#2F2F2F]"
              }`}
            >
              <p>{item?.name}</p>
            </Button>
          ))}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="px-0">
          <SidebarGroupContent>
            <Users searchQuery={searchQuery} selected={selected} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default ChatUsers;
