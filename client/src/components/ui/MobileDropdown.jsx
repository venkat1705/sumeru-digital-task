import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { useAuthStore } from "@/store/authStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton, useSidebar } from "./sidebar";
import { BadgeCheck, Bell, CreditCard, LogOut, Sparkles } from "lucide-react";
import { Button } from "./button";

const MobileDropdown = () => {
  const { authUser, logout } = useAuthStore();
  const { isMobile } = useSidebar();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground md:h-8 md:p-0 w-8 h-8"
          >
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={authUser?.picture} alt={authUser?.userName} />
              <AvatarFallback className="rounded-lg uppercase">
                {authUser?.userName?.substr(0, 2)}
              </AvatarFallback>
            </Avatar>

            {/* <ChevronsUpDown className="ml-auto size-4" /> */}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          side={isMobile ? "bottom" : "right"}
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={authUser?.picture} alt={authUser?.userName} />
                <AvatarFallback className="rounded-lg uppercase">
                  {authUser?.userName?.substr(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {authUser?.userName}
                </span>
                <span className="truncate text-xs">
                  {authUser?.emailAddress}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => logout()}>
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MobileDropdown;
