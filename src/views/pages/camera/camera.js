import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import axios from "axios";

const Camera = () => {
  const { cameraId } = useParams();
  const elementRef = useRef(null);
  const [isInstructor, setIsInstructor] = useState(false);

  useEffect(() => {
    const checkUserRole = () => {
      const role = localStorage.getItem("role");
      setIsInstructor(role === "instructur");
    };
    checkUserRole();

    // Function to initiate the video call
    const initiateCall = async (element) => {
      const appID = 214465873;
      const serverSecret = "adbbbf6018dbe7d47e893cc35181e1d0";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        cameraId,
        Date.now().toString(),
        localStorage.getItem("name")
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
        onJoinRoom: (user) => {
          if (user && user.role === "student") {
            // Check if user and user.role are defined
            document.querySelectorAll(".local-video").forEach((video) => {
              video.srcObject
                .getVideoTracks()
                .forEach((track) => (track.enabled = true));
            });
          }
        },
        onUserUpdate: (userList) => {
          userList.forEach((user) => {
            if (user && user.role === "student") {
              // Check if user and user.role are defined
              axios
                .get(`http://localhost:4000/camera-status/${user.userID}`)
                .then((response) => {
                  const status = response.data.status;
                  if (user.stream) {
                    user.stream
                      .getVideoTracks()
                      .forEach((track) => (track.enabled = status));
                  }
                });
            }
          });
        },
      });
    };

    if (elementRef.current) {
      initiateCall(elementRef.current);
    }
  }, [cameraId]);

  // Function to toggle the camera status of a student
  const toggleCamera = async (studentId) => {
    await axios.post(`http://localhost:4000/toggle-camera/${studentId}`);
    // Optionally, you can update UI or show a confirmation message
  };

  return (
    <div>
      <div style={{ width: "100vw", height: "100vh" }} ref={elementRef} />
      {isInstructor && (
        <div style={{ position: "absolute", top: 10, right: 10 }}>
          <button onClick={() => toggleCamera("studentId1")}>
            Toggle Student Camera
          </button>
          {/* Replace "studentId1" with the actual student ID */}
        </div>
      )}
    </div>
  );
};

export default Camera;
