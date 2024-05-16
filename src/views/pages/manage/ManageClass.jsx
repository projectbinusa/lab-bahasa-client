import React from "react";
import Navbar from "../../../component/Navbar1";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

function ManageClass() {
  return (
    <>
      <div className="all bg-[#F4F4F4]">
        <Navbar />
        <div className="min-h-screen px-32 mt-10">
          <div className="tabel-absen bg-white p-5 rounded-xl shadow-xl border border-gray-300">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Manage Class</h2>
              <button className="rounded-xl shadow-xl py-3 px-4 bg-gray-100">
                <FontAwesomeIcon
                  icon={faPlus}
                  className="text-xl text-green-400"
                />
              </button>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200 mt-4">
              <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm border border-gray-300">
                <thead className="text-left">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      No
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      Class Name
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      Active
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      1
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                      Class 1
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                      Yes
                    </td>
                    <td className="whitespace-nowrap text-center py-3 flex items-center gap-5 justify-center">
                      <button className="py-3 px-4 bg-green-500 rounded-lg text-white ">
                        <FontAwesomeIcon className="text-lg" icon={faCheck} />
                      </button>
                      <button className="py-3 px-4 bg-blue-500 rounded-lg text-white ">
                        <FontAwesomeIcon
                          className="text-lg"
                          icon={faPenToSquare}
                        />
                      </button>
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

export default ManageClass;
