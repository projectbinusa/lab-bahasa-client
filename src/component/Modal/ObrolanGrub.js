import { useState } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import ScreenBroadcast1 from "../../views/pages/screenBroadcast/ScreenBroadcast";
import "../../App.css";
import ChatApp from "../../views/pages/Chat/ChatApp";

function ObrolanGrub({ onClose }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [prevWidth, setPrevWidth] = useState(400);
  const [prevHeight, setPrevHeight] = useState(300);
  const [position, setPosition] = useState({ x: 0, y: 0 });


  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (isMinimized) {
      setIsMinimized(false);
      setPrevWidth(window.innerWidth / 4);
      setPrevHeight(window.innerHeight / 4);
    }
  };

  return (
    <Draggable
      handle=".handle"
      disabled={isFullscreen || isMinimized}
      position={isFullscreen ? { x: 0, y: 0 } : position}
      onStop={(e, data) => setPosition({ x: data.x, y: data.y })}
    >
      <div
        className={`fixed z-50 bg-white p-4 rounded-lg shadow-lg ${
          isFullscreen ? "w-full h-full top-0 left-0" : "top-32 left-52"
        }`}
        style={isFullscreen ? { width: "100%", height: "100%" } : {}}
      >
        <ResizableBox
          width={isMinimized ? prevWidth : isFullscreen ? "20%" : undefined}
          height={isMinimized ? prevHeight : isFullscreen ? "40%" : undefined}
          className={`${isMinimized ? "hidden" : ""}`}
          minConstraints={[300, 200]}
          maxConstraints={[
            isFullscreen ? window.innerWidth : 500,
            isFullscreen ? window.innerHeight : 800,
          ]}
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-between mb-4 p-2">
              <h2 className="text-xl font-semibold">Obrolan Grup (Group 1)</h2>
              <div className="flex gap-2">
                <button
                  onClick={handleFullscreen}
                  className="bg-gray-100 h-fit w-7 rounded-md"
                >
                  <i
                    className={`fa-solid ${
                      isFullscreen ? "fa-compress" : "fa-expand"
                    }`}
                  ></i>
                </button>
                <button
                  onClick={onClose}
                  className="bg-gray-100 h-fit w-7 rounded-md"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>
            <div className="handle w-full cursor-move flex-grow overflow-auto">
              <ChatApp />
            </div>
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
}

export default ObrolanGrub;
