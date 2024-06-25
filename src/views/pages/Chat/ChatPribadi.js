import React, { useEffect, useState, useRef } from "react";
import Navbar from "../../../component/Navbar1";
import axios from "axios";
import img from "../../../component/Asset/group.png";
import { API_DUMMY } from "../../../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

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
  const [userColors, setUserColors] = useState({});
  const [users, setUsers] = useState([]);
  const messagesEndRef = useRef(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const classId = localStorage.getItem("class_id");

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/chat/class_id/${classId}`,
        authConfig
      );
      setUsers(response.data.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const fetchMessages = async () => {
    try {
      if (selectedUser && classId) {
        const response = await axios.get(
          `${API_DUMMY}/api/chat/chat/${selectedUser.chat_id}/class/${classId}/receiver/${selectedUser.id}`,
          authConfig
        );
        setMessages(response.data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  const sendMessage = async () => {
    if (input.trim() !== "" || file) {
      const newMessage = {
        text: input,
        file: file,
        sender: "User",
        timestamp: new Date().toISOString(),
      };
      axios
        .post(
          `${API_DUMMY}/api/chat/chat/${selectedUser.chat_id}/class/${classId}/receiver/${selectedUser.id}`,
          newMessage,
          authConfig
        )
        .then(() => {
          setMessages([...messages, newMessage]);
          setInput("");
          setFile(null);
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        });
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")} , ${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(
      date.getSeconds()
    ).padStart(2, "0")}`;
  };

  const getRandomDarkColor = () => {
    const letters = "012345";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 6)];
    }
    return color;
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [selectedUser]);

  useEffect(() => {
    const newColors = {};
    messages.forEach((message) => {
      if (!newColors[message.sender]) {
        newColors[message.sender] = getRandomDarkColor();
      }
    });
    setUserColors(newColors);
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="flex flex-col bg-gray-100 h-screen">
        <Navbar />
        <div className="flex flex-grow flex-col md:flex-row md:justify-center gap-4 mt-3 mx-3">
          <div
            className={`bg-white md:rounded-r-lg md:border-r md:border-green-400 w-full md:w-1/4 ${
              selectedUser ? "hidden md:block" : "block"
            }`}
          >
            <div className="flex">
              {selectedUser && (
                <button
                  className="bg-green-200 h-10 text-red-500 rounded-tl-lg"
                  onClick={() => setSelectedUser(null)}
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="mx-3" />
                </button>
              )}
              <div
                className={`bg-green-500 flex-1 h-10 flex items-center justify-center text-white text-lg ${
                  selectedUser ? "rounded-tr-lg" : "rounded-t-lg"
                }`}
              >
                Pilih Pengguna
              </div>
            </div>

            <div className="flex-grow p-2 overflow-y-auto custom-scrollbar">
              {users.length === 0 ? (
                <div className="text-center md:py-60 text-gray-500 mt-4">
                  Tidak ada pengguna
                </div>
              ) : (
                users.map((user, index) => (
                  <div
                    key={index}
                    className="bg-green-300 rounded-lg p-2 flex gap-4 cursor-pointer mb-2"
                    onClick={() => setSelectedUser(user)}
                  >
                    <div className="border-2 w-fit rounded-full border-green-500">
                      <img className="w-9" src={img} alt="" />
                    </div>
                    <p className="text-center mt-1">{user.name}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div
            className={`flex-grow w-full md:rounded-l-lg md:border-l md:border-green-400 md:w-3/4 flex flex-col ${
              selectedUser ? "" : "hidden md:flex"
            }`}
          >
            <div className="flex-1 bg-white overflow-y-hidden">
              <div className="border-2 rounded-t-lg border-green-500 bg-green-500 h-10 flex items-center">
                <button
                  className="text-white text-lg ml-4 font-semibold md:hidden"
                  onClick={() => setSelectedUser(null)}
                >
                  &lt;Kembali
                </button>
                <h1 className="text-white text-lg ml-4 font-semibold">
                  {selectedUser ? selectedUser.name : "Pilih Chat"}
                </h1>
              </div>

              <div className="flex-grow p-2 overflow-y-auto custom-scrollbar">
                {selectedUser ? (
                  messages.filter(
                    (message) => message.sender === selectedUser.name
                  ).length === 0 ? (
                    <div className="text-center text-gray-500 my-56">
                      Belum Ada Pesan
                    </div>
                  ) : (
                    messages
                      .filter((message) => message.sender === selectedUser.name)
                      .map((message, index) => (
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
                  )
                ) : (
                  <div className="text-center text-gray-500 md:my-64">
                    Silahkan pilih chat
                  </div>
                )}
              </div>
            </div>
            {selectedUser && (
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
            )}
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
            display: ${selectedUser ? "none" : "block"};
          }

          .flex-grow.w-full.md\\:rounded-l-lg.md\\:border-l.md\\:border-green-400.md\\:w-3\\/4.flex.flex-col {
            display: ${selectedUser ? "flex" : "none"};
          }
        }
        `}
      </style>
    </>
  );
}

export default ChatPribadi;
