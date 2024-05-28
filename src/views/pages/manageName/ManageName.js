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
          <div className="tabel-name bg-white p-5 rounded-xl shadow-xl border border-gray-300 mt-24">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Manage Name List</h2>
              <div className="flex gap-3">
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
                      Department
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      Class
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      Password
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
                      0899898
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                      Dea
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                      Female
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                      Computer
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                      One
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                      888888
                    </td>
                    <td className="whitespace-nowrap text-center py-3 flex items-center gap-5 justify-center">
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
                    {/* <td className="whitespace-nowrap text-center py-3">
                        <div className="flex items-center -space-x-4 ml-12">
                          <Link to="/user/detail_absen">
                            <button className="z-20 block rounded-full border-2 border-white bg-green-400 p-4 text-blue-700 active:bg-blue-50">
                              <span className="relative inline-block">
                                <FontAwesomeIcon
                                  icon={""}
                                  className="h-4 w-4"
                                />
                              </span>
                            </button>
                          </Link>
                          <Link to="/user/izin_absen">
                            <button className="z-30 block rounded-full border-2 border-white bg-green-700 p-4 text-red-700 active:bg-red-50">
                              <span className="relative inline-block">
                                <FontAwesomeIcon
                                  className="h-4 w-4"
                                  icon={""}
                                />
                              </span>
                            </button>
                          </Link>
                        </div>
                      </td> */}
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
