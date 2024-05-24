import React, { useRef, useState } from "react";
import {
  FaVideo,
  FaMicrophone,
  FaMicrophoneSlash,
  FaDesktop,
  FaVideoSlash,
} from "react-icons/fa";
import Navbar from "../../../component/Navbar1";
import "./Screen.css";

function ScreenBroadcast() {
  const refCameraVideo = useRef(null);
  const refScreenVideo = useRef(null);
  const cameraContainerRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [audioStream, setAudioStream] = useState(null);
  const [cameraStream, setCameraStream] = useState(null);
  const [screenStream, setScreenStream] = useState(null);
  const [cameraPosition, setCameraPosition] = useState({ top: 0, left: 0 });

  const startStreaming = async () => {
    try {
      const newCameraStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      setCameraStream(newCameraStream);

      if (refCameraVideo.current) {
        refCameraVideo.current.srcObject = newCameraStream;
      }

      setIsCameraActive(true);
    } catch (error) {
      console.error("Error accessing media devices.", error);
    }
  };

  const stopStreaming = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => {
        track.stop();
      });
      setCameraStream(null);
      setIsCameraActive(false);
    }

    if (refCameraVideo.current) {
      refCameraVideo.current.srcObject = null;
    }
  };

  const startAudio = async () => {
    try {
      const newAudioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      setAudioStream(newAudioStream);
      setIsAudioActive(true);
    } catch (error) {
      console.error("Error accessing audio devices.", error);
    }
  };

  const stopAudio = () => {
    if (audioStream) {
      audioStream.getTracks().forEach((track) => {
        track.stop();
      });
      setAudioStream(null);
      setIsAudioActive(false);
    }
  };

  const startScreenSharing = async () => {
    try {
      const newScreenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });

      setScreenStream(newScreenStream);

      if (refScreenVideo.current) {
        refScreenVideo.current.srcObject = newScreenStream;
      }

      setIsScreenSharing(true);

      newScreenStream.getVideoTracks()[0].addEventListener("ended", () => {
        stopScreenSharing();
      });
    } catch (error) {
      console.error("Error accessing display media.", error);
    }
  };

  const stopScreenSharing = () => {
    if (screenStream) {
      screenStream.getTracks().forEach((track) => {
        track.stop();
      });
      setScreenStream(null);
      setIsScreenSharing(false);
    }

    if (refScreenVideo.current) {
      refScreenVideo.current.srcObject = null;
    }
  };

  const handleDragStart = (event) => {
    const style = window.getComputedStyle(event.target, null);
    event.dataTransfer.setData(
      "text/plain",
      `${parseInt(style.getPropertyValue("left"), 10) - event.clientX},${
        parseInt(style.getPropertyValue("top"), 10) - event.clientY
      }`
    );
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    const data = event.dataTransfer.getData("text/plain").split(",");
    const cameraContainerRect = cameraContainerRef.current.getBoundingClientRect();
    let newLeft = event.clientX + parseInt(data[0], 10);
    let newTop = event.clientY + parseInt(data[1], 10);

    // Ensure the new position is within the camera container bounds
    if (newLeft < 0) newLeft = 0;
    if (newTop < 0) newTop = 0;
    if (newLeft + 170 > cameraContainerRect.width)
      newLeft = cameraContainerRect.width - 170;
    if (newTop + 127 > cameraContainerRect.height)
      newTop = cameraContainerRect.height - 127;

    setCameraPosition({ top: newTop, left: newLeft });
    event.preventDefault();
  };

  return (
    <div className="all">
      <Navbar />
      <div className="camerans">
        <div className="camera-container" ref={cameraContainerRef}> 
          <div
            className="video-containers"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="screen-video-container">
              <video ref={refScreenVideo} autoPlay playsInline></video>
            </div>
            <div
              className="camera-video-container"
              draggable
              onDragStart={handleDragStart}
              style={{ top: `${cameraPosition.top}px`, left: `${cameraPosition.left}px` }}
            >
              <video ref={refCameraVideo} autoPlay playsInline></video>
            </div>
          </div>
          <div className="camera-controls">
            {isCameraActive ? (
              <button
                onClick={stopStreaming}
                className="camera-control-button stop-button"
              >
                <FaVideoSlash />
              </button>
            ) : (
              <button
                onClick={startStreaming}
                className="camera-control-button start-button"
              >
                <FaVideo />
              </button>
            )}
            {isAudioActive ? (
              <button
                onClick={stopAudio}
                className="camera-control-button stop-button"
              >
                <FaMicrophoneSlash />
              </button>
            ) : (
              <button
                onClick={startAudio}
                className="camera-control-button start-button"
              >
                <FaMicrophone />
              </button>
            )}
            {isScreenSharing ? (
              <button
                onClick={stopScreenSharing}
                className="camera-control-button stop-button"
              >
                <FaDesktop />
              </button>
            ) : (
              <button
                onClick={startScreenSharing}
                className="camera-control-button screen-share-button"
              >
                <FaDesktop />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScreenBroadcast;
