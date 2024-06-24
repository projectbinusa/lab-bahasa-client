// import React, { useCallback, useState } from "react";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// function Index() {
//   const [value, setValue] = useState();
//   const history = useHistory();

//   const handleJoinRoom = useCallback(() => {
//     history.push(`/room-camera/${value}`);
//   }, [history, value]);
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
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const authConfig = {
  headers: {
    "auth-event": `jwt ${localStorage.getItem("token")}`,
  },
};

function Index() {
  const [value, setValue] = useState();
  const history = useHistory();

  const handleJoinRoom = useCallback(() => {
    // if (localStorage.getItem("role") == "instructur") {
    history.push(`/room-camera/${value}`);
    // } else {
    //   history.push(`/student-camera/${value}`);
    // }
  }, [history, value]);

  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="bg-gradient-to-b from-slate-100 to-green-300 h-screen">
          <div className="md:flex block justify-around mt-12">
            <div className="md:mt-24 mt-5 md:w-[40%]">
              <h1 className="text-4xl text-left font-semibold mb-3">
                Panggilan video untuk semua orang atau beberapa orang
              </h1>
              <p className="text-xl text-gray-500 text-left mb-5">
                Terhubung, berkolaborasi dengan lab bahasa kamera
              </p>
              <form onSubmit={handleJoinRoom} className="flex gap-2">
                <input
                  className="border border-green-300 rounded"
                  placeholder="Buat kode ruang kamera"
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-green-500 p-3 text-white rounded">
                  Buat
                </button>
              </form>
            </div>
            <img
              className="md:w-[40%] w-[90%] md:mt-5 mt-0"
              src="https://cdni.iconscout.com/illustration/premium/thumb/video-call-4393629-3646089.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
