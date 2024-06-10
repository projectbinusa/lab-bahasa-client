import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../../../component/Navbar1";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
  return (
    <div className="flex flex-col bg-gray-100">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="flex h-full">
        <div className="content-page container p-2 ml-20 mr-20 mt-12">
          {/* <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 mt-12">
            <div class="">
              <div class="relative cursor-pointer dark:text-white">
                <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-green-300 rounded-lg dark:bg-gray-200"></span>
                <div class="relative p-6 bg-white dark:bg-gray-800 border-2 border-green-300 dark:border-gray-300 rounded-lg hover:scale-105 transition duration-500">
                  <div class="flex items-center">
                    <span class="text-xl">
                      <FontAwesomeIcon icon={faUsers} />
                    </span>
                    <h3 class="my-2 ml-3 text-lg font-bold text-gray-800 dark:text-white">
                      Jumlah Siswa
                    </h3>
                  </div>
                  <p class="text-gray-600 dark:text-gray-300">
                    1
                  </p>
                </div>
              </div>
            </div>
            <div class="">
              <div class="relative cursor-pointer dark:text-white">
                <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-green-300 rounded-lg dark:bg-gray-200"></span>
                <div class="relative p-6 bg-white dark:bg-gray-800 border-2 border-green-300 dark:border-gray-300 rounded-lg hover:scale-105 transition duration-500">
                  <div class="flex items-center">
                    <span class="text-xl">
                      <FontAwesomeIcon
                        icon={faUsers}
                        className="text-green-800"
                      />
                    </span>
                    <h3 class="my-2 ml-3 text-lg font-bold text-gray-800 dark:text-white">
                      Jumlah Siswa
                    </h3>
                  </div>
                  <p class="text-gray-600 dark:text-gray-300">
                    1
                  </p>
                </div>
              </div>
            </div>
            <div class="">
              <div class="relative cursor-pointer dark:text-white">
                <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-green-300 rounded-lg dark:bg-gray-200"></span>
                <div class="relative p-6 bg-white dark:bg-gray-800 border-2 border-green-300 dark:border-gray-300 rounded-lg hover:scale-105 transition duration-500">
                  <div class="flex items-center">
                    <span class="text-xl">
                      <FontAwesomeIcon icon={faUsers} />
                    </span>
                    <h3 class="my-2 ml-3 text-lg font-bold text-gray-800 dark:text-white">
                      Jumlah Siswa
                    </h3>
                  </div>
                  <p class="text-gray-600 dark:text-gray-300">
                   10
                  </p>
                </div>
              </div>
            </div>
          </div> */}
          <div class="md:flex block justify-center -m-4 text-center mt-12">
            {/* <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div class="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="text-indigo-500 w-12 h-12 mb-3 inline-block"
                  viewBox="0 0 24 24">
                  <path d="M8 17l4 4 4-4m-4-5v9"></path>
                  <path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"></path>
                </svg>
                <h2 class="title-font font-medium text-3xl text-gray-900">
                  2.7K
                </h2>
                <p class="leading-relaxed">Downloads</p>
              </div>
            </div> */}
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
                  1.3K
                </h2>
                <p class="leading-relaxed mt-3">
                  {" "}
                  <span className="bg-green-600 text-white p-1 rounded-lg text-sm">Total Client</span>
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
                  1.3K
                </h2>
                <p class="leading-relaxed mt-3">
                  {" "}
                  <span className="bg-green-600 text-white p-1 rounded-lg text-sm">Total Client</span>
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
                  1.3K
                </h2>
                <p class="leading-relaxed mt-3">
                  {" "}
                  <span className="bg-green-600 text-white p-1 rounded-lg text-sm">Total Client</span>
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
                    <th scope="col" className="px-6 py-3">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Nama Kelas
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Aktif
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {/* {absenData.map((absen, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {index + 1}
                      </th>
                      <td className="px-6 py-4">{absen.username}</td>
                      <td className="px-6 py-4">
                        {formatDate(absen.tanggalAbsen)}
                      </td>
                      <td className="px-6 py-4">{absen.jamMasuk || "-"}</td>
                      <td className="px-6 py-4">{absen.jamPulang || "-"}</td>
                      <td className="px-6 py-4">{absen.kehadiran}</td>
                    </tr>
                  ))} */}
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      1
                    </th>
                    <td className="px-6 py-4">Kelas 1</td>
                    <td className="px-6 py-4">Ya</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <br />

          {/* Tabel Cuti */}
          <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
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
                      Id Siswa
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
                      Kelas
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Password
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {/* {cutiData.map((cuti, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {index + 1}
                      </th>
                      <td className="px-6 py-4">{cuti.username}</td>
                      <td className="px-6 py-4">
                        {formatDate(cuti.created_at)}
                      </td>
                      <td className="px-6 py-4">{cuti.durasi}</td>
                      <td className="px-6 py-4">{cuti.status}</td>
                    </tr>
                  ))} */}
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      1
                    </th>

                    <td className="px-6 py-4">997764</td>
                    <td className="px-6 py-4">Alex</td>
                    <td className="px-6 py-4">Female</td>
                    <td className="px-6 py-4">Komputer</td>
                    <td className="px-6 py-4">01</td>
                    <td className="px-6 py-4">********</td>
                  </tr>
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
