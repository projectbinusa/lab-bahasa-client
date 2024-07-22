// src/components/Whiteboard.js
import React, { useEffect } from "react";
import { VideoSDKMeeting } from "@videosdk.live/rtc-js-prebuilt";
import { useParams } from "react-router-dom";
// import { useRoom } from "../screenBroadcast/RoomProvider";
// import { toast } from "react-toastify";

const authConfig = {
  headers: {
    "auth-event": `jwt ${localStorage.getItem("token")}`,
  },
};

const Camera = () => {
  const role = localStorage.getItem("role");
  let username = localStorage.getItem("name");
  const { cameraId } = useParams();
  // const { fetchedKodeRuang } = useRoom();
  // const navigate = useNavigate();

  useEffect(() => {
    const permissions = {
      drawOnWhiteboard: true,
      toggleWhiteboard: true,
      removeParticipant: true,
    };

    if (role === "instructur") {
      permissions.endMeeting = true;
    }
    if (role === "student") {
      permissions.askToJoin = true;
      permissions.toggleParticipantWebcam = true;
      permissions.toggleParticipantMic = true;
      permissions.toggleParticipantScreenshare = true;
    }

    // if (cameraId !== fetchedKodeRuang) {
    //   toast.error(
    //     "Akses Ditolak: Anda tidak diizinkan untuk mengakses ruangan ini."
    //   );
    //   navigate("/code-room/" + localStorage.getItem("class_id"));
    // } else {
    const config = {
      name: username,
      meetingId: cameraId,
      apiKey: "8a360e5a-accb-412a-a47e-ac56c30debfb",
      containerId: null,
      joinScreen: {
        visible: true,
        title: "Link Room Kamera",
        meetingUrl: `http://localhost:3000/room-camera/${cameraId}`,
      },
      pin: {
        allowed: true,
        layout: "SPOTLIGHT",
      },
      theme: "LIGHT",
      whiteboardEnabled: false,
      permissions: permissions,
      micEnabled: true,
      webcamEnabled: true,
      participantCanToggleSelfWebcam: true,
      participantCanToggleSelfMic: true,
      chatEnabled: false,
      screenShareEnabled: false,
    };

    const meeting = new VideoSDKMeeting();
    meeting.init(config);
    // }
    // console.log("cameraId: ", cameraId, "kodeRuang: ", fetchedKodeRuang);
  }, [role, cameraId, username]);

  return <div id="whiteboard" style={{ height: "500px", width: "100%" }}></div>;
};

export default Camera;

// import React, { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
// import axios from "axios";

// const Camera = () => {
//   const { cameraId } = useParams();
//   const elementRef = useRef(null);
//   const [isInstructor, setIsInstructor] = useState(false);

//   useEffect(() => {
//     const checkUserRole = () => {
//       const role = localStorage.getItem("role");
//       setIsInstructor(role === "instructur");
//     };
//     checkUserRole();

//     // Function to initiate the video call
//     const initiateCall = async (element) => {
//       const appID = 214465873;
//       const serverSecret = "adbbbf6018dbe7d47e893cc35181e1d0";
//       const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//         appID,
//         serverSecret,
//         cameraId,
//         Date.now().toString(),
//         localStorage.getItem("name")
//       );

//       const zc = ZegoUIKitPrebuilt.create(kitToken);

//       zc.joinRoom({
//         container: element,
//         sharedLinks: [
//           {
//             name: "Copy Link",
//             url: `http://localhost:3000/room-camera/${cameraId}`,
//           },
//         ],
//         scenario: {
//           mode: ZegoUIKitPrebuilt.OneONoneCall,
//         },
//         showScreenSharingButton: false,
//         onJoinRoom: (user) => {
//           if (user && user.role === "student") {
//             // Check if user and user.role are defined
//             document.querySelectorAll(".local-video").forEach((video) => {
//               video.srcObject
//                 .getVideoTracks()
//                 .forEach((track) => (track.enabled = true));
//             });
//           }
//         },
//         onUserUpdate: (userList) => {
//           userList.forEach((user) => {
//             if (user && user.role === "student") {
//               // Check if user and user.role are defined
//               axios
//                 .get(`http://localhost:4000/camera-status/${user.userID}`)
//                 .then((response) => {
//                   const status = response.data.status;
//                   if (user.stream) {
//                     user.stream
//                       .getVideoTracks()
//                       .forEach((track) => (track.enabled = status));
//                   }
//                 });
//             }
//           });
//         },
//       });
//     };

//     if (elementRef.current) {
//       initiateCall(elementRef.current);
//     }
//   }, [cameraId]);

//   // Function to toggle the camera status of a student
//   const toggleCamera = async (studentId) => {
//     await axios.post(`http://localhost:4000/toggle-camera/${studentId}`);
//     // Optionally, you can update UI or show a confirmation message
//   };

//   return (
//     <div>
//       <div style={{ width: "100vw", height: "100vh" }} ref={elementRef} />
//       {/* {isInstructor && (
//         <div style={{ position: "absolute", top: 10, right: 10 }}>
//           <button onClick={() => toggleCamera("studentId1")}>
//             Toggle Student Camera
//           </button>
//         </div>
//       )} */}
//     </div>
//   );
// };

// export default Camera;
