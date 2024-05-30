import React from "react";
import Navbar from "../../../component/Navbar1";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpFromBracket,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function ManageName() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="px-32">
          <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mt-24">
            <div className="flex justify-between">
              <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                Kelola Daftar Nama
              </h6>
              <div className="flex gap-3 mb-5">
                <button className="rounded-xl shadow-xl py-3 px-4 bg-gray-100">
                  <FontAwesomeIcon
                    icon={faArrowUpFromBracket}
                    className="text-xl text-green-400"
                  />
                </button>
                <Link
                  to="/add-name"
                  className="rounded-xl shadow-xl py-3 px-4 bg-gray-100"
                >
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="text-xl text-green-400"
                  />
                </Link>
              </div>
            </div>
            <hr />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-center text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ID Siswa
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
                    <th scope="col" className="px-6 py-3">
                      Aksi
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
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      1
                    </th>

                    <td className="px-6 py-4">997764</td>
                    <td className="px-6 py-4">Alex</td>
                    <td className="px-6 py-4">Laki-Laki</td>
                    <td className="px-6 py-4">Komputer</td>
                    <td className="px-6 py-4">01</td>
                    <td className="px-6 py-4">********</td>
                    <td className="px-6 py-4 flex items-center gap-5 justify-center">
                      <Link
                        to="/update-name"
                        className="py-3 px-4 bg-blue-500 rounded-lg text-white "
                      >
                        <FontAwesomeIcon
                          className="text-lg"
                          icon={faPenToSquare}
                        />
                      </Link>
                      <button className="py-3 px-4 bg-red-500 rounded-lg text-white ">
                        <FontAwesomeIcon className="text-lg" icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageName;
