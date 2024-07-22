// src/components/Whiteboard.js
import React, { useEffect } from "react";
import { VideoSDKMeeting } from "@videosdk.live/rtc-js-prebuilt";
import { useNavigate, useParams } from "react-router-dom";
import { useRoom } from "../screenBroadcast/RoomProvider";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const authConfig = {
  headers: {
    "auth-event": `jwt ${localStorage.getItem("token")}`,
  },
};

const VideoSdk = () => {
  const role = localStorage.getItem("role");
  let username = localStorage.getItem("name");
  const { roomID } = useParams();
  const { fetchedKodeRuang } = useRoom();
  const navigate = useNavigate();
  const { t } = useTranslation();

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

    if (roomID !== fetchedKodeRuang) {
      toast.error(
        t("Access Denied") + ": " + t("You are not allowed to access this room.")
      );
      navigate("/code-room/" + localStorage.getItem("class_id"));
    } else {
      const config = {
        name: username,
        meetingId: roomID,
        apiKey: "92ecf765-d52a-4d31-b51d-ca362419927b",
        containerId: null,
        language: "id", // Mengatur bahasa ke Indonesia
        joinScreen: {
          visible: true,
          title: t("Bergabung Sekarang"),
          meetingUrlText: t("Meeting ID"),
          meetingIdLabel: t("Meeting ID"),
        },
        pin: {
          allowed: true,
          layout: "SPOTLIGHT",
        },
        theme: "LIGHT",
        whiteboardEnabled: true,
        permissions: permissions,
        micEnabled: true,
        webcamEnabled: true,
        participantCanToggleSelfWebcam: true,
        participantCanToggleSelfMic: true,
        chatEnabled: true,
        screenShareEnabled: true,
      };

      const meeting = new VideoSDKMeeting();
      meeting.init(config);
      console.log("config: ", config);
    }
    console.log("roomId: ", roomID, "kodeRuang: ", fetchedKodeRuang);
  }, [fetchedKodeRuang, role, roomID, navigate, username, t]);

  return <div id="whiteboard" style={{ height: "500px", width: "100%" }}></div>;
};

export default VideoSdk;
