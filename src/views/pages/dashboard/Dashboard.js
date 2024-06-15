import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../../../component/Navbar1";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_DUMMY } from "../../../utils/api";

const authConfig = {
  headers: {
    "auth-event": `jwt ${localStorage.getItem("token")}`,
  },
};

function Dashboard() {
  const [clien, setClient] = useState([]);
  const [server, setServer] = useState([]);
  const [kelas, setKelas] = useState([]);
  const [menageKelas, setMenageKelas] = useState([]);

  const getAllKelas = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/instructur/class?limit=100`,
        authConfig
      );
      setKelas(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getManageName = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/instructur/class/${localStorage.getItem(
          "class_id"
        )}/management_name_list?limit=100`,
        authConfig
      );
      setMenageKelas(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllServer = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/instructur/class?limit=100`,
        authConfig
      );
      setServer(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllClient = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/instructur/class/${localStorage.getItem(
          "class_id"
        )}/management_name_list?limit=100`,
        authConfig
      );
      setClient(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllKelas();
    getAllServer();
    getAllClient();
    getManageName();
  }, []);

  return (
    <div className="flex flex-col bg-gray-100">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="flex h-full">
        <div className="content-page container p-2 mx-auto sm:mt-5 md:mx-10">
          <div className="md:flex block justify-center text-center">
            <div className="p-4 w-full sm:w-1/2 md:w-1/3">
              <div className="border-2 bg-green-50 border-green-400 shadow-md white px-2 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="text-green-600 w-12 h-12 mb-3 inline-block"
                  viewBox="0 0 24 24"
                >
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
                </svg>
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  {clien.length}
                </h2>
                <p className="leading-relaxed mt-3">
                  {" "}
                  <span className="bg-green-600 text-white p-1 rounded-lg text-sm">
                    Total Client
                  </span>
                </p>
              </div>
            </div>
            <div className="p-4 w-full sm:w-1/2 md:w-1/3">
              <div className="border-2 bg-green-50 border-green-400 shadow-md white px-2 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="text-green-600 w-12 h-12 mb-3 inline-block"
                  viewBox="0 0 24 24"
                >
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
                </svg>
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  {kelas.length}
                </h2>
                <p className="leading-relaxed mt-3">
                  {" "}
                  <span className="bg-green-600 text-white p-1 rounded-lg text-sm">
                    Total Kelas
                  </span>
                </p>
              </div>
            </div>
            <div className="p-4 w-full sm:w-1/2 md:w-1/3">
              <div className="border-2 bg-green-50 border-green-400 shadow-md white px-2 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="text-green-600 w-12 h-12 mb-3 inline-block"
                  viewBox="0 0 24 24"
                >
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
                </svg>
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  {kelas.filter((kelas) => kelas.is_active).length}
                </h2>
                <p className="leading-relaxed mt-3">
                  {" "}
                  <span className="bg-green-600 text-white p-1 rounded-lg text-sm">
                    Total Kelas Active
                  </span>
                </p>
              </div>
            </div>
          </div>
          <br />
          <br />
          {/* Tabel Absensi */}
          <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between">
              <h6 className="mb-2 text-xl font-bold text-black dark:text-white ">
                Kelola Kelas
              </h6>
            </div>
            <hr />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 ">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-center text-xs text-white uppercase bg-green-500 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3 text-left">
                      Gambar
                    </th>
                    <th scope="col" className="px-6 py-3 text-left">
                      Nama Kelas
                    </th>
                    <th scope="col" className="px-6 py-3 text-left">
                      Deskripsi
                    </th>
                    <th scope="col" className="px-6 py-3 text-left">
                      Kelas Aktif
                    </th>
                    <th scope="col" className="px-6 py-3 text-left">
                      Nama Server
                    </th>
                    <th scope="col" className="px-6 py-3 text-left">
                      Id Server
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {kelas.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="py-4">
                        Data Tidak Ada
                      </td>
                    </tr>
                  ) : (
                    kelas.map((data, index) => (
                      <tr
                        key={kelas.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <td className="px-6 py-4 text-left">{index + 1}</td>
                        <td className="px-6 py-4">
                          <img src="" alt="" />
                        </td>
                        <td className="px-6 text-left py-4">
                          {data.name.charAt(0).toUpperCase() +
                            data.name.slice(1)}
                        </td>
                        <td className="px-6 py-4 text-left">
                          {data.description.charAt(0).toUpperCase() +
                            data.description.slice(1)}
                        </td>
                        <td className="px-6 py-4 text-left">
                          {data.is_active ? "Aktif" : "Tidak Aktif"}
                        </td>
                        <td className="px-6 py-4 text-left">
                          {data.user_name ? data.user_name : "-"}
                        </td>
                        <td className="px-6 py-4 text-left">
                          {data.user_id ? data.user_id : "-"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <br />

          {/* Tabel Cuti */}
          <div className="w-full mb-12 p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between">
              <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                Kelola Daftar Nama
              </h6>
            </div>
            <hr />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-center text-xs text-white uppercase bg-green-500 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Id Kelas
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Id Client
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Nama
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Gender
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Jurusan
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Terakhir login
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Kata Sandi
                    </th>
                    {/* <th scope="col" className="px-6 py-3">
                      Password prompt
                    </th> */}
                  </tr>
                </thead>
                <tbody className="text-center">
                  {menageKelas.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="py-4">
                        Data Tidak Ada
                      </td>
                    </tr>
                  ) : (
                    menageKelas.map((data, index) => (
                      <tr
                        key={data.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <td className="px-6 py-4 text-left">{index + 1}</td>
                        <td className="px-6 py-4">
                          {data.client_id ? data.client_id : "-"}
                        </td>
                        <td className="px-6 py-4">
                          {data.class_id ? data.class_id : "-"}
                        </td>
                        <td className="px-6 py-4">
                          {data.name
                            ? data.name.charAt(0).toUpperCase() +
                              data.name.slice(1)
                            : "-"}
                        </td>
                        <td className="px-6 py-4">
                          {data.gender
                            ? data.gender.charAt(0).toUpperCase() +
                              data.gender.slice(1)
                            : "-"}
                        </td>
                        <td className="px-6 py-4">
                          {data.departement
                            ? data.departement.charAt(0).toUpperCase() +
                              data.departement.slice(1)
                            : "-"}
                        </td>
                        <td className="px-6 py-4">
                          {data.last_login ? data.last_login : "-"}
                        </td>
                        <td className="px-6 py-4">
                          {data.password ? data.password : "-"}
                        </td>
                        {/* <td className="px-6 py-4">{data.password_prompt}</td> */}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
