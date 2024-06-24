// Room.js
import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import Swal from "sweetalert2";
import { useRoom } from "./RoomProvider";

const Room = () => {
  let username = localStorage.getItem("name");
  const { roomID } = useParams();
  const { fetchedKodeRuang } = useRoom();
  const history = useHistory();

  useEffect(() => {
    if (roomID !== fetchedKodeRuang) {
      Swal.fire({
        icon: "error",
        title: "Akses Ditolak",
        text: "Anda tidak diizinkan untuk mengakses ruangan ini.",
      }).then(() => {
        history.push("/code-room");
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
    }
  }, [roomID, fetchedKodeRuang, username, history]);

  return (
    <div id="zego-meeting" style={{ width: "100vw", height: "100vh" }}></div>
  );
};

export default Room;