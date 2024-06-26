import React, { useEffect, useState } from "react";
import Navbar from "../../../component/Navbar1";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import { API_DUMMY } from "../../../utils/api";
import Swal from "sweetalert2";
import axios from "axios";

function UpdateName() {
  const [email, setemail] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [departement, setDepartement] = useState("");
  const [password_prompt, setpassword_prompt] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const param = useParams();
  const class_id = localStorage.getItem("class_id");

  const authConfig = {
    headers: {
      "auth-event": `jwt ${localStorage.getItem("token")}`,
    },
  };

  const update = async (e) => {
    e.preventDefault();
    let url_hit = `${API_DUMMY}/api/instructur/class/${class_id}/management_name_list/${param.id}`;
    try {
      const response = await axios.put(
        url_hit,
        {
          email,
          name,
          gender,
          departement,
          password_prompt,
          password,
        },
        authConfig
      );
      if (response.status === 200) {
        history.push("/manage-name/"+localStorage.getItem("class_id"));
        Swal.fire({
          icon: "success",
          title: "Data password_prompt berhasil diperbarui.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getById = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/instructur/class/${class_id}/management_name_list/${param.id}`,
        authConfig
      );
      const data = response.data.data;
      setemail(data.email);
      setPassword(data.password);
      setpassword_prompt(data.password_prompt);
      setDepartement(data.departement);
      setGender(data.gender);
      setName(data.name);
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
        <div className="content-page container mx-auto p-4 mt-5">
          <div className="add-name bg-white p-8 rounded-xl shadow-xl border border-gray-300">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-5">
              Edit Daftar Nama
            </h1>
            <form onSubmit={update}>
              <div className="md:grid grid-cols-2 gap-4">
                <div className="relative mb-4">
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Email
                  </label>
                  <input
                    type="text"
                    id="className"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2"
                    placeholder="Masukkan Email"
                    required
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  />
                </div>
                <div className="relative mb-4">
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Nama
                  </label>
                  <input
                    type="text"
                    id="className"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2"
                    placeholder="Masukkan Nama"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="relative mb-4">
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Gender
                  </label>
                  <select
                    id="gender"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >
                    <option value="">Pilih Gender</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div className="relative mb-4">
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Jurusan
                  </label>
                  <input
                    type="text"
                    id="className"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2"
                    placeholder="Masukkan Jurusan"
                    required
                    value={departement}
                    onChange={(e) => setDepartement(e.target.value)}
                  />
                </div>
                <div className="relative mb-4">
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Password prompt
                  </label>
                  <input
                    type="text"
                    id="className"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2"
                    placeholder="Masukkan password_prompt"
                    required
                    value={password_prompt}
                    onChange={(e) => setpassword_prompt(e.target.value)}
                  />
                </div>
                <div className="relative mb-4">
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <input
                    type="text"
                    id="className"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2"
                    placeholder="Masukkan Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg text-white bg-green-400 hover:bg-green-600 text-base font-semibold"
                >
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

export default UpdateName;
