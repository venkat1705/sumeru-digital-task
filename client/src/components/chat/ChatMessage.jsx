import { ImageIcon, SendIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useRef, useState } from "react";
import { useChatStore } from "@/store/chatStore";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import Loader from "../Loader";

const ChatMessage = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage, isMessageSubmitting } = useChatStore();
  const { id } = useParams();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage(
        {
          text: text.trim(),
          image: imagePreview,
        },
        id
      );

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="">
      <div className="p-4 w-full bg-[#2F2F2F] rounded-t-2xl">
        {imagePreview && (
          <div className="mb-3 flex items-center gap-2">
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-12 h-12 object-cover rounded-lg border border-zinc-700"
              />
              <button
                onClick={removeImage}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
                type="button"
              >
                <XIcon className="size-3" />
              </button>
            </div>
          </div>
        )}

        <form
          onSubmit={handleSendMessage}
          className="flex items-center justify-between"
        >
          <div className="flex items-center w-full">
            <input
              type="text"
              className="w-full bg-transparent outline-none h-14"
              placeholder="Type a message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </div>

          <Button
            onClick={handleSendMessage}
            disabled={!text && !imagePreview}
            type="submit"
            variant="ghost"
            className="w-10 h-10 rounded-xl absolute bottom-4 right-0 mr-4"
          >
            {isMessageSubmitting ? <Loader /> : <SendIcon size={20} />}
          </Button>
        </form>
        <Button
          disabled={isMessageSubmitting}
          className="w-10 h-10 rounded-xl"
          onClick={() => fileInputRef.current?.click()}
          variant="ghost"
        >
          <ImageIcon size={20} />
        </Button>
      </div>

      {/* Image Icon outside of the form */}
    </div>
  );
};

export default ChatMessage;
