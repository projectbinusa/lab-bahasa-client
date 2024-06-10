import React from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import ResponseCompetition from "../../views/pages/response/ResponseCompetition";

function Kompetisi({ onClose }) {
  return (
    <Draggable handle=".handle">
      <ResizableBox className="absolute left-72 right-72 z-50 p-4 top-16 rounded-lg shadow-lg overflow-hidden bg-white">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">Kompetisi Respon</h2>
          <button
            onClick={onClose}
            className="bg-gray-100 h-fit w-6 rounded-md"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="handle bg-gray-200 rounded-t-lg cursor-move">
          <ResponseCompetition />
        </div>
      </ResizableBox>
    </Draggable>
  );
}

export default Kompetisi;
