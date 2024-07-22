// SignInModal.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_DUMMY } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { usePasswordVerification } from "../../views/pages/auth/VerifPass";
// import { usePasswordVerification } from "../../contexts/PasswordVerificationContext";

const authConfig = {
  headers: {
    "auth-event": `jwt ${localStorage.getItem("token")}`,
  },
};

function SignInModal({ onClose }) {
  const [end_time, setEndTime] = useState("");
  const { requirePassword, setRequirePassword } = usePasswordVerification();
  const { setVeri } = usePasswordVerification([]);
  const class_id = localStorage.getItem("class_id");
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  const saveChange = async (e) => {
    e.preventDefault();
    const data = {
      end_time: end_time,
      verifikasi_password: requirePassword,
    };
    const url_hit = `${API_DUMMY}/api/instructur/class/${class_id}/login_limits`;

    try {
      const response = await axios.post(url_hit, data, authConfig);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berhasil Menambahkan Data.",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          onClose();
          // navigate("/dashboard/"+localStorage.getItem("class_id"));
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Menambahkan Data.",
          text: response.data.message,
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: error.response ? error.response.data.message : "Network Error",
        showConfirmButton: true,
      });
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Menambahkan leading zero
    const day = today.getDate().toString().padStart(2, "0"); // Menambahkan leading zero
    return `${year}-${month}-${day}`;
  };

  const getAllData = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/instructur/class/5/login_limits`
      );

      const todayDate = getTodayDate();
      const filteredData = response.data.data.filter((item) => {
        const itemDate = item.created_date.split(" ")[0];
        return itemDate == todayDate;
      });

      const verifikasiPasswords = filteredData.map(
        (data) => data.verifikasi_password
      );
      setList(verifikasiPasswords);
      setVeri(verifikasiPasswords);
      console.log("filter: ", filteredData);
      console.log("date: ", todayDate);
      console.log("veri: ", verifikasiPasswords);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 relative">
        <div className="px-6 py-4 bg-blue-700 text-white text-center rounded-t-lg relative">
          <h3 className="text-lg font-semibold">Masuk Siswa</h3>
          <i
            onClick={onClose}
            class="fa-solid fa-xmark absolute top-2 right-2 cursor-pointer"></i>
        </div>
        <div className="p-6">
          <i class="fa-solid fa-user text-4xl mb-2 mx-auto flex justify-center"></i>
          <h3 className="text-lg font-semibold mb-4">
            Siswa harus memberikan ID dan nama untuk masuk
          </h3>
          <form onSubmit={saveChange}>
            <div className="mb-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  required
                  checked={requirePassword}
                  onChange={(e) => setRequirePassword(e.target.checked)}
                />
                <span>Verifikasi Password</span>
              </label>
            </div>
            <div className="mb-4">
              <label className="flex items-center space-x-3">
                <input type="checkbox" />
                <span>
                  Siswa akan dianggap terlambat jika masuk setelah waktu
                  tersebut
                </span>
              </label>
              <input
                type="datetime-local"
                className="w-full mt-2 p-2 border rounded"
                value={end_time}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                onClick={onClose}>
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 font-bold text-white bg-blue-700 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline">
                Mulai
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignInModal;
