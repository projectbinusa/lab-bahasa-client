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
  const param = useParams();

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
        `${API_DUMMY}/api/instructur/class/${param.id}/management_name_list?limit=100`,
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
        `${API_DUMMY}/api/instructur/class/${param.id}/management_name_list?limit=100`,
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
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="flex-grow flex">
        <div className="container p-2 mx-auto sm:mt-5 md:mx-10 flex flex-col items-center justify-center">
          <div className="md:flex block justify-center text-center w-full">
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
                  <span className="bg-green-600 text-white p-1 rounded-lg text-sm">
                    Total Kelas Active
                  </span>
                </p>
              </div>
            </div>
          </div>

          <br />
          <br />

          <div className="md:flex block justify-center w-full mb-5">
            {/* Tabel Absensi */}
            <div className="p-2 md:w-1/2">
              <div className="p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-between">
                  <h6 className="mb-2 text-xl font-bold text-black dark:text-white">
                    Kelola Kelas
                  </h6>
                </div>
                <hr />
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-center text-xs text-white uppercase bg-green-500 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left whitespace-nowrap"
                        >
                          No
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left whitespace-nowrap"
                        >
                          Gambar
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left whitespace-nowrap"
                        >
                          Nama Kelas
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left whitespace-nowrap"
                        >
                          Deskripsi
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left whitespace-nowrap"
                        >
                          Kelas Aktif
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left whitespace-nowrap"
                        >
                          Nama Server
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left whitespace-nowrap"
                        >
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
                            key={data.id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                          >
                            <td className="px-6 py-4 text-left whitespace-nowrap">
                              {index + 1}
                            </td>
                            <td className="px-6 py-4">
                              <img src="" alt="" />
                            </td>
                            <td className="px-6 py-4 text-left whitespace-nowrap capitalize">
                              {data.name}
                            </td>
                            <td className="px-6 py-4 text-left whitespace-nowrap capitalize">
                              {data.description}
                            </td>
                            <td className="px-6 py-4 text-left whitespace-nowrap capitalize">
                              {data.is_active ? "Aktif" : "Tidak Aktif"}
                            </td>
                            <td className="px-6 py-4 text-left whitespace-nowrap capitalize">
                              {data.user_name ? data.user_name : "-"}
                            </td>
                            <td className="px-6 py-4 text-left whitespace-nowrap capitalize">
                              {data.user_id ? data.user_id : "-"}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <br />

            {/* Tabel Cuti */}
            <div className="p-2 md:w-1/2">
              <div className="p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
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
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          No
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Id Kelas
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Id Client
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Nama
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Gender
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Jurusan
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Terakhir login
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Kata Sandi
                        </th>
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
                            <td className="px-6 py-4 text-left whitespace-nowrap">
                              {index + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {data.client_id ? data.client_id : "-"}
                            </td>
                            <td className="px-6 py-4">
                              {data.class_id ? data.class_id : "-"}
                            </td>
                            <td className="px-6 py-4 capitalize whitespace-nowrap">
                              {data.name ? data.name : "-"}
                            </td>
                            <td className="px-6 py-4 capitalize whitespace-nowrap">
                              {data.gender ? data.gender : "-"}
                            </td>
                            <td className="px-6 py-4 capitalize whitespace-nowrap">
                              {data.departement ? data.departement : "-"}
                            </td>
                            <td className="px-6 py-4 capitalize whitespace-nowrap">
                              {data.last_login ? data.last_login : "-"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {data.password ? data.password : "-"}
                            </td>
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
      </div>
    </div>
  );
}

export default Dashboard;
