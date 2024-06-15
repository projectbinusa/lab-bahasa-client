import React, { useEffect, useState } from "react";
import Navbar from "../../../component/Navbar1";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../utils/api";

const authConfig = {
  headers: {
    "auth-event": `jwt ${localStorage.getItem("token")}`,
  },
};

function UpdateLoginReport() {
  const [end_time, setEndTime] = useState("");
  const history = useHistory();
  const class_id = localStorage.getItem("class_id");
  const param = useParams();

  const update = async (e) => {
    e.preventDefault();
    let url_hit = `${API_DUMMY}/api/instructur/class/${class_id}/login_limits/${param.id}`;
    try {
      const response = await axios.put(
        url_hit,
        {
            end_time
        }, 
        authConfig
      );
      if (response.status === 200) {
        history.push("/login-report");
        Swal.fire({
          icon: "success",
          title: "Berhasil Edit Data",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error updating login report:", error);
    }
  };

  const getById = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/instructur/class/${class_id}/login_limits/${param.id}`,
        authConfig
      );
      const data = response.data.data;
      setEndTime(data.end_time);
    } catch (error) {
      console.error("Error fetching login limit by ID:", error);
    }
  };

  useEffect(() => {
    getById();
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen bg-gray-100">
        <Navbar />
        <div className="content-page container mx-auto p-8">
          <div className="add-class mt-12 bg-white p-8 rounded-xl shadow-xl border border-gray-300">
            <h1 className="text-xl sm:text-2xl font-bold mb-3 text-gray-800">
              Update Kelas
            </h1>
            <form onSubmit={update}>
              <div className="relative mb-5">
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  End Time
                </label>
                <input
                  type="text"
                  id="className"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2"
                  placeholder="Masukkan End Time"
                  required
                  value={end_time}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
              <div className="flex justify-end mt-8">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg text-white bg-green-400 hover:bg-green-600 text-base font-semibold">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateLoginReport;
