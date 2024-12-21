"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const Navbar = () => {
  const [scroll, setScroll] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 8) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 inset-x-0 h-16 w-full z-[99999] border-b select-none lg:px-28 md:px-6 px-3 flex items-center",
        scroll && "border-input bg-background/60 backdrop-blur-md border-b "
      )}
    >
      <div className="flex items-center justify-between h-full">hello</div>

      {/* <MobileNavbar /> */}
    </header>
  );
};

export default Navbar;
