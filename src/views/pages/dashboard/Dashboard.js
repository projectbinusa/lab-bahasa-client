import React, { useEffect, useState } from "react";
import Navbar from "../../../component/Navbar1";
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
  // const param = useParams();
  const classId = localStorage.getItem("class_id");

  const getAllKelas = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/instructur/class?limit=100`,
        authConfig
      );
      if (localStorage.getItem("role") == "student") {
        setKelas(response.data.data.filter((k) => k.id == classId));
        console.log(
          "filter class",
          response.data.data.filter((k) => k.id == classId)
        );
      }
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
    <div className="flex flex-col min-h-screen ">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      {/* <div className="flex-grow flex"> */}
      <div className="container p-2 mx-auto sm:mt-5 md:mx-10 flex flex-col">
        <div className="md:flex block justify-center text-center w-full">
          {localStorage.getItem("role") === "instructur" ? (
            <>
              <div className="p-4 w-full sm:w-1/2 md:w-1/4">
                <div className="border-2 bg-blue-100 border-blue-500 shadow-md white px-2 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="text-blue-600 w-12 h-12 mb-3 inline-block"
                    viewBox="0 0 24 24">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
                  </svg>
                  <h2 className="title-font font-medium text-3xl text-gray-900">
                    {clien.length}
                  </h2>
                  <p className="leading-relaxed mt-3">
                    <span className="bg-blue-600 text-white p-1 rounded-lg text-sm">
                      Total Client
                    </span>
                  </p>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          <div className="p-4 w-full sm:w-1/2 md:w-1/4">
            <div className="border-2 bg-blue-100 border-blue-500 shadow-md white px-2 py-6 rounded-lg transform transition duration-500 hover:scale-110">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="text-blue-600 w-12 h-12 mb-3 inline-block"
                viewBox="0 0 24 24">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
              </svg>
              <h2 className="title-font font-medium text-3xl text-gray-900">
                {kelas.length}
              </h2>
              <p className="leading-relaxed mt-3">
                <span className="bg-blue-600 text-white p-1 rounded-lg text-sm">
                  Total Kelas
                </span>
              </p>
            </div>
          </div>
          <div className="p-4 w-full sm:w-1/2 md:w-1/4">
            <div className="border-2 bg-blue-100 border-blue-500 shadow-md white px-2 py-6 rounded-lg transform transition duration-500 hover:scale-110">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="text-blue-600 w-12 h-12 mb-3 inline-block"
                viewBox="0 0 24 24">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
              </svg>
              <h2 className="title-font font-medium text-3xl text-gray-900">
                {kelas.filter((kelas) => kelas.is_active).length}
              </h2>
              <p className="leading-relaxed mt-3">
                <span className="bg-blue-600 text-white p-1 rounded-lg text-sm">
                  Total Kelas Active
                </span>
              </p>
            </div>
          </div>
        </div>

        <br />
        <br />

        {/* Tabel Absensi */}
        {/* <div className="p-4 w-full text-center ml-auto mr-auto bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"> */}
        {/* <div className="flex justify-between"> */}
        {/* </div> */}
        <div className="shadow-xl rounded-lg">
          <div className="bg-white w-full rounded-t-lg">
            <p className="text-xl font-bold text-left text-gray-600 dark:text-white p-3">
              Kelola Kelas
            </p>
          </div>
          {/* <hr /> */}
          <div className="relative w-full overflow-x-auto rounded-b-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-center text-xs text-gray-500 border-t border-b border-t-gray-200 border-b-gray-200 uppercase bg-[#f1fcff] dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3 text-left whitespace-nowrap border-0">
                    No
                  </th>
                  <th className="px-6 py-3 text-left whitespace-nowrap border-0">
                    Gambar
                  </th>
                  <th className="px-6 py-3 text-left whitespace-nowrap border-0">
                    Nama Kelas
                  </th>
                  <th className="px-6 py-3 text-left whitespace-nowrap border-0">
                    Deskripsi
                  </th>
                  <th className="px-6 py-3 text-left whitespace-nowrap border-0 no-border-sides">
                    Kelas Aktif
                  </th>
                  <th className="px-6 py-3 text-left whitespace-nowrap border-0 no-border-sides">
                    Nama Server
                  </th>
                  <th className="px-6 py-3 text-left whitespace-nowrap border-0 no-border-sides">
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
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 text-left whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-left">
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
        {/* </div> */}
        <br />
        {/* Tabel Cuti */}
        {localStorage.getItem("role") === "instructur" ? (
          <>
            {/* <div className="p-4 w-full text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"> */}
            {/* <div className="flex justify-between"> */}
            <div className="shadow-xl rounded-lg">
              <div className="bg-white w-full rounded-t-lg">
                <p className="text-xl font-bold text-left text-gray-600 dark:text-white p-3">
                  Kelola Daftar Nama
                </p>
              </div>
              {/* </div> */}
              {/* <hr /> */}
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-center text-xs text-gray-500 border-t border-b border-t-gray-200 border-b-gray-200 uppercase bg-[#f1fcff] dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th className="px-6 py-3 text-left whitespace-nowrap">
                        No
                      </th>
                      <th className="px-6 py-3 text-left whitespace-nowrap">
                        Id Kelas
                      </th>
                      <th className="px-6 py-3 text-left whitespace-nowrap">
                        Id Siswa
                      </th>
                      <th className="px-6 py-3 text-left whitespace-nowrap">
                        Nama
                      </th>
                      <th className="px-6 py-3 text-left whitespace-nowrap">
                        Gender
                      </th>
                      <th className="px-6 py-3 text-left whitespace-nowrap">
                        Jurusan
                      </th>
                      <th className="px-6 py-3 text-left whitespace-nowrap">
                        Terakhir login
                      </th>
                      <th className="px-6 py-3 text-left whitespace-nowrap">
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
                      menageKelas.slice(0, 10).map((data, index) => (
                        <tr
                          key={data.id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <td className="px-6 py-4 text-left whitespace-nowrap">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 text-left whitespace-nowrap">
                            {data.class_id ? data.class_id : "-"}
                          </td>
                          <td className="px-6 py-4 text-left">
                            {data.client_id ? data.client_id : "-"}
                          </td>
                          <td className="px-6 py-4 text-left capitalize whitespace-nowrap">
                            {data.name ? data.name : "-"}
                          </td>
                          <td className="px-6 py-4 text-left capitalize whitespace-nowrap">
                            {data.gender ? data.gender : "-"}
                          </td>
                          <td className="px-6 py-4 text-left capitalize whitespace-nowrap">
                            {data.departement ? data.departement : "-"}
                          </td>
                          <td className="px-6 py-4 text-left capitalize whitespace-nowrap">
                            {data.last_login ? data.last_login : "-"}
                          </td>
                          <td className="px-6 py-4 text-left whitespace-nowrap">
                            {data.password ? data.password : "-"}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {/* </div> */}
          </>
        ) : (
          <></>
        )}
      </div>
      {/* </div> */}
    </div>
  );
}

export default Dashboard;
