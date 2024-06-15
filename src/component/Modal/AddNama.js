import React, { useState } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import AddName from "../../views/pages/manageName/AddName";

function AddNama({ onClose }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [prevWidth, setPrevWidth] = useState(400);
  const [prevHeight, setPrevHeight] = useState(300);
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
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <Draggable
        handle=".handle"
        disabled={isFullscreen || isMinimized}
        position={isFullscreen ? { x: 0, y: 0 } : undefined}
        onStop={(e, data) => setPosition({ x: data.x, y: data.y })}
      >
        <div
          className={`relative bg-white p-4 rounded-lg shadow-lg ${
            isFullscreen ? "w-full h-full" : ""
          }`}
          style={isFullscreen ? { width: "100%", height: "100%" } : {}}
        >
          <ResizableBox
            width={isMinimized ? prevWidth : undefined}
            height={isMinimized ? prevHeight : undefined}
            className={`${isMinimized ? "hidden" : ""}`}
            minConstraints={[300, 200]}
            maxConstraints={[
              isFullscreen ? window.innerWidth : 500,
              isFullscreen ? window.innerHeight : 800,
            ]}
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">Tambah Daftar Nama</h2>
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
                <AddName onClose={onClose} />
              </div>
            </div>
          </ResizableBox>
        </div>
      </Draggable>
    </div>
  );
}

export default AddNama;
