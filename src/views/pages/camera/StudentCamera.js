import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const StudentCamera = () => {
  const { cameraId } = useParams();
  const elementRef = useRef(null);
  const localVideoRef = useRef(null);

  useEffect(() => {
    const myCall = async (element) => {
      const appID = 214465873;
      const serverSecret = "adbbbf6018dbe7d47e893cc35181e1d0";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        cameraId,
        Date.now().toString(),
        `${localStorage.getItem("name")}`
      );
      const zc = ZegoUIKitPrebuilt.create(kitToken);

      zc.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: "Copy Link",
            url: `http://localhost:3000/room-camera/${cameraId}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showScreenSharingButton: false,
        onBroadcastMessageReceived: (messageList) => {
          messageList.forEach((message) => {
            const { action, target } = JSON.parse(message.message);
            if (
              action === "OPEN_CAMERA" &&
              target === `${localStorage.getItem("name")}`
            ) {
              zc.enableCamera(true);
            }
          });
        },
      });
    };

    if (elementRef.current) {
      myCall(elementRef.current);
    }
  }, [cameraId]);

  return (
    <div>
      <div style={{ width: "100vw", height: "100vh" }} ref={elementRef} />
      <video ref={localVideoRef} autoPlay style={{ display: "none" }} />
    </div>
  );
};

export default StudentCamera;
