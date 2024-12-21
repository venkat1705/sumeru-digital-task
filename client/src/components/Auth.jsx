import React, { useState } from "react";
import { Button } from "./ui/button";
import { handleGetAuthURL } from "@/actions/actions";
import toast from "react-hot-toast";
import Loader from "./Loader";

const Auth = () => {
  const [loading, setLoading] = useState(false);

  const getAuthURL = async () => {
    setLoading(true);
    try {
      const res = await handleGetAuthURL();

      if (res.status === 200) {
        window.location.href = res?.data?.url;
      } else {
        toast.error("Failed to retrieve auth URL");
      }
    } catch (error) {
      toast.error(error?.response?.message || "Error Occured");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="px-4">
      <div className=" flex flex-col items-center justify-center h-screen">
        <div>
          <div>
            <img
              src="/logo.svg"
              width="100%"
              height="100%"
              className="w-[60px] h-full"
            />
          </div>
          <div className="py-4">
            <h1 className="title">Your Conversation Hub</h1>
            <p className="caption">
              Streamline your communication with fast and secure chat.
            </p>
          </div>

          <div className="mt-6">
            <Button
              onClick={getAuthURL}
              className="w-full h-12 bg-accent antialiased tracking-wide"
              variant="outline"
            >
              {loading ? (
                <Loader />
              ) : (
                <>
                  <img
                    src="google.svg"
                    width="100%"
                    height="100%"
                    className="w-[25px] h-[25px]"
                  />
                  <p>Continue with Google</p>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
