import React from "react";
import Navbar from "../../../component/Navbar1";
import {
  faArrowRightFromBracket,
  faCircleCheck,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SignedInformation() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="px-32">
        <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mt-24">
          <div className="flex justify-between">
            <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
              Informasi Sign In
            </h6>
            <div className="flex gap-3 mb-4">
              <button className="rounded-xl shadow-xl py-3 px-4 bg-gray-100">
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  className="text-xl text-green-400"
                />
              </button>
              <button className="rounded-xl shadow-xl py-3 px-4 bg-gray-100">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="text-xl text-green-400"
                />
              </button>
              <button className="rounded-xl shadow-xl py-3 px-4 bg-gray-100">
                <FontAwesomeIcon
                  icon={faFloppyDisk}
                  className="text-xl text-green-400"
                />
              </button>
            </div>
          </div>
          <hr />
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-center text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-5 py-3">
                    No
                  </th>
                  <th scope="col" className="px-5 py-3">
                    ID Siswa
                  </th>
                  <th scope="col" className="px-5 py-3">
                    Nama
                  </th>
                  <th scope="col" className="px-5 py-3">
                    Gender
                  </th>
                  <th scope="col" className="px-5 py-3">
                    Kelas
                  </th>
                  <th scope="col" className="px-5 py-3">
                    Jurusan
                  </th>
                  <th scope="col" className="px-5 py-3">
                    Nama Komputer
                  </th>
                  <th scope="col" className="px-5 py-3">
                    Alamat IP
                  </th>
                  <th scope="col" className="px-5 py-3">
                    Waktu Sign in
                  </th>
                  <th scope="col" className="px-5 py-3">
                    Komentar
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
                    className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    1
                  </th>
                  <td className="px-3 py-4">93838789</td>
                  <td className="px-3 py-4">Alexa</td>
                  <td className="px-3 py-4">Perempuan</td>
                  <td className="px-3 py-4">01</td>
                  <td className="px-3 py-4">Komputer</td>
                  <td className="px-3 py-4">Ay685</td>
                  <td className="px-3 py-4">123.4989.09489</td>
                  <td className="px-3 py-4">15/5/2024 07.00 WIB</td>
                  <td className="px-3 py-4">Absen</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignedInformation;
