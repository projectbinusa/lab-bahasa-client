import React, { useEffect, useState } from "react";
import axios from "axios";
import img from "../../../component/Asset/group.png";
import { API_DUMMY } from "../../../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddTopicChat from "../../../component/Modal/TopikObrolan";
import Swal from "sweetalert2";
import Navbar from "../../../component/Navbar1";

const authConfig = {
  headers: {
    "auth-event": `jwt ${localStorage.getItem("token")}`,
    "Content-Type": "multipart/form-data",
  },
};

function TopikChat() {
  const [chatTopic, setChatTopic] = useState([]);
  const [content, setContent] = useState("");
  const [gambar, setGambar] = useState(null);
  const [list, setList] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [editMessageId, setEditMessageId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [initialContent, setInitialContent] = useState("");
  const class_id = localStorage.getItem("class_id");
  const user_id = localStorage.getItem("id");
  const [showTopikChat, setShowTopikChat] = useState(false);

  const setSelectedTopicChat = (data) => {
    if (data && (!selectedTopic || selectedTopic.id !== data.id)) {
      setSelectedTopic(data);
    } else {
      setSelectedTopic(null);
    }
  };

  const handleTopikChat = () => {
    setShowTopikChat(true);
  };

  const handleCloseTopikChat = () => {
    setShowTopikChat(false);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!selectedTopic) {
      console.error("Topic not selected.");
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
    try {
      const response = await axios.post(
        `${API_DUMMY}/api/chat/class/${class_id}/topic_chat/${selectedTopic.id}`,
        formData,
        authConfig
      );
      if (response.status === 200) {
        getAllDatachatTopic(selectedTopic.id);
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
    }
  };

  const formatMessageContent = (content) => {
    const parts = [];
    for (let i = 0; i < content.length; i += 30) {
      parts.push(content.slice(i, i + 30));
    }
    return parts;
  };

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    if (selectedTopic) {
      getAllDatachatTopic(selectedTopic.id);
    }
  }, [selectedTopic]);

  const toggleDropdown = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
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
          `${API_DUMMY}/api/chat/delete/${messageId}/class/${class_id}/topic_chat/${selectedTopic.id}`,
          authConfig
        );
        getAllDatachatTopic(selectedTopic.id);
        Swal.fire("Terhapus!", "Pesan berhasil dihapus.", "success");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      Swal.fire("Gagal!", "Gagal menghapus pesan.", "error");
    }
  };

  const editMessage = (messageId, messageContent) => {
    setEditMode(true);
    setEditMessageId(messageId);
    setContent(messageContent);
    setInitialContent(messageContent);
  };

  const cancelEdit = () => {
    setEditMode(false);
    setEditMessageId(null);
    setContent("");
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
      formData.append("content", content);
    }
    formData.append("receiver_id", user_id);
    formData.append("sender_id", user_id);

    try {
      const response = await axios.put(
        `${API_DUMMY}/api/chat/update/${editMessageId}/class/${class_id}/topic_chat/${selectedTopic.id}`,
        formData,
        authConfig
      );
      if (response.status === 200) {
        getAllDatachatTopic(selectedTopic.id);
        setContent("");
        setGambar(null);
        setEditMessageId(null);
        setEditMode(false);
      }
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col bg-gray-100 h-screen">
        <Navbar />
        <div className="flex flex-grow flex-col md:flex-row md:justify-center gap-4 mt-3 mx-3">
          <div
            className={`bg-white w-full md:rounded-r-lg md:border-r md:border-green-400 md:w-1/4 ${
              selectedTopic ? "hidden md:block" : "block"
            }`}
          >
            <div className="flex">
              <button
                onClick={handleTopikChat}
                className="bg-green-500 flex-1 h-10 flex items-center justify-center text-white text-lg rounded-t-lg"
              >
                Tambah Topik Chat
              </button>
            </div>

            <div className="flex-grow md:p-2 overflow-y-auto custom-scrollbar">
              {list.length === 0 ? (
                <div className="text-center md:py-60 md:bg-transparent bg-gray-100 text-gray-500 md:mt-4">
                  <p className="md:my-0 py-6">Tidak ada topik chat.</p>
                </div>
              ) : (
                list.map((data, index) => (
                  <div
                    key={index}
                    className={`bg-${
                      selectedTopic && selectedTopic.id === data.id
                        ? "green-500"
                        : "green-300"
                    } rounded-lg p-2 flex gap-4 md:mt-0 mt-2 cursor-pointer mb-2`}
                    onClick={() => setSelectedTopicChat(data)}
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
              selectedTopic ? "" : "hidden md:flex"
            }`}
          >
            <div className="flex-1 bg-white overflow-y-hidden">
              <div className="border-2 rounded-t-lg border-green-500 bg-green-500 h-10 flex items-center">
                <button
                  className="text-white text-lg ml-4 font-semibold md:hidden"
                  onClick={() => setSelectedTopicChat(null)}
                >
                  &lt;Kembali
                </button>
                <h1 className="text-white text-lg ml-4 font-semibold">
                  {selectedTopic ? selectedTopic.name : "Pilih topik chat"}
                </h1>
              </div>

              <div className="flex-grow p-2 overflow-y-auto custom-scrollbar">
                {selectedTopic ? (
                  chatTopic.filter(
                    (message) => message.topic_chat_id === selectedTopic.id
                  ).length === 0 ? (
                    <div className="text-center text-gray-500 md:my-56 my-80">
                      Belum Ada Pesan
                    </div>
                  ) : (
                    chatTopic
                      .filter((message) => message.topic_chat_id === selectedTopic.id)
                      .map((message, index) => (
                        <div
                          key={index}
                          className={`px-4 py-2 flex ${
                            message.sender_id == user_id
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div className="flex w-full md:w-96 items-center">
                            {message.sender_id != user_id && (
                              <img
                                className="w-8 h-8 rounded-full"
                                src="https://picsum.photos/50/50"
                                alt="User Avatar"
                              />
                            )}
                            <div
                              key={index}
                              className={`${
                                message.sender_id == user_id
                                  ? "bg-green-500 text-white mr-2"
                                  : "bg-gray-400 text-white"
                              } rounded-lg p-2 w-full md:w-[90%] shadow ml-2 relative`}
                            >
                              <div className="flex justify-between">
                                {message.sender_id == user_id && (
                                  <button
                                    className=""
                                    onClick={() => toggleDropdown(index)}
                                  >
                                    <i className="fa-solid fa-ellipsis-vertical"></i>
                                  </button>
                                )}
                                {dropdownIndex === index && (
                                  <div className="absolute right-0 mt-8 w-24 bg-white text-black border rounded shadow-lg z-10">
                                    <button
                                      className="block px-4 py-2 text-left w-full text-black hover:bg-gray-200"
                                      onClick={() => deleteMessage(message.id)}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                )}
                                <div>
                                  {formatMessageContent(message.content).map(
                                    (part, partIndex) => (
                                      <p key={partIndex}>{part}</p>
                                    )
                                  )}
                                </div>
                                {message.sender_id != user_id && (
                                  <button
                                    className=""
                                    onClick={() => toggleDropdown(index)}
                                  >
                                    <i className="fa-solid fa-ellipsis-vertical"></i>
                                  </button>
                                )}
                                {dropdownIndex === index && (
                                  <div className="absolute right-0 mt-8 w-24 bg-white text-black border rounded shadow-lg z-10">
                                    <button
                                      className="block px-4 py-2 text-left w-full hover:bg-gray-200"
                                      onClick={() =>
                                        editMessage(message.id, message.content)
                                      }
                                    >
                                      Edit
                                    </button>
                                    <button
                                      className="block px-4 py-2 text-left w-full text-black hover:bg-gray-200"
                                      onClick={() => deleteMessage(message.id)}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                )}
                              </div>
                              {message.sender_id == user_id && (
                                <p className="text-xs mt-1 text-right">
                                  {formatDate(message.created_date)}
                                </p>
                              )}
                              {message.sender_id != user_id && (
                                <p className="text-xs mt-1">
                                  {formatDate(message.created_date)}
                                </p>
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
                            </div>
                            {message.sender_id == user_id && (
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
                    Silahkan pilih topik chat
                  </div>
                )}

                {selectedTopic && (
                  <div className="bg-gray-100 px-4 py-2 fixed bottom-0 w-full md:w-3/4">
                    <form
                      onSubmit={editMode ? updateMessage : sendMessage}
                      className="flex items-center"
                    >
                      <input
                        className="w-full border rounded-full py-2 px-4 mr-2"
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Ketik pesan anda... (max 200 karakter)"
                        maxLength="200"
                      />
                      <input type="file" onChange={handleFileChange} />
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full"
                        type="submit"
                      >
                        {editMode ? "Edit" : "Kirim"}
                      </button>
                      {editMode && (
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-full ml-2"
                          type="button"
                          onClick={cancelEdit}
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
            display: ${selectedTopic ? "none" : "block"};
          }
          
          .flex-grow.w-full.md\\:rounded-l-lg.md\\:border-l.md\\:border-green-400.md\\:w-3\\/4.flex.flex-col {
            display: ${selectedTopic ? "flex" : "none"};
          }
        }
        `}
      </style>
      {showTopikChat && <AddTopicChat onClose={handleCloseTopikChat} />}
    </>
  );
}

export default TopikChat;
