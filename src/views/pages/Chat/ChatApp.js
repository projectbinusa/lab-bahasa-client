import React, { useState } from "react";
import { API_DUMMY } from "../../../utils/api";

const authConfig = {
  headers: {
    "auth-event": `jwt ${localStorage.getItem("token")}`,
  },
};

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const class_id = localStorage.getItem("class_id")
  const group_id = localStorage.getItem("group_id")

  const sendMessage = async () => {
    if (input.trim() !== "" || file) {
      const formData = new FormData();
      formData.append("content", input);
      formData.append("gambar", file);
      formData.append("is_group", 1);

      try {
        const response = await fetch(`${API_DUMMY}/api/chat/class/${class_id}/group/${34}`, {
          method: "POST",
          body: formData,
          headers: authConfig.headers,
        });
        const result = await response.json();
        setMessages([...messages, {
          text: result.content,
          file: result.gambar,
          sender: result.sender_id,
          timestamp: new Date().toISOString(),
        }]);
      } catch (error) {
        console.error("Error sending message:", error);
      }

      setInput("");
      setFile(null);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} , ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="h-96 flex flex-col">
      <div className="bg-gray-200 flex-1 overflow-y-hidden">
        {messages.map((message, index) => (
          <div className="px-4 py-2" key={index}>
            <div className="items-center justify-end">
              <div className="bg-green-500 text-white rounded-lg p-2 shadow mr-2 max-w-sm">
                <p>
                  {message.sender}[{formatDate(message.timestamp)}]
                </p>
                <p>{message.text}</p>
                {message.file && (
                  <img
                    src={message.file}
                    alt="Image"
                    style={{ maxWidth: "200px", maxHeight: "200px" }}
                  />
                )}
              </div>
              <img
                className="w-8 h-8 rounded-full"
                src="https://picsum.photos/50/50"
                alt="User Avatar"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="bg-gray-100 px-4 py-2">
        <div className="flex items-center">
          <input
            className="w-full border rounded-full py-2 px-4 mr-2"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ketik pesan anda..."
          />
          <input type="file" onChange={handleFileChange} />
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full"
            onClick={sendMessage}
          >
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatApp;