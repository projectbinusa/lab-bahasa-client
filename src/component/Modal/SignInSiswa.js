import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { API_DUMMY } from "../../utils/api";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const authConfig = {
  headers: {
    "auth-event": `jwt ${localStorage.getItem("token")}`,
  },
};

function SignInModal({ onClose }) {
  const [end_time, setEndTime] = useState("");
  const [verifikasiPassword, setVerifikasiPassword] = useState(false);
  const class_id = localStorage.getItem("class_id");
  const history = useHistory();

  const saveChange = async (e) => {
    e.preventDefault();
    const data = {
      end_time: end_time,
      verifikasi_password: verifikasiPassword,
    };
    const url_hit = `${API_DUMMY}/api/instructur/class/${class_id}/login_limits`;

    // Save verifikasi_password value to localStorage
    localStorage.setItem("verifikasi_password", verifikasiPassword);

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
          history.push("/dashboard");
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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 relative">
        <div className="px-6 py-4 bg-green-500 text-white text-center rounded-t-lg relative">
          <h3 className="text-lg font-semibold">Masuk Siswa</h3>
          <FontAwesomeIcon
            icon={faTimes}
            className="absolute top-2 right-2 cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="p-6">
          <FontAwesomeIcon
            icon={faUser}
            className="text-4xl mb-2 mx-auto flex justify-center"
          />
          <h3 className="text-lg font-semibold mb-4">
            Siswa harus memberikan ID dan nama untuk masuk
          </h3>
          <form onSubmit={saveChange}>
            <div className="mb-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={verifikasiPassword}
                  onChange={(e) => setVerifikasiPassword(e.target.checked)}
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
                className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline"
                onClick={onClose}
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline"
              >
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