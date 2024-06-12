import { useState } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
// import ChatApp from "../../views/pages/Chat/ChatApp";
import "../../App.css";
import ChatPribadi from "../../views/pages/Chat/ChatPribadi";

function FaceToFace({ onClose }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [prevWidth, setPrevWidth] = useState(400);
  const [prevHeight, setPrevHeight] = useState(300);

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
    <Draggable handle=".handle" disabled={isFullscreen || isMinimized}>
      <div
        className={`fixed z-50 bg-white p-4 rounded-lg shadow-lg ${
          isFullscreen ? "w-full h-full top-0 left-0" : "top-32 left-52 right-52"
        }`}
      >
        <ResizableBox
          width={isMinimized ? prevWidth : (isFullscreen ? "100%" : undefined)}
          height={isMinimized ? prevHeight : (isFullscreen ? "100%" : undefined)}
          className={`${isMinimized ? "hidden" : ""}`}
          minConstraints={[300, 200]}
          maxConstraints={[
            isFullscreen ? window.innerWidth : 800,
            isFullscreen ? window.innerHeight : 600,
          ]}
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-between mb-4 p-2">
              <h2 className="text-xl font-semibold">Obrolan Tatap Muka</h2>
              <div className="flex gap-2">
                <button
                  onClick={handleFullscreen}
                  className="bg-gray-100 h-fit w-7 rounded-md"
                >
                  <i className={`fa-solid ${isFullscreen ? "fa-compress" : "fa-expand"}`}></i>
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
              <ChatPribadi />
            </div>
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
}

export default FaceToFace;
