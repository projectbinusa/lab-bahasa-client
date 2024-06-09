import React, { useState } from "react";

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);

  const sendMessage = () => {
    if (input.trim() !== "" || file) {
      const newMessage = {
        text: input,
        file: file,
        sender: "User",
        timestamp: new Date().toISOString(),
      };
      setMessages([...messages, newMessage]);
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
    <div class="h-60 flex flex-col">
      <div class="bg-gray-200 flex-1 overflow-y-hidden">
        {messages.map((message, index) => (
          <div class="px-4 py-2" key={index}>
            <div class="items-center justify-end">
              <div class="bg-green-500 text-white rounded-lg p-2 shadow mr-2 max-w-sm">
                <p>
                  {message.sender}[{formatDate(message.timestamp)}]
                </p>
                <p>{message.text}</p>
                {message.file && message.file.type.startsWith("image/") && (
                  <img
                    src={URL.createObjectURL(message.file)}
                    alt={message.file.name}
                    style={{ maxWidth: "200px", maxHeight: "200px" }}
                  />
                )}
              </div>
              <img
                class="w-8 h-8 rounded-full"
                src="https://picsum.photos/50/50"
                alt="User Avatar"
              />
            </div>
          </div>
        ))}
      </div>
      <div class="bg-gray-100 px-4 py-2">
        <div class="flex items-center">
          <input
            class="w-full border rounded-full py-2 px-4 mr-2"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ketik pesan anda..."
          />
          <input type="file" onChange={handleFileChange} />
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full"
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
