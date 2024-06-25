import React, { useState } from "react";
import axios from "axios";
import { API_DUMMY } from "../../../utils/api";

const authConfig = {
  headers: {
    "auth-event": `jwt ${localStorage.getItem("token")}`,
    "Content-Type": "multipart/form-data",
  },
};

function ChatPribadi() {
  const [classId, setClassId] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userColors, setUserColors] = useState({});

  const sendMessage = async () => {
    if (input.trim() !== "" || file) {
      const formData = new FormData();
      formData.append("content", input);
      formData.append("gambar", file);
      formData.append("is_group", false);

      try {
        const response = await axios.post(
          `${API_DUMMY}/api/chat/class-id/${classId}/receiver-id/${receiverId}`,
          formData,
          authConfig
        );

        const newMessage = {
          text: input,
          file: file,
          sender: "User",
          timestamp: new Date().toISOString(),
        };
        setMessages([...messages, newMessage]);
        setInput("");
        setFile(null);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} , ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
  };

  const getRandomDarkColor = () => {
    const letters = "012345";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 6)];
    }
    return color;
  };

  return (
    <>
      <div className="flex flex-col bg-gray-100 h-screen">
        <div className="p-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="classId">
              Class ID
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="classId"
              type="text"
              placeholder="Enter Class ID"
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="receiverId">
              Receiver ID
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="receiverId"
              type="text"
              placeholder="Enter Receiver ID"
              value={receiverId}
              onChange={(e) => setReceiverId(e.target.value)}
            />
          </div>
          <div className="flex items-center mb-4">
            <input
              className="w-full border rounded-full py-2 px-4 mr-2"
              type="text"
              value={input}
              onChange={handleInputChange}
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
        <div className="flex flex-grow flex-col md:flex-row md:justify-center gap-4 mt-3 mx-3">
          <div className="flex-grow w-full md:rounded-l-lg md:border-l md:border-green-400 md:w-3/4 flex flex-col">
            <div className="flex-1 bg-white overflow-y-hidden">
              <div className="border-2 rounded-t-lg border-green-500 bg-green-500 h-10 flex items-center">
                <h1 className="text-white text-lg ml-4 font-semibold">
                  Chat Messages
                </h1>
              </div>

              <div className="flex-grow p-2 overflow-y-auto custom-scrollbar">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-500 my-56">
                    Belum Ada Pesan
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <div
                      key={index}
                      className={`px-4 py-2 flex ${
                        message.sender === "User"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div className="flex w-full md:w-96 items-center">
                        {message.sender !== "User" && (
                          <img
                            className="w-8 h-8 rounded-full"
                            src="https://picsum.photos/50/50"
                            alt="User Avatar"
                          />
                        )}
                        <div
                          key={index}
                          className={`${
                            message.sender === "User"
                              ? "bg-green-500 text-white mr-2"
                              : "bg-gray-my-560 text-white"
                          } rounded-lg p-2 w-full md:w-[90%] shadow ml-2`}
                        >
                          <div className="flex justify-between">
                            <div>
                              <p className="mb-2 font-semibold">
                                {message.sender}
                              </p>
                              <p>{message.text}</p>
                            </div>
                          </div>
                          <p className="text-xs mt-1 text-right">
                            {formatDate(message.timestamp)}
                          </p>
                          {message.file &&
                            message.file.type.startsWith("image/") && (
                              <img
                                className="mt-2"
                                src={URL.createObjectURL(message.file)}
                                alt={message.file.name}
                                style={{
                                  maxWidth: "200px",
                                  maxHeight: "200px",
                                }}
                              />
                            )}
                        </div>
                        {message.sender === "User" && (
                          <img
                            className="w-8 h-8 rounded-full"
                            src="https://picsum.photos/50/50"
                            alt="User Avatar"
                          />
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }

        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #888 #f1f1f1;
        }

        @media (max-width: 768px) {
          .bg-white.md\\:rounded-r-lg.md\\:border-r.md\\:border-green-400.w-full.md\\:w-1\\/4 {
            display: block;
          }

          .flex-grow.w-full.md\\:rounded-l-lg.md\\:border-l.md\\:border-green-400.md\\:w-3\\/4.flex.flex-col {
            display: flex;
          }
        }
        `}
      </style>
    </>
  );
}

export default ChatPribadi;
