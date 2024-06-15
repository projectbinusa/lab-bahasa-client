import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../utils/api";

function AddName({ onClose }) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [departement, setDepartement] = useState("");
  const [password, setPassword] = useState("");
  const [email, setemail] = useState("");
  const [password_prompt, setpassword_prompt] = useState("");
  const history = useHistory();
  const class_id = localStorage.getItem("class_id");

  const authConfig = {
    headers: {
      "auth-event": `jwt ${localStorage.getItem("token")}`,
    },
  };

  const saveChange = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      departement: departement,
      password: password,
      gender: gender,
      password_prompt: password_prompt,
    };

    let url_hit = `${API_DUMMY}/api/instructur/class/${class_id}/management_name_list`;

    try {
      const response = await axios.post(url_hit, data, authConfig);
      if (response.status === 200) {
        history.push("/manage-name");
        Swal.fire({
          icon: "success",
          title: "Berhasil Menambahkan Data.",
          showConfirmButton: false,
          timer: 1500,
        });
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex bg-gray-100">
        <div className="content-page container mx-auto">
          <div className="add-name bg-white p-8 rounded-xl shadow-xl border border-gray-300">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-5">
              Tambah Daftar Nama
            </h1>
            <form onSubmit={saveChange}>
              <div className="md:grid grid-cols-2 gap-4">
                <div className="relative mb-4">
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Email
                  </label>
                  <input
                    type="text"
                    id="className"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2"
                    placeholder="Masukkan Nama"
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
                  <input
                    type="text"
                    id="className"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2"
                    placeholder="Masukkan Gender"
                    required
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
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
                <div className="relative mb-4">
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Password Prompt
                  </label>
                  <input
                    type="text"
                    id="className"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2"
                    placeholder="Masukkan Password"
                    required
                    value={password_prompt}
                    onChange={(e) => setpassword_prompt(e.target.value)}
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

export default AddName;
