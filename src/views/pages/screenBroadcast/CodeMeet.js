import React, { useEffect, useState } from "react";
import Navbar from "../../../component/Navbar1";
import img from "../../../component/Asset/meet.png";
import {  useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const { fetchedKodeRuang, setFetchedKodeRuang } = useRoom();
  const [kodeRuang, setKodeRuang] = useState("");
  let class_id = localStorage.getItem("class_id");

  const submitCode = (e) => {
    e.preventDefault();
    if (kodeRuang === fetchedKodeRuang) {
      navigate(`/meet-online/${kodeRuang}`);
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
  }, [class_id]);

  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="bg-gradient-to-b md:px-10 from-slate-100 to-blue-300 h-screen md:flex md:justify-around md:items-center justify-center mx-auto">
          <div className="md:w-1/2 px-6 md:px-12 flex flex-col justify-center h-full">
            <h1 className="md:text-4xl text-3xl text-center md:text-left font-semibold mb-3">
              Rapat dan panggilan video untuk semua kelas
            </h1>
            <p className="md:text-xl text-lg text-left text-gray-500 mb-5">
              Terhubung, berkolaborasi dengan lab bahasa screen broadcast
            </p>
            <form
              onSubmit={submitCode}
              className="flex flex-col md:flex-row items-start md:items-center">
              <div className="flex w-full md:w-auto">
                <input
                  className="border border-blue-300 rounded px-4 py-2 mr-1 w-full"
                  placeholder="Masukan kode ruang"
                  type="text"
                  value={kodeRuang}
                  onChange={(e) => setKodeRuang(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-blue-500 px-4 py-2 text-white rounded">
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
