import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import img from "../../../component/Asset/group.png";
import { API_DUMMY } from "../../../utils/api";
import io from "socket.io-client";
import Navbar from "../../../component/Navbar1";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const socket = io("http://localhost:4000");

const authConfig = {
  headers: {
    "auth-event": `jwt ${localStorage.getItem("token")}`,
    "Content-Type": "multipart/form-data",
  },
};

function ChatApp() {
  const [chatGroup, setChatGroup] = useState([]);
  const [content, setContent] = useState("");
  const [gambar, setGambar] = useState(null);
  const [list, setList] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [editMessageId, setEditMessageId] = useState(null);
  const class_id = localStorage.getItem("class_id");
  const user_id = localStorage.getItem("user_id");
  const [userColors, setUserColors] = useState({});
  const messagesEndRef = useRef(null);
  const [replayMessage, setReplayMessage] = useState(null);

  const setSelectedGrub = (data) => {
    if (data && (!selectedGroup || selectedGroup.id !== data.id)) {
      setSelectedGroup(data);
    } else {
      setSelectedGroup(null);
    }
  };

  const handleReplay = (message) => {
    if (replayMessage && replayMessage.id === message.id) {
      // Jika pesan sudah direplay, kosongkan replayMessage
      setReplayMessage(null);
    } else {
      // Jika belum, set replayMessage dengan data pesan yang dipilih
      setReplayMessage(message);
    }
  };

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      if (message.group_id === selectedGroup?.id) {
        setChatGroup((prevChatGroup) => [...prevChatGroup, message]);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [selectedGroup]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatGroup]);

  const getRandomDarkColor = () => {
    const letters = "012345";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 6)];
    }
    return color;
  };

  useEffect(() => {
    const newColors = {};
    chatGroup.forEach((message) => {
      if (!newColors[message.sender_id]) {
        newColors[message.sender_id] = getRandomDarkColor();
      }
    });
    setUserColors(newColors);
  }, [chatGroup]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!selectedGroup) {
      console.error("Group not selected.");
      return;
    }

    const formData = new FormData();
    formData.append("is_group", 1);
    if (gambar) {
      formData.append("gambar", gambar);
    }
    if (content) {
      formData.append("content", content);
    }
    formData.append("receiver_id", user_id);

    try {
      const response = await axios.post(
        `${API_DUMMY}/api/chat/class/${class_id}/group/${selectedGroup.id}`,
        formData,
        authConfig
      );
      if (response.status === 200) {
        const newMessage = response.data.data;
        socket.emit("sendMessage", newMessage);
        setContent("");
        setGambar(null);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setGambar(selectedFile);
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

  const getAllData = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/class/${class_id}/group`,
        authConfig
      );
      setList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllDataChatGroup = async (group_id) => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/chat/class/${class_id}/group/${group_id}`,
        authConfig
      );
      const reversedMessages = response.data.data.slice().reverse();
      setChatGroup(reversedMessages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    if (selectedGroup) {
      getAllDataChatGroup(selectedGroup.id);
    }
  }, [selectedGroup]);

  const toggleDropdown = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  const editMessage = (messageId, messageContent) => {
    setEditMessageId(messageId);
    // Jika sedang replay, hapus prefix "Re: " dari replayMessage
    if (messageContent.startsWith("Re: ")) {
      setContent(messageContent.substring(4));
    } else {
      setContent(messageContent);
    }
  };

  const updateMessage = async (e) => {
    e.preventDefault();
    if (!editMessageId) {
      console.error("Message ID not selected.");
      return;
    }

    const formData = new FormData();
    formData.append("is_group", 1);
    if (gambar) {
      formData.append("gambar", gambar);
    }
    if (content) {
      // Tambahkan prefix "Re: " jika sedang replay
      formData.append("content", replayMessage ? `Re: ${content}` : content);
    }
    formData.append("receiver_id", user_id);

    try {
      const response = await axios.put(
        `${API_DUMMY}/api/chat/chat/${editMessageId}/class/${class_id}/group/${selectedGroup.id}`,
        formData,
        authConfig
      );
      if (response.status === 200) {
        getAllDataChatGroup(selectedGroup.id);
        setContent("");
        setGambar(null);
        setEditMessageId(null);
        setReplayMessage(null); // Hapus replay setelah pesan terkirim
      }
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      await axios.delete(
        `${API_DUMMY}/api/chat/chat/${messageId}/class/${class_id}/group/${selectedGroup.id}`,
        authConfig
      );
      if (selectedGroup) {
        getAllDataChatGroup(selectedGroup.id);
        setReplayMessage(null); // Hapus replay jika pesan dihapus
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col bg-gray-100 h-screen">
        <Navbar />
        <div className="flex flex-grow flex-col md:flex-row md:justify-center gap-4 mt-3 mx-3">
          <div
            className={`bg-white w-full md:rounded-r-lg md:border-r md:border-green-400 md:w-1/4 ${
              selectedGroup ? "hidden md:block" : "block"
            }`}
          >
            <div className="flex">
              <button className="bg-green-500 flex-1 h-10 flex items-center justify-center text-white text-lg rounded-t-lg">
                <Link
                  to="/add-group"
                  className={`${list.length == 0 ? "block" : "hidden"}`}
                >
                  Tambah Group
                </Link>
              </button>
            </div>

            <div className="flex-grow md:p-2 overflow-y-auto custom-scrollbar">
              {list.length === 0 ? (
                <div className="text-center md:py-60 md:bg-transparent bg-gray-100 text-gray-500 md:mt-4">
                  <p className="md:my-0 py-6">Tidak ada chat Grub.</p>
                </div>
              ) : (
                list.map((data, index) => (
                  <div
                    key={index}
                    className={`bg-${
                      selectedGroup && selectedGroup.id === data.id
                        ? "green-500"
                        : "green-300"
                    } rounded-lg p-2 flex gap-4 md:mt-0 mt-2 cursor-pointer mb-2`}
                    onClick={() => setSelectedGrub(data)}
                  >
                    <div className="border-2 w-fit rounded-full border-green-500">
                      <img className="w-9" src={img} alt="" />
                    </div>
                    <p className="text-center mt-1">{data.name}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div
            className={`flex-grow w-full md:rounded-l-lg md:border-l md:border-green-400 md:w-3/4 flex flex-col ${
              selectedGroup ? "" : "hidden md:flex"
            }`}
          >
            <div className="flex-1 bg-white overflow-y-hidden">
              <div className="border-2 rounded-t-lg border-green-500 bg-green-500 h-10 flex items-center">
                <button
                  className="text-white text-lg ml-4 font-semibold md:hidden"
                  onClick={() => setSelectedGroup(null)}
                >
                  &lt;Kembali
                </button>
                <h1 className="text-white text-lg ml-4 font-semibold">
                  {selectedGroup ? selectedGroup.name : "Pilih group"}
                </h1>
              </div>

              <div className="flex-grow p-2 overflow-y-auto custom-scrollbar">
                {selectedGroup ? (
                  chatGroup.length === 0 ? (
                    <div className="text-center text-gray-500 md:my-56 my-80">
                      Belum Ada Pesan
                    </div>
                  ) : (
                    chatGroup.map((message, index) => (
                      <div
                        key={index}
                        className={`px-4 py-2 ${
                          message.sender_id == localStorage.getItem("id")
                            ? "flex justify-end"
                            : "flex justify-start"
                        }`}
                        style={{
                          backgroundColor:
                            replayMessage?.id === message.id
                              ? "#f0f0f0"
                              : "transparent",
                        }}
                        onClick={() => handleReplay(message)}
                      >
                        <div className="flex w-96 items-center">
                          <img
                            className="w-8 h-8 rounded-full"
                            src="https://picsum.photos/50/50"
                            alt="User Avatar"
                          />
                          <div
                            className={`${
                              message.sender_id == localStorage.getItem("id")
                                ? "bg-green-500"
                                : "bg-green-400"
                            } text-white rounded-lg p-2 w-[90%] shadow ml-2`}
                          >
                            {message.sender_name ==
                            localStorage.getItem("name") ? (
                              <>
                                <div className="flex justify-between">
                                  <p>{message.content}</p>
                                  <button
                                    className=""
                                    onClick={() => toggleDropdown(index)}
                                  >
                                    <i className="fa-solid fa-ellipsis-vertical"></i>
                                  </button>
                                  {dropdownIndex === index && (
                                    <div className="absolute right-0 mt-8 w-24 bg-white text-black border rounded shadow-lg">
                                      <button
                                        className="block px-4 py-2 text-left w-full hover:bg-gray-200"
                                        onClick={() =>
                                          editMessage(
                                            message.id,
                                            message.content
                                          )
                                        }
                                      >
                                        Edit
                                      </button>
                                      <button
                                        className="block px-4 py-2 text-left w-full text-black hover:bg-gray-200"
                                        onClick={() =>
                                          deleteMessage(message.id)
                                        }
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </>
                            ) : (
                              <>
                                <p
                                  className="mb-2 font-semibold"
                                  style={{
                                    color: userColors[message.sender_id],
                                  }}
                                >
                                  {message.sender_name}
                                </p>
                                <p>{message.content}</p>
                              </>
                            )}
                            {message.gambar && (
                              <img
                                className="mt-2"
                                src={message.gambar}
                                alt="Image"
                                style={{
                                  maxWidth: "200px",
                                  maxHeight: "200px",
                                }}
                              />
                            )}
                            <p>{formatDate(message.created_date)}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )
                ) : (
                  <div className="text-center text-gray-500 md:my-64">
                    Silahkan pilih Grub
                  </div>
                )}
              </div>
            </div>

            {selectedGroup && (
              <div className="bg-gray-100 px-4 py-2 fixed bottom-0 w-full md:w-3/4">
                <form
                  onSubmit={editMessageId ? updateMessage : sendMessage}
                  className="flex items-center"
                >
                  <input
                    className="w-full border rounded-full py-2 px-4 mr-2"
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Ketik pesan anda..."
                  />
                  <input type="file" onChange={handleFileChange} />
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full"
                    type="submit"
                  >
                    {editMessageId ? "Edit" : "Kirim"}
                  </button>
                </form>
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
          .bg-white.w-full.md\\:rounded-r-lg.md\\:border-r.md\\:border-green-400.w-full.md\\:w-1\\/4 {
            display: ${selectedGroup ? "none" : "block"};
          }
          
          .flex-grow.w-full.md\\:rounded-l-lg.md\\:border-l.md\\:border-green-400.md\\:w-3\\/4.flex.flex-col {
            display: ${selectedGroup ? "flex" : "none"};
          }
        }
        `}
      </style>
    </>
  );
}

export default ChatApp;
