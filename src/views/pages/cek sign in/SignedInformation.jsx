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
        <div className="tabel-absen bg-white p-5 rounded-xl shadow-xl border border-gray-300 mt-24">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Signed Information</h2>
            <div className="flex gap-3">
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

          <div className="overflow-x-auto rounded-lg border border-gray-200 mt-4">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm border border-gray-300">
              <thead className="text-left">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    No
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    Student ID
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    Name
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    Gender
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    Class
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    Department
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    Computer Name
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    IP Address
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    Signed Time
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    Comment
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    1
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    0899898
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    Dea
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    Female
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    One
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    Computer
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    A67dy
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    123.4989.09489
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    15/5/2024 07.00 WIB
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    Absent
                  </td>
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
