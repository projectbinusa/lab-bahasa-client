// import React, { useCallback, useState } from "react";
//

// function Index() {
//   const [value, setValue] = useState();
//   const navigate = useNavigate();

//   const handleJoinRoom = useCallback(() => {
//     navigate(`/room-camera/${value}`);
//   }, [navigate, value]);
//   return (
//     <div>
//       <input
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         type="text"
//         placeholder="Masukan kode ruangan"
//       />
//       <button onClick={handleJoinRoom}>Join</button>
//     </div>
//   );
// }

// export default Index;

import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../../../component/Navbar1";
import img from "../../../component/Asset/meet.png";
import { useNavigate } from "react-router-dom";


const authConfig = {
  headers: {
    "auth-event": `jwt ${localStorage.getItem("token")}`,
  },
};

function Index() {
  const [value, setValue] = useState();
  const navigate = useNavigate();

  const handleJoinRoom = useCallback(() => {
    navigate(`/room-camera/${value}`);
  }, [navigate, value]);

  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="md:px-10 from-slate-100 bg-gradient-to-b to-blue-400 h-screen md:flex md:justify-around md:items-center justify-center mx-auto">
          <div className="md:w-1/2 px-6 md:px-12 flex flex-col justify-center h-full">
            <h1 className="md:text-4xl text-3xl text-center md:text-left font-semibold mb-3">
              Panggilan video untuk semua orang atau beberapa orang
            </h1>
            <p className="md:text-xl text-lg text-left text-gray-500 mb-5">
              Terhubung, berkolaborasi dengan lab bahasa kamera
            </p>
            <form
              onSubmit={handleJoinRoom}
              className="flex flex-col md:flex-row items-start md:items-center">
              {localStorage.getItem("role") == "instructur" ? (
                <>
                  <div className="flex w-full md:w-auto">
                    <input
                      className="border border-blue-300 rounded px-4 py-2 mr-1 w-full"
                      placeholder="Buat kode ruang kamera"
                      type="text"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 px-4 py-2 text-white rounded">
                      Buat
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="md:text-xl text-lg text-left text-gray-500 mb-5">
                    Kode Kamera di Berikan dari Guru
                  </p>
                </>
              )}
            </form>
          </div>
          <img
            className="md:w-[40%] w-[90%] hidden md:block md:mt-5 mt-0"
            src="https://cdni.iconscout.com/illustration/premium/thumb/video-call-4393629-3646089.png"
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default Index;
