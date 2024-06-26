// import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import Navbar from "../../../component/Navbar1";
// import conf from "../../../component/Asset/conf.jpg";
// import { API_DUMMY } from "../../../utils/api";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useRoom } from "./RoomProvider";

// const authConfig = {
//   headers: {
//     "auth-event": `jwt ${localStorage.getItem("token")}`,
//   },
// };

// function CodeMeet() {
//   const history = useHistory();
//   const { fetchedKodeRuang, setFetchedKodeRuang } = useRoom(); // Pastikan useRoom digunakan dengan benar
//   const [kodeRuang, setKodeRuang] = useState("");
//   let class_id = localStorage.getItem("class_id");

//   const submitCode = (e) => {
//     e.preventDefault();
//     if (kodeRuang === fetchedKodeRuang) {
//       history.push(`/room/${kodeRuang}`);
//     } else {
//       Swal.fire({
//         icon: "warning",
//         title: "Kode ruang yang dimasukkan salah.",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     }
//   };

//   const getById = async () => {
//     try {
//       const response = await axios.get(
//         `${API_DUMMY}/api/instructur/class/${class_id}`,
//         authConfig
//       );
//       const data = response.data.data;
//       console.log(response.data.data);
//       setFetchedKodeRuang(data.kode_ruang);
//       setKodeRuang(data.kode_ruang);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getById();
//   }, []);

//   return (
//     <div className="flex flex-col h-screen">
//       {/* Navbar */}
//       <Navbar />
//       {/* Hero */}
//       <div className="relative h-screen ">
//         {/* Image */}
//         <div className="absolute h-full w-full flex overflow-hidden">
//           <img src={conf} className="object-cover  w-full h-full" />
//         </div>
//         {/* Overlay */}
//         <div className="absolute h-full w-full flex overflow-hidden bg-black/60"></div>
//         {/* Hero Info */}
//         <div className="lg:flex lg:pt-20 flex-col items-center justify-center relative z-10 px-6 md:max-w-[90vw] mx-auto">
//           {/* Main */}
//           <div className=" flex flex-col items-center justify-center pb-8">
//             <h1 className="text-[50px] md:text-[80px] text-white font-bold pt-12">
//               Video Chat App
//             </h1>
//             <p className="text-[26px] text-white  -mt-2">With ZegoCloud</p>
//           </div>

//           {/* Enter Code */}
//           <form
//             onSubmit={submitCode}
//             className="text-white md:pt-12 flex flex-col items-center justify-center">
//             <div className=" flex flex-col justify-center items-center">
//               <label className="text-[30px] md:text-[40px] font-bold pt-6">
//                 Enter Room Code
//               </label>
//               <input
//                 type="text"
//                 required
//                 placeholder="Enter Room Code"
//                 value={kodeRuang}
//                 onChange={(e) => setKodeRuang(e.target.value)}
//                 className="py-1.5 md:py-2 px-4 rounded-full max-w-[14rem] mt-2 text-black md:mt-6 outline-0"
//               />
//             </div>
//             <button
//               type="submit"
//               className=" bg-blue-500 hover:bg-blue-400 duration-100 ease-out font-bold w-[5rem] md:w-[7rem] rounded-full py-[5px] md:py-[7px] mt-2 md:mt-4 ">
//               Go
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CodeMeet;

import React, { useEffect, useState } from "react";
import Navbar from "../../../component/Navbar1";
import img from "../../../component/Asset/meet.png";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useRoom } from "./RoomProvider";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../utils/api";
import axios from "axios";

const authConfig = {
  headers: {
    "auth-event": `jwt ${localStorage.getItem("token")}`,
  },
};

function CodeMeet() {
  const history = useHistory();
  const { fetchedKodeRuang, setFetchedKodeRuang } = useRoom();
  const [kodeRuang, setKodeRuang] = useState("");
  let class_id = localStorage.getItem("class_id");

  const submitCode = (e) => {
    e.preventDefault();
    if (kodeRuang === fetchedKodeRuang) {
      history.push(`/room/${kodeRuang}`);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Kode ruang yang dimasukkan salah.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const getById = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/instructur/class/${class_id}`,
        authConfig
      );
      const data = response.data.data;
      console.log(response.data.data);
      setFetchedKodeRuang(data.kode_ruang);
      setKodeRuang(data.kode_ruang);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getById();
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="bg-gradient-to-b md:px-10 from-slate-100 to-green-300 h-screen md:flex md:justify-around md:items-center justify-center mx-auto">
          <div className="md:w-1/2 px-6 md:px-12 flex flex-col justify-center h-full">
            <h1 className="md:text-4xl text-3xl text-center md:text-left font-semibold mb-3">
              Rapat dan panggilan video untuk semua kelas
            </h1>
            <p className="md:text-xl text-lg text-left text-gray-500 mb-5">
              Terhubung, berkolaborasi dengan lab bahasa screen broadcast
            </p>
            <form
              onSubmit={submitCode}
              className="flex flex-col md:flex-row items-start md:items-center"
            >
              <div className="flex w-full md:w-auto">
                <input
                  className="border border-green-300 rounded px-4 py-2 mr-1 w-full"
                  placeholder="Masukan kode ruang"
                  type="text"
                  value={kodeRuang}
                  onChange={(e) => setKodeRuang(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-green-500 px-4 py-2 text-white rounded"
                >
                  Gabung
                </button>
              </div>
            </form>
          </div>
          <img
            className="md:w-[40%] w-[90%] hidden md:block md:mt-5 mt-0"
            src={img}
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default CodeMeet;
