import React from "react";

const NoSelectedChat = () => {
  return (
    <div className="flex items-center flex-col justify-center h-screen">
      <div className="text-center">
        <img
          src="/logo.svg"
          width="100%"
          height="100%"
          className="w-[60px] h-full"
        />
      </div>
      <div className="max-w-md mt-4">
        <h1 className="text-2xl text-center font-semibold antialiased tracking-wide">
          Welcome to Chatstore
        </h1>
        <p className="caption text-center">
          Your One-Stop Hub for Seamless Conversations and More. Please select a
          chat to start Conversation."
        </p>
      </div>
    </div>
  );
};

export default NoSelectedChat;
