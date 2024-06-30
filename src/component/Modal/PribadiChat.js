import { useState } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "../../App.css";
import AddUser from "../../views/pages/Chat/AddUser";

function PribadiChat({ onClose }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [prevWidth, setPrevWidth] = useState(800); // Increased width
  const [prevHeight, setPrevHeight] = useState(400); // Increased height
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (!isMinimized) {
      setPrevWidth(window.innerWidth / 4);
      setPrevHeight(window.innerHeight / 4);
    }
  };

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
          width={isMinimized ? prevWidth : isFullscreen ? "100%" : 600}
          height={isMinimized ? prevHeight : isFullscreen ? "100%" : 300} 
          className={`${isMinimized ? "hidden" : ""}`}
          minConstraints={[600, 400]} 
          maxConstraints={[
            isFullscreen ? window.innerWidth : 1200, 
            isFullscreen ? window.innerHeight : 1000, 
          ]}
        >
          <div className="flex flex-col h-full w-full">
            <div className="flex justify-between p-2">
              <h2 className="text-xl font-semibold">Tambah User Chat</h2>
              <div className="flex gap-2">
                <button
                  onClick={handleFullscreen}
                  className="bg-white h-fit w-7 rounded-md"
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
              <AddUser />
            </div>
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
}

export default PribadiChat;
