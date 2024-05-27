import React, { useState, useRef } from "react";
import Navbar from "../../../component/Navbar1";
import { FaVideo, FaVideoSlash } from "react-icons/fa";

function Camera() {
  const [selectedCards, setSelectedCards] = useState([]);
  const [streams, setStreams] = useState([]);
  const videoRefs = useRef({});

  const handleCardClick = (cardId) => {
    if (!streams.length > 0) {
      setSelectedCards((prevSelectedCards) => {
        if (prevSelectedCards.includes(cardId)) {
          return prevSelectedCards.filter((id) => id !== cardId);
        } else {
          return [...prevSelectedCards, cardId];
        }
      });
    }
  };

  const handleCheckboxChange = (cardId) => {
    setSelectedCards((prevSelectedCards) => {
      if (prevSelectedCards.includes(cardId)) {
        return prevSelectedCards.filter((id) => id !== cardId);
      } else {
        return [...prevSelectedCards, cardId];
      }
    });
  };

  const handleCameraOn = async () => {
    const newStreams = [];

    for (const cardId of selectedCards) {
      try {
        const userMediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        newStreams.push({ cardId, stream: userMediaStream });
        if (videoRefs.current[cardId]) {
          videoRefs.current[cardId].srcObject = userMediaStream;
        }
        console.log(`Menyalakan kamera untuk ${cardId}`);
      } catch (error) {
        console.error(`Error accessing camera for ${cardId}: `, error);
      }
    }

    setStreams(newStreams);
  };

  const handleCameraOff = () => {
    streams.forEach(({ stream }) => {
      stream.getTracks().forEach((track) => track.stop());
    });

    setStreams([]);
    Object.values(videoRefs.current).forEach((video) => {
      if (video) video.srcObject = null;
    });
    console.log("Mematikan kamera");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto py-10">
        <div className="grid grid-cols-1 md:mx-10 mt-12 md:grid-cols-3 gap-8">
          <div
            className={`card border border-gray-300 rounded-md p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer ${
              streams.length > 0 ? "pointer-events-none" : ""
            }`}
            onClick={() => handleCardClick("Card 1")}
          >
            <h3 className="text-lg font-semibold mb-2">Card 1</h3>
            <p className="mb-4">Content for Card 1</p>
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              checked={selectedCards.includes("Card 1")}
              onChange={(e) =>
                e.stopPropagation() || handleCheckboxChange("Card 1")
              }
              disabled={streams.length > 0}
            />
          </div>
          <div
            className={`card border border-gray-300 rounded-md p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer ${
              streams.length > 0 ? "pointer-events-none" : ""
            }`}
            onClick={() => handleCardClick("Card 2")}
          >
            <h3 className="text-lg font-semibold mb-2">Card 2</h3>
            <p className="mb-4">Content for Card 2</p>
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              checked={selectedCards.includes("Card 2")}
              onChange={(e) =>
                e.stopPropagation() || handleCheckboxChange("Card 2")
              }
              disabled={streams.length > 0}
            />
          </div>
          <div
            className={`card border border-gray-300 rounded-md p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer ${
              streams.length > 0 ? "pointer-events-none" : ""
            }`}
            onClick={() => handleCardClick("Card 3")}
          >
            <h3 className="text-lg font-semibold mb-2">Card 3</h3>
            <p className="mb-4">Content for Card 3</p>
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              checked={selectedCards.includes("Card 3")}
              onChange={(e) =>
                e.stopPropagation() || handleCheckboxChange("Card 3")
              }
              disabled={streams.length > 0}
            />
          </div>
        </div>
        <div className="flex justify-center mt-8">
          {!streams.length > 0 && (
            <button
              style={{ fontSize: "20px" }}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded mr-4"
              onClick={handleCameraOn}
              disabled={selectedCards.length === 0}
            >
              <FaVideo />
            </button>
          )}
          {streams.length > 0 && (
            <button
              style={{ fontSize: "20px" }}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded"
              onClick={handleCameraOff}
            >
              <FaVideoSlash />
            </button>
          )}
        </div>
        <div className="video-container mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {selectedCards.map((cardId) => (
            <div key={cardId} className="video-wrapper mb-4">
              <h4 className="text-center mb-2">{cardId}</h4>
              <video
                ref={(el) => (videoRefs.current[cardId] = el)}
                autoPlay
                playsInline
                className="w-full h-auto border border-gray-300 rounded-xl"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Camera;