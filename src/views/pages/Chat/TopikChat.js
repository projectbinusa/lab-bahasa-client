import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import img from "../../../component/Asset/topic.png";
import { API_DUMMY } from "../../../utils/api";
import io from "socket.io-client";
import Navbar from "../../../component/Navbar1";
import AddTopikChat from "../../../component/Modal/TopikObrolan";
import Swal from "sweetalert2";

const socket = io("http://localhost:3000");

const authConfig = {
  headers: {
    "auth-event": `jwt ${localStorage.getItem("token")}`,
    "Content-Type": "multipart/form-data",
  },
};

function ChatApp() {
  const [chatTopic, setChatTopic] = useState([]);
  const [content, setContent] = useState("");
  const [gambar, setGambar] = useState(null);
  const [list, setList] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [dropdownIndex1, setDropdownIndex1] = useState(null);
  const [dropdownIndex2, setDropdownIndex2] = useState(null);
  const [editMessageId, setEditMessageId] = useState(null);
  const [showTopic, setShowTopic] = useState(false);
  const class_id = localStorage.getItem("class_id");
  const user_id = localStorage.getItem("user_id");
  const [userColors, setUserColors] = useState({});
  const messagesEndRef = useRef(null);
  const [replayMessage, setReplayMessage] = useState(null);

  const setSelectedTopicChat = (data) => {
    if (data && (!selectedTopic || selectedTopic.id !== data.id)) {
      setSelectedTopic(data);
    } else {
      setSelectedTopic(null);
    }
  };

  // const handleReplay = (message) => {
  //   if (replayMessage && replayMessage.id === message.id) {
  //     // Jika pesan sudah direplay, kosongkan replayMessage
  //     setReplayMessage(null);
  //   } else {
  //     // Jika belum, set replayMessage dengan data pesan yang dipilih
  //     setReplayMessage(message);
  //   }
  // };

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      if (message.group_id === selectedTopic?.id) {
        setChatTopic((prevChatTopic) => [...prevChatTopic, message]);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [selectedTopic]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatTopic]);

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
    chatTopic.forEach((message) => {
      if (!newColors[message.sender_id]) {
        newColors[message.sender_id] = getRandomDarkColor();
      }
    });
    setUserColors(newColors);
  }, [chatTopic]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!selectedTopic) {
      console.error("Topik Chat not selected.");
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
        `${API_DUMMY}/api/chat/class/${class_id}/topic_chat/${selectedTopic.id}`,
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

  const cancelEdit = () => {
    setEditMessageId(null);
    setContent("");
    setGambar(null);
    setReplayMessage(null);
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
        `${API_DUMMY}/api/class/${class_id}/topic_chat`,
        authConfig
      );
      setList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllDatachatTopic = async (topic_chat_id) => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/chat/class/${class_id}/topic_chat/${topic_chat_id}`,
        authConfig
      );
      const reversedMessages = response.data.data.slice().reverse();
      setChatTopic(reversedMessages);
    } catch (error) {
      console.log(error);
      setChatTopic([]);
    }
  };

  useEffect(() => {
    if (selectedTopic) {
      getAllDatachatTopic(selectedTopic.id);
    } else {
      setChatTopic([]);
    }
  }, [selectedTopic]);

  const handleTopic = () => {
    setShowTopic(true);
  };

  const handleCloseTopic = () => {
    setShowTopic(false);
  };

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    if (selectedTopic) {
      getAllDatachatTopic(selectedTopic.id);
    }
  }, [selectedTopic]);

  const toggleDropdown = (index, dropdownType) => {
    if (dropdownType === 1) {
      setDropdownIndex1(dropdownIndex1 === index ? null : index);
    } else if (dropdownType === 2) {
      setDropdownIndex2(dropdownIndex2 === index ? null : index);
    }
  };

  const editMessage = (messageId, messageContent) => {
    setEditMessageId(messageId);
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
      formData.append("content", replayMessage ? `Re: ${content}` : content);
    }
    formData.append("receiver_id", user_id);

    try {
      const response = await axios.put(
        `${API_DUMMY}/api/chat/chat/${editMessageId}/class/${class_id}/topic_chat/${selectedTopic.id}`,
        formData,
        authConfig
      );

      if (response.status === 200) {
        getAllDatachatTopic(selectedTopic.id);
        setContent("");
        setGambar(null);
        setEditMessageId(null);
        setReplayMessage(null);
      }
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };
  const deleteMessage = async (messageId) => {
    try {
      const confirmDelete = await Swal.fire({
        title: "Anda yakin?",
        text: "Pesan akan dihapus secara permanen!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      });

      if (confirmDelete.isConfirmed) {
        await axios.delete(
          `${API_DUMMY}/api/chat/chat/${messageId}/class/${class_id}/topic_chat/${selectedTopic.id}`,
          authConfig
        );

        if (selectedTopic) {
          getAllDatachatTopic(selectedTopic.id);
          setReplayMessage(null);
        }

        Swal.fire("Terhapus!", "Pesan berhasil dihapus.", "success");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      Swal.fire("Gagal!", "Gagal menghapus pesan.", "error");
    }
  };

  const handleDeleteTopic = async (topic_chat_id) => {
    const confirmDelete = await Swal.fire({
      title: "Apakah kamu yakin?",
      text: "Tindakan ini akan menghapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus topic chat!",
      cancelButtonText: "Batalkan",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await axios.delete(
          `${API_DUMMY}/api/topic_chat/${topic_chat_id}/class/${class_id}`,
          authConfig
        );

        if (response.status === 200) {
          getAllData();
          setSelectedTopic(null);
          Swal.fire("Terhapus!", "Topik Chat berhasil di hapus.", "success");
        }
      } catch (error) {
        console.error("Error deleting topic_chat:", error);
        Swal.fire("Gagal!", "Gagal menghapus topic chat.", "error");
      }
    }
  };

  useEffect(() => {
    setContent("");
    setGambar(null);
    setEditMessageId(null);
    setReplayMessage(null);
  }, [selectedTopic]);
  
  return (
    <>
      <div className="flex flex-col bg-gray-100 min-h-screen">
        <Navbar />
        <div className="flex flex-grow flex-col md:flex-row md:justify-center gap-4 mt-3 mx-3">
          <div
            className={`bg-white w-full md:rounded-r-lg md:border-r md:border-green-400 md:w-1/4 ${
              selectedTopic ? "hidden md:block" : "block"
            }`}
          >
            <div className="flex">
              <button
                onClick={handleTopic}
                className="bg-green-500 flex-1 h-10 flex items-center justify-center text-white text-lg rounded-t-lg"
              >
                Tambah Topik Chat
              </button>
            </div>
            <div className="flex-grow md:p-2 custom-scrollbar h-[90%]">
              {list.length === 0 ? (
                <div className="text-center md:py-60 md:bg-transparent bg-gray-100 text-gray-500 md:mt-4">
                  <p className="md:my-0 py-6">Tidak ada topik yang dibahas.</p>
                </div>
              ) : (
                list.map((topic, index) => (
                  <div
                    key={topic.id}
                    onClick={() => setSelectedTopicChat(topic)}
                    className={`rounded-lg p-2 flex gap-4 md:mt-0 mt-2 cursor-pointer mb-2 ${
                      selectedTopic?.id === topic.id
                        ? "bg-green-500 text-white"
                        : "bg-green-300 text-gray-800"
                    }`}
                  >
                    <div className="flex items-center flex-grow">
                      <div className="border-2 w-fit rounded-full border-green-500 ml-auto">
                        <img className="w-9" src={img} alt="" />
                      </div>
                      <div className="text-center flex-grow">
                        <div className="text-center mt-1">{topic.name}</div>
                      </div>
                    </div>

                    <div className="relative ml-auto">
                      <button
                        className="text-gray-600 focus:outline-none"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDropdown(index, 1);
                        }}
                      >
                        &#x2022;&#x2022;&#x2022;
                      </button>
                      {dropdownIndex1 === index && (
                        <div className="absolute right-0 top-5 w-48 bg-white border rounded shadow-lg z-10">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteTopic(topic.id);
                            }}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            Hapus Topic Chat
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div
            className={`flex-grow w-full md:rounded-l-lg md:border-l md:border-green-400 md:w-3/4 flex flex-col ${
              selectedTopic ? "" : "hidden md:flex"
            }`}
          >
            <div className="flex-1 bg-white overflow-y-hidden h-96">
              <div className="border-2 rounded-t-lg border-green-500 bg-green-500 h-10 flex items-center">
                <button
                  className="text-white text-lg ml-4 font-semibold md:hidden"
                  onClick={() => setSelectedTopic(null)}
                >
                  &lt;Kembali
                </button>
                <h1 className="text-white text-lg ml-4 font-semibold">
                  {selectedTopic ? selectedTopic.name : "Pilih Topik Chat"}
                </h1>
              </div>

              <div className="flex-grow px-2 overflow-y-auto custom-scrollbar h-[84%]">
                {selectedTopic ? (
                  chatTopic.length === 0 ? (
                    <div className="flex items-center justify-center">
                      <div className="text-center text-gray-500 md:my-60 z-1 bg-white px-2">
                        Belum ada pesan
                      </div>
                    </div>
                  ) : (
                    chatTopic.map((message, index) => (
                      <>
                        <div
                          key={index}
                          className={`px-4 ${
                            message.sender_id == localStorage.getItem("id")
                              ? "flex justify-end"
                              : "flex justify-start"
                          }`}
                        >
                          <div className="flex w-80 items-center">
                            <img
                              className="w-8 h-8 rounded-full"
                              src="https://picsum.photos/50/50"
                              alt="User Avatar"
                            />
                            <div
                              className={`relative ${
                                message.sender_id == localStorage.getItem("id")
                                  ? "bg-green-500 text-white"
                                  : "bg-green-400"
                              } text-white rounded-lg my-2 p-2 w-[90%] shadow ml-2`}
                            >
                              {message.sender_id ==
                              localStorage.getItem("id") ? (
                                <>
                                  <div className="flex justify-between">
                                    <p>{message.content}</p>
                                    <div className="relative">
                                      <button
                                        className=""
                                        onClick={() => toggleDropdown(index, 2)}
                                      >
                                        <i className="fa-solid fa-ellipsis-vertical"></i>
                                      </button>
                                      {dropdownIndex2 === index && (
                                        <div className="absolute right-0 w-24 bg-white text-black border rounded shadow-lg">
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
                      </>
                    ))
                  )
                ) : (
                  <div className="flex items-center justify-center">
                    <div className="text-center text-gray-500 md:my-60 z-1 bg-white px-2">
                      Silahkan pilih Topik Chat
                    </div>
                  </div>
                )}
              </div>
            </div>

            {selectedTopic && (
              <div className="bg-gray-100 px-4 py-2 fixed bottom-0 w-full md:w-3/4">
                <form
                  onSubmit={editMessageId ? updateMessage : sendMessage}
                  className="flex items-center space-x-4"
                >
                  <input
                    type="file"
                    onChange={handleFileChange}
                    id="file-upload"
                  />
                  <input
                    type="text"
                    placeholder="Ketik pesan anda... (max 200 karakter)"
                    maxLength="200"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  />
                  <button
                    type="submit"
                    style={{
                      marginRight: "1rem",
                      backgroundColor: "#10B981",
                      color: "white",
                      fontWeight: "bold",
                      padding: "0.5rem 1rem",
                      borderRadius: "0.5rem",
                      cursor: "pointer",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#059669")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#10B981")
                    }
                  >
                    {editMessageId ? "Edit" : "Kirim"}
                  </button>
                  {editMessageId && (
                    <button
                      type="button"
                      onClick={cancelEdit}
                      style={{
                        marginRight: "1rem",
                        backgroundColor: "#EF4444",
                        color: "white",
                        fontWeight: "bold",
                        padding: "0.5rem 1rem",
                        borderRadius: "0.5rem",
                        cursor: "pointer",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = "#DC2626")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = "#EF4444")
                      }
                    >
                      Batalkan
                    </button>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>
        {`
      .custom-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: #888 #f1f1f1;
        overflow-y: auto; /* Ensure vertical scrolling */
      }

      /* Adjust scrollbar styles */
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

        @media (max-width: 768px) {
          .bg-white.w-full.md\\:rounded-r-lg.md\\:border-r.md\\:border-green-400.w-full.md\\:w-1\\/4 {
            display: ${selectedTopic ? "none" : "block"};
          }

          .flex-grow.w-full.md\\:rounded-l-lg.md\\:border-l.md\\:border-green-400.md\\:w-3\\/4.flex.flex-col {
            display: ${selectedTopic ? "flex" : "none"};
          }
        }
        `}
      </style>
      {showTopic && <AddTopikChat onClose={handleCloseTopic} />}
    </>
  );
}

export default ChatApp;
