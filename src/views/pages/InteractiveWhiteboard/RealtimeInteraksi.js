import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import io from "socket.io-client";
import RoomStudent from "./percobaan/RoomStudent";
import ClientRoomStudent from "./percobaan/ClientRoomStudent";
import JoinCreateRoomStudent from "./percobaan/JoinCreateRoomStudent";
import Navbar from "../../../component/Navbar1";
import "react-toastify/dist/ReactToastify.css";

const server = "http://localhost:4000";
const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};

const socket = io(server, connectionOptions);

function RealtimeInteraksi() {
  const [userNo, setUserNo] = useState(0);
  const [roomJoined, setRoomJoined] = useState(false);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [userRole, setUserRole] = useState("");

  const uuid = () => {
    var S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role);

    if (roomJoined) {
      socket.emit("user-joined", user);
    }
  }, [roomJoined]);
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      <div className="home">
        {/* <ToastContainer /> */}
        {roomJoined ? (
          <>
            {/* <Sidebar users={users} user={user} socket={socket} />
          {user.presenter ? ( */}
            <RoomStudent
              userNo={userNo}
              user={user}
              socket={socket}
              setUsers={setUsers}
              setUserNo={setUserNo}
            />
            {/* ) : ( */}
            <ClientRoomStudent
              userNo={userNo}
              user={user}
              socket={socket}
              setUsers={setUsers}
              setUserNo={setUserNo}
            />
            {/* )} */}
          </>
        ) : (
          <JoinCreateRoomStudent
            uuid={uuid}
            setRoomJoined={setRoomJoined}
            setUser={setUser}
            userRole={userRole}
          />
        )}
      </div>
      {/* <style>
      {`
      .home {
        padding: 20px;
        background-color: #f8f9fa;
        height: screen;
      }
      `}
    </style> */}
    </div>
  );
}

export default RealtimeInteraksi;
