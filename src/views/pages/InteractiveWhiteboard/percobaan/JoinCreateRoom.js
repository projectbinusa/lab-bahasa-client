import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import Image from "../../../../component/Asset/roomImage.png";

const JoinCreateRoom = ({ uuid, setUser, setRoomJoined }) => {
  const [roomId, setRoomId] = useState(uuid());
  const [name, setName] = useState("");
  const [joinName, setJoinName] = useState("");
  const [joinRoomId, setJoinRoomId] = useState("");
  const userRole = localStorage.getItem("role");

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!name) return toast.dark("Please enter your name!");

    setUser({
      roomId,
      userId: uuid(),
      userName: name,
      host: true,
      presenter: true,
    });
    setRoomJoined(true);
  };
  const handleJoinSubmit = (e) => {
    e.preventDefault();
    if (!joinName) return toast.dark("Please enter your name!");

    setUser({
      roomId: joinRoomId,
      userId: uuid(),
      userName: joinName,
      host: false,
      presenter: false,
    });
    setRoomJoined(true);
  };

  return (
    <>
      {/* <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center my-5">
              Welcome To Realtime Whiteboard Sharing App
            </h1>
          </div>
        </div>
        <div className="row mx-5 mt-5">
          <div className="col-md-5 p-5 border mx-auto">
            <h1 className="text-center text-primary mb-5">Create Room</h1>
            <form onSubmit={handleCreateSubmit}>
              <div className="form-group my-2">
                <input
                  type="text"
                  placeholder="Name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input-group my-2 border align-items-center">
                <input
                  type="text"
                  className="form-control border-0 outline-0"
                  value={roomId}
                  readOnly={true}
                  style={{
                    boxShadow: "none",
                    zIndex: "0 !important",
                    fontsize: "0.89rem !important",
                  }}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-primary  border-0 btn-sm"
                    type="button"
                    onClick={() => setRoomId(uuid())}>
                    Generate
                  </button>
                  &nbsp;&nbsp;
                  <CopyToClipboard
                    text={roomId}
                    onCopy={() =>
                      toast.success("Room Id Copied To Clipboard!")
                    }>
                    <button
                      className="btn btn-outline-dark border-0 btn-sm"
                      type="button">
                      Copy
                    </button>
                  </CopyToClipboard>
                </div>
              </div>
              <div className="form-group mt-5">
                <button type="submit" className="form-control btn btn-dark">
                  Create Room
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-5 p-5 border mx-auto">
            <h1 className="text-center text-primary mb-5">Join Room</h1>
            <form onSubmit={handleJoinSubmit}>
              <div className="form-group my-2">
                <input
                  type="text"
                  placeholder="Name"
                  className="form-control"
                  value={joinName}
                  onChange={(e) => setJoinName(e.target.value)}
                />
              </div>
              <div className="form-group my-2">
                <input
                  type="text"
                  className="form-control outline-0"
                  value={joinRoomId}
                  onChange={(e) => setJoinRoomId(e.target.value)}
                  placeholder="Room Id"
                  style={{
                    boxShadow: "none",
                  }}
                />
              </div>
              <div className="form-group mt-5">
                <button type="submit" className="form-control btn btn-dark">
                  Join Room
                </button>
              </div>
            </form>
          </div>
        </div>
      </div> */}
      <div className="container mx-auto p-8">
      <h1 className="text-3xl text-center mb-4">
        Selamat Datang di Aplikasi Berbagi Whiteboard Realtime
      </h1>
      <div className="bg-gray-200 rounded-lg shadow-lg p-8">
        {userRole === "instructur" && (
          <div>
            <h2 className="text-2xl text-center mb-4">Buat Ruangan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <form onSubmit={handleCreateSubmit} className="grid grid-cols-1 gap-4">
                  <input
                    type="text"
                    placeholder="Nama Anda"
                    className="form-input px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <div className="flex items-center">
                    {/* <CopyToClipboard
                      text={roomId}
                      onCopy={() => toast.success("Room Id Telah Disalin!")}>
                      <button className="text-black rounded-lg mr-1 focus:outline-none">
                        Salin
                      </button>
                    </CopyToClipboard> */}
                    <input
                      type="text"
                      className="form-input w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500"
                      value={roomId}
                      readOnly={true}
                      style={{
                        boxShadow: "none",
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                  <button
                    className="btn btn-outline-primary  border-0 btn-sm"
                    type="button"
                    onClick={() => setRoomId(uuid())}>
                    Generate
                  </button>
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-2 md:w-40 focus:outline-none">
                      Buat Ruangan
                    </button>
                  </div>
                </form>
              </div>
              <div className="flex justify-center">
                <img
                  src={Image}
                  alt="Room"
                  className="w-full hidden md:block md:max-w-xs rounded-lg mb-4 md:mb-0"
                />
              </div>
            </div>
          </div>
        )}

        {userRole === "student" && (
          <div>
            <h2 className="text-2xl text-center mb-4">Gabung Ruangan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <form onSubmit={handleJoinSubmit} className="grid grid-cols-1 gap-4">
                  <input
                    type="text"
                    placeholder="Nama Anda"
                    className="form-input px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-green-500"
                    value={joinName}
                    onChange={(e) => setJoinName(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="form-input px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-green-500"
                    value={joinRoomId}
                    onChange={(e) => setJoinRoomId(e.target.value)}
                    placeholder="ID Ruangan"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mt-4 w-full focus:outline-none">
                    Gabung Ruangan
                  </button>
                </form>
              </div>
              <div className="flex justify-center">
                <img
                  src={Image}
                  alt="Room"
                  className="w-full md:max-w-xs hidden md:block rounded-lg mb-4 md:mb-0"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default JoinCreateRoom;
