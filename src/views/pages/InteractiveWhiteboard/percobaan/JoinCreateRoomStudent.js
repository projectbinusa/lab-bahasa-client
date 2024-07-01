import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import Image from "../../../../component/Asset/roomImage.png";

function JoinCreateRoomStudent({ uuid, setUser, setRoomJoined, userRole }) {
  const [roomId, setRoomId] = useState(uuid());
  const [name, setName] = useState("");
  const [joinName, setJoinName] = useState("");
  const [joinRoomId, setJoinRoomId] = useState("");
  const history = useHistory();

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      toast.dark("Silakan masukkan nama Anda!");
      return;
    }

    const user = {
      roomId,
      userId: uuid(),
      userName: name,
      host: true,
      presenter: true,
      role: userRole,
    };

    setUser(user);
    setRoomJoined(true);

    if (userRole === "instructur") {
      history.push("/interaction-instruktur");
    } else {
      toast.dark("Role instruktur tidak valid!");
    }
  };

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    if (!joinName) {
      toast.dark("Silakan masukkan nama Anda!");
      return;
    }

    const user = {
      roomId: joinRoomId,
      userId: uuid(),
      userName: joinName,
      host: false,
      presenter: false,
      role: userRole,
    };

    setUser(user);
    setRoomJoined(true);

    if (userRole === "student") {
      history.push("/interaksi-student");
    } else {
      toast.dark("Role student tidak valid!");
    }
  };

  const generateRoomId = () => {
    const newRoomId = uuid();
    setRoomId(newRoomId);
  };
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl text-center mb-4">
        Selamat Datang di Aplikasi Berbagi Interaksi Siswa Realtime
      </h1>
      <div className="bg-gray-200 rounded-lg shadow-lg p-8">
        {userRole === "instructur" && (
          <div>
            <h2 className="text-2xl text-center mb-4">Buat Ruangan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <form
                  onSubmit={handleCreateSubmit}
                  className="grid grid-cols-1 gap-4"
                >
                  <input
                    type="text"
                    placeholder="Nama Anda"
                    className="form-input px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <div className="flex items-center">
                    <CopyToClipboard
                      text={roomId}
                      onCopy={() => toast.success("Room Id Telah Disalin!")}
                    >
                      <button className="text-black rounded-lg mr-1 focus:outline-none">
                        Salin
                      </button>
                    </CopyToClipboard>
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
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-2 md:w-28 focus:outline-none"
                      type="button"
                      onClick={generateRoomId}
                    >
                      Generate
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-2 md:w-40 focus:outline-none"
                    >
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
                <form
                  onSubmit={handleJoinSubmit}
                  className="grid grid-cols-1 gap-4"
                >
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
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mt-4 w-full focus:outline-none"
                  >
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
  );
}

export default JoinCreateRoomStudent;
