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
        `${API_DUMMY}/api/instructur/class/${localStorage.getItem('class_id')}/management_name_list?limit=100`,
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
        <div className="content-page container p-2 ml-20 mr-20 mt-12">
          <div class="md:flex block justify-center -m-4 text-center mt-12">
            <div class="p-4 w-full">
              <div class="border-2 bg-green-50 border-green-400 shadow-md white px-2 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="text-green-600 w-12 h-12 mb-3 inline-block"
                  viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
                </svg>
                <h2 class="title-font font-medium text-3xl text-gray-900">
                  {clien.length}
                </h2>
                <p class="leading-relaxed mt-3">
                  {" "}
                  <span className="bg-green-600 text-white p-1 rounded-lg text-sm">
                    Total Client
                  </span>
                </p>
              </div>
            </div>
            <div class="p-4 w-full">
              <div class="border-2 bg-green-50 border-green-400 shadow-md white px-2 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="text-green-600 w-12 h-12 mb-3 inline-block"
                  viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
                </svg>
                <h2 class="title-font font-medium text-3xl text-gray-900">
                  {kelas.length}
                </h2>
                <p class="leading-relaxed mt-3">
                  {" "}
                  <span className="bg-green-600 text-white p-1 rounded-lg text-sm">
                    Total Kelas
                  </span>
                </p>
              </div>
            </div>
            <div class="p-4 w-full">
              <div class="border-2 bg-green-50 border-green-400 shadow-md white px-2 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="text-green-600 w-12 h-12 mb-3 inline-block"
                  viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
                </svg>
                <h2 class="title-font font-medium text-3xl text-gray-900">
                  {kelas.filter((kelas) => kelas.is_active).length}
                </h2>
                <p class="leading-relaxed mt-3">
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
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left">
                      Kelas Aktif
                    </th>
                    <th scope="col" className="px-6 py-3 text-left">
                      Server Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left">
                      Server Id
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {kelas.map((data, index) => {
                    return (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-left text-gray-900 whitespace-nowrap dark:text-white">
                          {index + 1}
                        </th>
                        <td className="px-6 py-4">
                          <img src="" alt="" />
                        </td>
                        <td className="px-6 text-left py-4">{data.name}</td>
                        <td className="px-6 py-4 text-left">
                          {data.description}
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
                    );
                  })}
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
                      Kelas Id
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Client Id
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
                      Password
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Password prompt
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {menageKelas.map((data, index) => {
                    return (
                      <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {index + 1}
                        </th>
                        <td className="px-6 py-4">{data.client_id}</td>
                        <td className="px-6 py-4">{data.class_id}</td>
                        <td className="px-6 py-4">{data.name}</td>
                        <td className="px-6 py-4">{data.gender}</td>
                        <td className="px-6 py-4">{data.departement}</td>
                        <td className="px-6 py-4">{data.last_login}</td>
                        <td className="px-6 py-4">{data.password}</td>
                        <td className="px-6 py-4">{data.password_prompt}</td>
                      </tr>
                    );
                  })}
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
