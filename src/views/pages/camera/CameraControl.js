import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CameraControl = () => {
  const { studentId } = useParams();

  const toggleCamera = async () => {
    const response = await axios.get(
      `http://localhost:3001/camera-status/${studentId}`
    );
    const currentStatus = response.data.status;
    const newStatus = !currentStatus;
    await axios.post("http://localhost:4000/camera-status", {
      studentId,
      status: newStatus,
    });
    alert(
      `Camera status for student ${studentId} is now ${
        newStatus ? "on" : "off"
      }`
    );
  };

  return (
    <div>
      <button onClick={toggleCamera}>Toggle Camera</button>
    </div>
  );
};

export default CameraControl;
