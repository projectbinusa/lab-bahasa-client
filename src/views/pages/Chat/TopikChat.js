import React, { useEffect, useState } from "react";
import axios from "axios";
import img from "../../../component/Asset/group.png";
import { API_DUMMY } from "../../../utils/api";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import AddTopicChat from "../../../component/Modal/TopikObrolan";

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
  const [selectedTopic, setSelectedTopicChat] = useState(null);
  const class_id = localStorage.getItem("class_id");
  const user_id = localStorage.getItem("id");
  const [showTopikChat, setShowTopikChat] = useState(false);

  const handleTopikChat = () => {
    setShowTopikChat(true);
  };

  const handleCloseTopikChat = () => {
    setShowTopikChat(false);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!selectedTopic) {
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

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-3 mx-3">
          <div
            className={`bg-white w-full md:rounded-r-lg md:border-r md:border-green-400 md:w-1/4 ${
              selectedTopic ? "hidden md:block" : "block"
            }`}
          >
            <div className="flex">
              {selectedTopic && (
                <button
                  className="bg-green-200 h-10 text-red-500 rounded-tl-lg"
                  onClick={() => setSelectedTopicChat(null)}
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="mx-3" />
                </button>
              )}
              <button
                onClick={handleTopikChat}
                className={`bg-green-500 flex-1 h-10 flex items-center justify-center text-white text-lg ${
                  selectedTopic ? "rounded-tr-lg" : "rounded-t-lg"
                }`}
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Tambah Topik Chat
              </button>
            </div>

            <div className="md:h-[90vh] p-2 overflow-y-auto custom-scrollbar">
              {list.length === 0 ? (
                <div className="text-center md:py-64 text-gray-500 mt-4">
                  Belum ada topik chat.
                </div>
              ) : (
                list.map((data, index) => (
                  <div
                    key={index}
                    className="bg-green-300 rounded-lg p-2 flex gap-4 cursor-pointer mb-2"
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
            className={`md:h-[97vh] h-[65vh] w-full md:rounded-l-lg md:border-l md:border-green-400 md:w-3/4 flex flex-col`}
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

              <div className="md:h-[90vh] p-2 overflow-y-auto custom-scrollbar">
              {selectedTopic ? (
                  chatTopic.filter(
                    (message) => message.topic_chat_id === selectedTopic.id
                  ).length === 0 ? (
                    <div className="text-center text-gray-500 md:my-64 my-40">
                      Belum Ada Pesan
                    </div>
                  ) : (
                    chatTopic
                      .filter(
                        (message) => message.topic_chat_id === selectedTopic.id
                      )
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
                              } rounded-lg p-2 w-full md:w-[90%] shadow ml-2`}
                            >
                              <div className="flex justify-between">
                                {message.sender_id == user_id && (
                                  <button className="">
                                    <i className="fa-solid fa-ellipsis-vertical mx-2"></i>
                                  </button>
                                )}
                                <div>
                                  {formatMessageContent(message.content).map(
                                    (part, partIndex) => (
                                      <p key={partIndex}>{part}</p>
                                    )
                                  )}
                                </div>
                                {message.sender_id != user_id && (
                                  <button className="">
                                    <i className="fa-solid fa-ellipsis-vertical mx-2"></i>
                                  </button>
                                )}
                              </div>
                              {message.sender_id == user_id && (
                                <p className="text-right">
                                  {formatDate(message.created_date)}
                                </p>
                              )}
                              {message.sender_id != user_id && (
                                <p>{formatDate(message.created_date)}</p>
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
                  <div className="text-center text-gray-500 md:my-64 my-40">
                    Silahkan pilih topik chat
                  </div>
                )}
              </div>
            </div>
            {selectedTopic && (
              <div className="bg-gray-100 px-4 py-2">
                <form onSubmit={sendMessage} className="flex items-center">
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
                    Kirim
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
          .bg-white.w-full.md\\:rounded-r-lg.md\\:border-r.md\\:border-green-400.md\\:w-1\\/4 {
            display: ${selectedTopic ? "none" : "block"};
          }
          
          .md\\:h-\\[97vh\\].h-\\[65vh\\].w-full.md\\:rounded-l-lg.md\\:border-l.md\\:border-green-400.md\\:w-3\\/4.flex.flex-col {
            display: ${selectedTopic ? "block" : "none"};
          }

          .overflow-y-scroll.overflow-x-hidden.h-\\[90\\%\\].p-2.custom-scrollbar {
            max-height: calc(100vh - 190px); /* Adjust the value based on your layout */
          }
        }
        `}
      </style>
      {showTopikChat && <AddTopicChat onClose={handleCloseTopikChat} />}
    </>
  );
}

export default TopikChat;
