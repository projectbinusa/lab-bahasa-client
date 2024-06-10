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
import Navbar from "../../../component/Navbar1";
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
  const [showModal, setShowModal] = useState(false);
  const [modalHeight, setModalHeight] = useState("70vh");
  const [modalWidth, setModalWidth] = useState("100vh");

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
        // newLeft = camera.containerRef.width - 170;
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

  const handleCloseModal = () => {
    if (
      !isCameraActive &&
      !isAudioActive &&
      !isScreenSharing &&
      !isHandRaised
    ) {
      // Hilangkan pesan error sebelum menutup modal
      toast.dismiss();
      setShowModal(false);
    } else {
      toast.error(
        "Mohon nonaktifkan kamera, mikrofon, berbagi layar, atau hentikan mengangkat tangan terlebih dahulu.",
        { autoClose: false }
      );
    }
  };

  return (
    <div className="all">
      <Navbar />
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-40"
      >
        Open Modal
      </button>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
              style={{
                height: modalHeight,
                width: modalWidth,
                maxHeight: "80vh",
              }}
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Video Broadcasting
                    </h3>
                    <div className="mt-2">
                      <div
                        className="camera-container"
                        ref={cameraContainerRef}
                      >
                        <div
                          className="video-containers"
                          onDragOver={handleDragOver}
                          onDrop={handleDrop}
                        >
                          <div className="screen-video-container">
                            <video
                              ref={refScreenVideo}
                              autoPlay
                              playsInline
                            ></video>
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
                            <video
                              ref={refCameraVideo}
                              autoPlay
                              playsInline
                            ></video>
                          </div>
                        </div>
                        <div className="camera-controls">
                          <button
                            onClick={
                              isCameraActive ? stopStreaming : startStreaming
                            }
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
                            {isAudioActive ? (
                              <FaMicrophoneSlash />
                            ) : (
                              <FaMicrophone />
                            )}
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
                                    onClick={() =>
                                      handleDropdownOption("shareLain")
                                    }
                                    className="dropdown-item flex"
                                  >
                                    <FaShareSquare
                                      style={{ marginRight: "10px" }}
                                    />
                                    Presentasi Hal Lain
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDropdownOption("stopShare")
                                    }
                                    className="dropdown-item flex"
                                  >
                                    <FaStopCircle
                                      style={{ marginRight: "10px" }}
                                    />
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
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <div className="w-full sm:w-1/2 mr-2">
                  <label
                    htmlFor="modalHeight"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Height
                  </label>
                  <input
                    id="modalHeight"
                    autoComplete="off"
                    type="text"
                    value={modalHeight}
                    onChange={(e) => setModalHeight(e.target.value)}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="w-full sm:w-1/2 ml-2">
                  <label
                    htmlFor="modalWidth"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Width
                  </label>
                  <input
                    id="modalWidth"
                    autoComplete="off"
                    type="text"
                    value={modalWidth}
                    onChange={(e) => setModalWidth(e.target.value)}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleCloseModal}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
      <style>
        {`
            .camera-container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              position: relative;
            }
  
            .video-containers {
              display: flex;
              justify-content: space-between;
              gap: 5px;
              height: 200px;
              position: relative;
            }
  
            .camera-video-container {
              width: 200px;
              height: 150px;
              background-color: transparent;
              border-radius: 10px;
              overflow: hidden;
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
