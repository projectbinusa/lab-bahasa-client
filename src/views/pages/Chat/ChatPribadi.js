import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../../component/Navbar1";

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
    <>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-3 mx-3">
          <div className="bg-white w-full md:rounded-r-lg md:border-r md:border-green-400 md:w-1/4">
            <button className="bg-green-500 w-full h-10 rounded-t-lg">
              <Link
                to=""
                className="flex items-center justify-center h-full text-white text-lg"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Pilih User
              </Link>
            </button>
            <div className="p-2 md:h-[82vh] h-[15vh] overflow-y-auto custom-scrollbar">
              {messages.map((data, index) => (
                <div
                  key={index}
                  className="bg-green-300 rounded-lg p-2 flex gap-4 cursor-pointer mb-2"
                  onClick={() => setMessages(data)}
                >
                  <div className="border-2 w-fit rounded-full border-green-500">
                    <img className="w-9" src={file} alt="" />
                  </div>
                  <p className="text-center mt-1">{data.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="md:h-[88vh] h-[65vh] w-full md:rounded-l-lg md:border-l md:border-green-400 md:w-3/4 flex flex-col">
            <div className="flex-1 bg-white overflow-y-hidden">
              <div className="border-2 rounded-t-lg border-green-500 bg-green-500 h-10 flex items-center">
                <h1 className="text-white text-lg ml-4 font-semibold">
                  Nama Guru
                </h1>
              </div>
              <div className="overflow-y-scroll h-[90%] p-2 custom-scrollbar">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-500 md:my-52 my-40">
                    Belum Ada Pesan
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <div className="flex w-full md:w-96 items-center">
                      {message.sender_id != localStorage.getItem("user_id") && (
                        <img
                          className="w-8 h-8 rounded-full"
                          src="https://picsum.photos/50/50"
                          alt="User Avatar"
                        />
                      )}
                      <div
                        key={index}
                        className={`${
                          message.sender_id == localStorage.getItem("user_id")
                            ? "bg-blue-500 text-white"
                            : "bg-green-500 text-white"
                        } rounded-lg p-2 w-full md:w-[90%] shadow ml-2`}
                      >
                        <div className="flex justify-between">
                          <p>{message.content}</p>
                          <button className="">
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                          </button>
                        </div>
                        {message.gambar && (
                          <img
                            className="mt-2"
                            src={message.gambar}
                            alt="Image"
                            style={{ maxWidth: "200px", maxHeight: "200px" }}
                          />
                        )}
                        <p>{formatDate(message.created_date)}</p>
                      </div>
                      {message.sender_id == localStorage.getItem("user_id") && (
                        <img
                          className="w-8 h-8 rounded-full"
                          src="https://picsum.photos/50/50"
                          alt="User Avatar"
                        />
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="bg-gray-100 px-4 py-2">
              <form onSubmit={sendMessage} className="flex items-center">
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
              </form>
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
        `}
      </style>
    </>
  );
}

export default ChatPribadi;
