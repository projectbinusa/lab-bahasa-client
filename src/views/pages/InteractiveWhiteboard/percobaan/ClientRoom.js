import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";

const ClientRoom = ({ userNo, socket, setUsers, setUserNo }) => {
  const imageUrl = useRef(null);

  useEffect(() => {
    if (!socket) return; // Exit early if socket is not defined

    const handleMessage = (data) => {
      toast.info(data.message);
    };
    socket.on("message", handleMessage);

    // Cleanup function to remove the event listener
    return () => {
      socket.off("message", handleMessage);
    };
  }, [socket]);

  useEffect(() => {
    if (!socket || !setUsers || !setUserNo) return; // Exit early if dependencies are not defined

    const handleUsers = (data) => {
      setUsers(data);
      setUserNo(data.length);
    };
    socket.on("users", handleUsers);

    // Cleanup function to remove the event listener
    return () => {
      socket.off("users", handleUsers);
    };
  }, [socket, setUsers, setUserNo]);

  useEffect(() => {
    if (!socket || !imageUrl.current) return; // Exit early if dependencies are not defined

    const handleCanvasImage = (data) => {
      imageUrl.current.src = data;
    };
    socket.on("canvasImage", handleCanvasImage);

    // Cleanup function to remove the event listener
    return () => {
      socket.off("canvasImage", handleCanvasImage);
    };
  }, [socket, imageUrl]);

  return (
    <div className="container-fluid">
      <div className="row pb-2">
        <h1 className="display-5 pt-4 pb-3 text-center">
          React Drawing App - users online: {userNo}
        </h1>
      </div>
      <div className="row mt-5">
        <div
          className="col-md-8 overflow-hidden border border-dark px-0 mx-auto mt-3"
          style={{ height: "500px" }}
        >
          <img className="w-100 h-100" ref={imageUrl} src="" alt="image" />
        </div>
      </div>
    </div>
  );
};

export default ClientRoom;
