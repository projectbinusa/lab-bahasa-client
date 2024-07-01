import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";

const ClientRoomStudent = ({ userNo, socket, setUsers, setUserNo }) => {
  const imgRef = useRef(null);

  useEffect(() => {
    if (socket) {
      socket.on("message", (data) => {
        toast.info(data.message);
      });

      socket.on("users", (data) => {
        setUsers(data);
        setUserNo(data.length);
      });

      socket.on("canvasImage", (data) => {
        imgRef.current.src = data;
      });
    }

    // Cleanup function for useEffect (optional)
    return () => {
      if (socket) {
        socket.off("message");
        socket.off("users");
        socket.off("canvasImage");
      }
    };
  }, [socket, setUsers, setUserNo]); // Memasukkan dependencies yang diperlukan ke dalam array dependencies

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
          <img className="w-100 h-100" ref={imgRef} src="" alt="image" />
        </div>
      </div>
    </div>
  );
};

export default ClientRoomStudent;
