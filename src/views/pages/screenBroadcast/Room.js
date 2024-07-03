import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRoom } from "./RoomProvider";
import io from "socket.io-client";
import BackHandOutlinedIcon from "@mui/icons-material/BackHandOutlined";
import DoNotTouchOutlinedIcon from "@mui/icons-material/DoNotTouchOutlined";

const socket = io("http://localhost:4000");

const Room = () => {
  let username = localStorage.getItem("name");
  const { roomID } = useParams();
  const { fetchedKodeRuang } = useRoom();
  const history = useHistory();
  const [raiseHandStatus, setRaiseHandStatus] = useState({
    [username]: false,
  });
  const [raiseHandToastId, setRaiseHandToastId] = useState(null);
  const [showRaiseHandButton, setShowRaiseHandButton] = useState(false); // State untuk mengontrol visibilitas tombol

  useEffect(() => {
    if (roomID !== fetchedKodeRuang) {
      toast.error("Akses Ditolak: Anda tidak diizinkan untuk mengakses ruangan ini.");
      history.push("/code-room/" + localStorage.getItem("class_id"));
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

        // Setelah join room, munculkan tombol angkat tangan
        setShowRaiseHandButton(true);
      };

      joinRoom();

      socket.on("raiseHand", (data) => {
        setRaiseHandStatus((prevStatus) => ({
          ...prevStatus,
          [data.userId]: true,
        }));

        const newToastId = toast.success("Anda telah mengangkat tangan.", {
          autoClose: false,
          closeButton: false,
        });
        setRaiseHandToastId(newToastId);
      });

      socket.on("lowerHand", (data) => {
        setRaiseHandStatus((prevStatus) => ({
          ...prevStatus,
          [data.userId]: false,
        }));

        if (raiseHandToastId) {
          toast.dismiss(raiseHandToastId);
          setRaiseHandToastId(null);
        }
      });

      return () => {
        socket.off("raiseHand");
        socket.off("lowerHand");
      };
    }
  }, [roomID, fetchedKodeRuang, username, history, raiseHandToastId]);

  const handleToggleHand = () => {
    if (raiseHandStatus[username]) {
      socket.emit("lowerHand", { userId: username });
      setRaiseHandStatus({ [username]: false });

      if (raiseHandToastId) {
        toast.dismiss(raiseHandToastId);
        setRaiseHandToastId(null);
      }
    } else {
      socket.emit("raiseHand", { userId: username });
      setRaiseHandStatus({ [username]: true });
      const newToastId = toast.success("Anda telah mengangkat tangan.", {
        autoClose: false,
        closeButton: false,
      });
      setRaiseHandToastId(newToastId);
    }
  };

  return (
    <>
      <div style={{ width: "100%", height: "100%" }}>
        <div id="zego-meeting" style={{ width: "100%", height: "90%" }}>
          {showRaiseHandButton && ( // Hanya munculkan tombol jika showRaiseHandButton true
            <button
              className="absolute bottom-4 left-96 bg-gray-700 p-2.5 rounded-lg"
              onClick={handleToggleHand}
              style={{ zIndex: 999 }}
            >
              {raiseHandStatus[username] ? (
                <DoNotTouchOutlinedIcon className="text-gray-300" />
              ) : (
                <BackHandOutlinedIcon className="text-gray-300" />
              )}
            </button>
          )}
          <div>
            {Object.entries(raiseHandStatus).map(([userId, isRaised]) => (
              <div key={userId}>
                {userId}: {isRaised ? "Hand Raised" : "Hand Lowered"}
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={false} />
    </>
  );
};

export default Room;
