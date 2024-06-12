import React, { useState } from "react";

function ChatPribadi() {
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

  const handleFileButtonClick = () => {
    document.getElementById("fileInput").click();
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

  const getFileDisplayName = (file) => {
    if (!file) return "";
    return file.name.length > 10 ? file.name.substr(0, 10) + ".." : file.name;
  };

  return (
    <div className="h-1/2 flex flex-col">
      <div className="bg-green-500 p-3">
        <h2 className="text-white text-lg">Nama Guru</h2>
      </div>
      <div
        style={{ maxHeight: "250px" }}
        className="bg-gray-200 flex-1 overflow-y-auto"
      >
        <div style={{ height: "200px" }}>
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 py-24">
              Tidak ada pesan
            </div>
          ) : (
            messages.map((message, index) => (
              <div className="px-4 py-2" key={index}>
                <div className="items-center justify-end">
                  <div className="bg-green-500 text-white rounded-lg p-2 shadow mr-2 max-w-sm">
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
                    className="w-8 h-8 rounded-full"
                    src="https://picsum.photos/50/50"
                    alt="User Avatar"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="bg-gray-100 px-4 py-2">
        <div className="flex items-center">
        <input
            class="w-full border rounded-full py-2 px-4 mr-2"
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

export default ChatPribadi;
