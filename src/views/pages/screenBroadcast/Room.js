import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import Swal from "sweetalert2";
import { useRoom } from "./RoomProvider";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

const Room = () => {
  let username = localStorage.getItem("name");
  const { roomID } = useParams();
  const { fetchedKodeRuang } = useRoom();
  const history = useHistory();
  const [raiseHandStatus, setRaiseHandStatus] = useState({});

  useEffect(() => {
    if (roomID !== fetchedKodeRuang) {
      Swal.fire({
        icon: "error",
        title: "Akses Ditolak",
        text: "Anda tidak diizinkan untuk mengakses ruangan ini.",
      }).then(() => {
        history.push("/code-room/" + localStorage.getItem("class_id"));
      });
    } else {
      const joinRoom = async () => {
        const appID = 946219318;
        const serverSecret = "8e0b853d79deae0bcbfe949b73ca46a4";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          serverSecret,
          roomID,
          Date.now().toString(),
          `${username}`
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);

        zp.joinRoom({
          scenario: {
            mode: ZegoUIKitPrebuilt.GroupCall,
          },
        });
      };

      joinRoom();

      socket.on("raiseHand", (data) => {
        setRaiseHandStatus((prevStatus) => ({
          ...prevStatus,
          [data.userId]: true,
        }));
      });

      socket.on("lowerHand", (data) => {
        setRaiseHandStatus((prevStatus) => ({
          ...prevStatus,
          [data.userId]: false,
        }));
      });

      return () => {
        socket.off("raiseHand");
        socket.off("lowerHand");
      };
    }
  }, [roomID, fetchedKodeRuang, username, history]);

  const handleRaiseHand = () => {
    socket.emit("raiseHand", { userId: username });
  };

  const handleLowerHand = () => {
    socket.emit("lowerHand", { userId: username });
  };

  return (
    <>
      <button className="relative bg-blue-300 p-3" onClick={handleRaiseHand}>Raise Hand</button>
      <button className="relative bg-blue-300 p-3" onClick={handleLowerHand}>Lower Hand</button>
      <div>
        {Object.entries(raiseHandStatus).map(([userId, isRaised]) => (
          <div key={userId}>
            {userId}: {isRaised ? "Hand Raised" : "Hand Lowered"}
          </div>
        ))}
      </div>
      <div style={{ width: "100vw", height: "100vh" }}>
        <div id="zego-meeting" style={{ width: "100%", height: "90%" }}></div>
      </div>
    </>
  );
};

export default Room;
