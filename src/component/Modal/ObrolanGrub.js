import { useState } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import ChatApp from "../../views/pages/Chat/ChatApp";

function ObrolanGrup({ onClose }) {

  return (
    <Draggable handle=".handle">
      {/* <div className="bg-opacity-50 h-fit"> */}
      <div className="">
        <ResizableBox className="absolute left-52 right-52 z-50 bg-white p-4 top-32 rounded-lg shadow-lg overflow-hidden">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Obrolan Grup</h2>
            <button
              onClick={onClose}
              className="bg-gray-100 h-fit w-7 rounded-md">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="handle cursor-move p-2 bg-gray-200 rounded-t-lg"></div>
          {/* <div className="h-[40%] overflow-auto"> */}
          <ChatApp />
          {/* </div> */}
        </ResizableBox>
      </div>
      {/* </div> */}
    </Draggable>
  );
}

export default ObrolanGrup;
