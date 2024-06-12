import React, { useEffect, useState } from "react";
import { API_DUMMY } from "../../../utils/api";
import axios from "axios";
import img from "../../../component/Asset/group.png";

const authConfig = {
  headers: {
    "auth-event": `jwt ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
};

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [chatGroup, setChatGroup] = useState([]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [list, setList] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null); // State untuk menyimpan grup yang dipilih
  const class_id = localStorage.getItem("class_id");
  const [showFullContent, setShowFullContent] = useState(false);


  const sendMessage = async () => {
    if (!selectedGroup) {
      console.error("Group not selected.");
      return;
    }

    if (input.trim() !== "" || file) {
      const formData = new FormData();
      formData.append("content", input);
      if (file) {
        formData.append("gambar", file);
      }
      formData.append("is_group", 1);

      try {
        const response = await fetch(
          `${API_DUMMY}/api/chat/class/${class_id}/group/${selectedGroup.id}`,
          {
            method: "POST",
            body: formData,
            headers: authConfig.headers,
          }
        );
        if (response.ok) {
          const result = await response.json();
          setChatGroup((prevMessages) => [
            ...prevMessages,
            {
              content: result.content,
              gambar: result.gambar,
              sender_id: result.sender_id,
              created_date: new Date().toISOString(),
            },
          ]);
        } else {
          console.error("Error sending message:", response.statusText);
        }
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
      setChatGroup(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllData();
    // getAllDataChatGroup()
  }, []);

  useEffect(() => {
    if (selectedGroup) {
      getAllDataChatGroup(selectedGroup.id);
    }
  }, [selectedGroup]);

  return (
    <>
      <div className="flex justify-center gap-4">
        <div className="bg-white w-96">
          <button className="bg-green-500 w-full h-10">
            <p className="text-center text-white">Add Group</p>
          </button>
          <div className="p-2">
            {list.map((data, index) => (
              <div
                key={index}
                className="bg-green-300 rounded-lg p-2 flex gap-4 cursor-pointer"
                onClick={() => setSelectedGroup(data)} // Set grup yang dipilih ketika grup diklik
              >
                <div className="border-2 w-fit rounded-full border-green-500">
                  <img className="w-9" src={img} alt="" />
                </div>
                <p className="text-center mt-1">{data.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="h-96 w-full flex flex-col">
          <div className="flex-1 bg-white overflow-y-hidden">
            <div className="border-2 border-green-500 bg-green-500 h-10">
              <h1 className="text-white text-lg ml-4 font-semibold">
                {selectedGroup ? selectedGroup.name : "Pilih group"}
              </h1>
            </div>
            <div className="overflow-y-scroll overflow-scroll h-[90%]">
              {chatGroup.map((message, index) => (
                <div
                  className={`px-4 py-2 ${
                    message.sender_id == localStorage.getItem("user_id")
                      ? "flex justify-start"
                      : "flex justify-end"
                  }`}
                  key={index}>
                  <div className="flex w-96 items-center">
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://picsum.photos/50/50"
                      alt="User Avatar"
                    />
                    <div className="bg-green-500 text-white rounded-lg p-2 w-[90%] shadow ml-2">
                      <div className="flex justify-between">
                        <p>{message.content}</p>
                        <button className="">
                          <i class="fa-solid fa-ellipsis-vertical"></i>
                        </button>
                      </div>
                      <p>{formatDate(message.created_date)}</p>
                      {message.gambar && (
                        <img
                          className="mt-2"
                          src={message.gambar}
                          alt="Image"
                          style={{ maxWidth: "200px", maxHeight: "200px" }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
                onClick={sendMessage}>
                Kirim
              </button>
              {/* {!selectedGroup && (
                <p className="text-red-500">
                  Pilih grup sebelum mengirim pesan.
                </p>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatApp;
