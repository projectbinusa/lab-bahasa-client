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

function UpdateClass() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [is_active, setis_active] = useState(0);
  const history = useHistory();
  const param = useParams();

  const update = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("is_active", is_active);
    let url_hit = `${API_DUMMY}/api/instructur/class/${param.id}`;
    try {
      const response = await axios.put(url_hit, formData, authConfig);
      if (response.status == 200) {
        history.push("/manage-class/" + localStorage.getItem("class_id"));
        Swal.fire({
          icon: "success",
          title: "Menbgetdi data kelas.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    }
    console.log(formData);
  };

  const getById = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/instructur/class/${param.id}`,
        authConfig
      );
      const data = response.data.data;
      setName(data.name);
      setDescription(data.description);
      setFile(data.file);
      setis_active(data.is_active);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getById();
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen bg-gray-100">
        <Navbar />
        <div className="content-page container mx-auto p-8 mt-5">
          <div className="add-class bg-white p-8 rounded-xl shadow-xl border border-gray-300">
            <h1 className="text-xl sm:text-2xl font-bold mb-3 text-gray-800">
              Edit Kelas
            </h1>
            <form onSubmit={update}>
              <div className="relative mb-5">
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Nama Kelas
                </label>
                <input
                  type="text"
                  id="className"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2"
                  placeholder="Masukkan Nama Kelas"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="relative mb-5">
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Deskripsi
                </label>
                <input
                  type="text"
                  id="className"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2"
                  placeholder="Masukkan Deskripsi"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="relative mb-5">
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Gambar
                </label>
                <input
                  type="file"
                  id="className"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2"
                  placeholder="Masukkan Nama Kelas"
                  required
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              {/* <div className="relative mb-5">
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Aktif
                </label>
                <input
                  type="text"
                  id="className"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2"
                  placeholder="Masukkan Nama Kelas"
                  required
                />
              </div> */}
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

export default UpdateClass;
