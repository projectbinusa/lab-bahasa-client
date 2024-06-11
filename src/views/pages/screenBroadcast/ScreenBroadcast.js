import React, { useRef, useState, useEffect } from "react";
import {
  FaVideo,
  FaMicrophone,
  FaMicrophoneSlash,
  FaDesktop,
  FaVideoSlash,
  FaHandPaper,
  FaHandPointer,
  FaShareSquare,
  FaStopCircle,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPaper as farHandPaper } from "@fortawesome/free-regular-svg-icons";

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
  const [presentationStream, setPresentationStream] = useState(null);
  const [cameraPosition, setCameraPosition] = useState({ top: 0, left: 0 });
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isCameraActive || isAudioActive || isScreenSharing || isHandRaised) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isCameraActive, isAudioActive, isScreenSharing, isHandRaised]);

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

      const combinedStream = new MediaStream([
        ...newScreenStream.getTracks(),
        ...cameraStream.getTracks(),
      ]);

      setPresentationStream(combinedStream);
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

    if (presentationStream) {
      presentationStream.getTracks().forEach((track) => {
        track.stop();
      });
      setPresentationStream(null);
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
    const cameraContainerRect =
      cameraContainerRef.current.getBoundingClientRect();
    let newLeft = event.clientX + parseInt(data[0], 10);
    let newTop = event.clientY + parseInt(data[1], 10);

    if (newLeft < 0) newLeft = 0;
    if (newTop < 0) newTop = 0;
    if (newLeft + 170 > cameraContainerRect.width)
      if (newTop + 127 > cameraContainerRect.height)
        newTop = cameraContainerRef.height - 127;

    setCameraPosition({ top: newTop, left: newLeft });
    event.preventDefault();
  };

  const toggleHandRaise = () => {
    if (isHandRaised) {
      toast.dismiss();
    } else {
      toast("Mengangkat Tangan", {
        type: "success",
        autoClose: false,
        closeButton: false,
        icon: (
          <FontAwesomeIcon
            icon={farHandPaper}
            style={{ width: "25px", height: "30px" }}
          />
        ),
      });
    }
    setIsHandRaised(!isHandRaised);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDropdownOption = async (option) => {
    setShowDropdown(false);
    if (option === "shareLain") {
      await shareAnotherPage();
    } else if (option === "stopShare") {
      stopScreenSharing();
    }
  };

  const shareAnotherPage = async () => {
    stopScreenSharing();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    startScreenSharing();
  };

  return (
    <div>
      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
        <div className="mt-2">
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
                style={{
                  top: `${cameraPosition.top}px`,
                  left: `${cameraPosition.left}px`,
                }}
              >
                <video ref={refCameraVideo} autoPlay playsInline></video>
              </div>
            </div>
            <div className="camera-controls">
              <button
                onClick={isCameraActive ? stopStreaming : startStreaming}
                className={`camera-control-button ${
                  isCameraActive ? "stop-button" : "start-button"
                }`}
              >
                {isCameraActive ? <FaVideoSlash /> : <FaVideo />}
              </button>
              <button
                onClick={isAudioActive ? stopAudio : startAudio}
                className={`camera-control-button ${
                  isAudioActive ? "stop-button" : "start-button"
                }`}
              >
                {isAudioActive ? <FaMicrophoneSlash /> : <FaMicrophone />}
              </button>
              {isScreenSharing ? (
                <div className="dropdown">
                  <button
                    onClick={toggleDropdown}
                    className="camera-control-button screen-share-button"
                  >
                    <FaDesktop />
                  </button>
                  {showDropdown && (
                    <div className="dropdown-menu dropdown-menu-up">
                      <button
                        onClick={() => handleDropdownOption("shareLain")}
                        className="dropdown-item flex"
                      >
                        <FaShareSquare style={{ marginRight: "10px" }} />
                        Presentasi Hal Lain
                      </button>
                      <button
                        onClick={() => handleDropdownOption("stopShare")}
                        className="dropdown-item flex"
                      >
                        <FaStopCircle style={{ marginRight: "10px" }} />
                        Berhenti Presentasi
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={startScreenSharing}
                  className="camera-control-button screen-share-button"
                >
                  <FaDesktop />
                </button>
              )}
              <button
                onClick={toggleHandRaise}
                className={`camera-control-button ${
                  isHandRaised ? "stop-button" : "start-button"
                }`}
              >
                {isHandRaised ? <FaHandPointer /> : <FaHandPaper />}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <style>
        {`
            .camera-container {
              width: auto;
              height: 30%;
              margin: 0 auto;
              position: relative;
            }

            .video-containers {
              display: flex;
              justify-content: space-between;
              gap: 5px;
              height: 400px;
              position: relative;
            }

            .camera-video-container {
              width: auto;
              height: 100px;
              background-color: transparent;
              border-bottom-radius: 10px;
              overflow: hidden;
              top: 20px;
              position: absolute;
              cursor: move;
            }

            .screen-video-container {
              flex: 1;
              background-color: black;
              border-radius: 10px;
              overflow: hidden;
            }

            video {
              width: 100%;
              height: 100%;
            }

            .camera-controls {
              display: flex;
              justify-content: center;
              gap: 10px;
              margin-top: 20px;
            }

            .camera-control-button {
              padding: 10px 15px;
              border-radius: 5px;
              border: none;
              display: flex;
              align-items: center;
              gap: 5px;
              cursor: pointer;
              font-size: 16px;
              color: white;
            }

            .start-button {
              background-color: green;
            }

            .stop-button {
              background-color: red;
            }

            .screen-share-button {
              background-color: blue;
            }

            .dropdown {
              position: relative;
              display: inline-block;
            }

            .dropdown-menu {
              display: flex;
              position: absolute;
              background-color: white;
              min-width: 150px;
              box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
              z-index: 1;
              flex-direction: column;
              align-items: center;
            }

            .dropdown-menu-up {
              bottom: 100%;
            }

            .dropdown-item {
              color: black
              ;
              padding: 12px 16px;
              text-decoration: none;
              display: block;
              cursor: pointer;
              text-align: left;
            }

            .dropdown-item:hover {
              background-color: #f1f1f1;
            }
          `}
      </style>
    </div>
  );
}

export default ScreenBroadcast;
