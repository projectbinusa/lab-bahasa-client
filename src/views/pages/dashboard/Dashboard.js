import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../../../component/Navbar1";

function Dashboard() {
  return (
    <>
      <div className="all bg-[#F4F4F4]">
        <Navbar />
        <div className="min-h-screen px-32 mt-10">
          <div className="card grid grid-cols-2 gap-4 mb-10">
            <div className="card-1 rounded-lg text-white bg-[#44dba8]">
              <div className="px-8 py-5 flex justify-between">
                <div className="icon">Icon</div>
                <div className="ket text-right">
                  <p className="text-xl font-semibold">Jumlah Siswa</p>
                  <p className="text-3xl font-bold">20</p>
                </div>
              </div>
              <div className="text-center rounded-b-lg bg-[#14C38E] py-1">
                Lihat Selengkapnya
              </div>
            </div>
            <div className="card-2 rounded-lg text-white bg-[#44dba8]">
              <div className="px-8 py-5 flex justify-between">
                <div className="icon">Icon</div>
                <div className="ket text-right">
                  <p className="text-xl font-semibold">Jumlah Siswa</p>
                  <p className="text-3xl font-bold">20</p>
                </div>
              </div>
              <div className="text-center rounded-b-lg bg-[#14C38E] py-1">
                Lihat Selengkapnya
              </div>
            </div>
          </div>
          <div className="data-cards mb-10">
            <div className="tabel-class bg-white p-5 rounded-xl shadow-xl border border-gray-300">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Manage Class</h2>
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
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card-student mt-8">
              <div className="tabel-student bg-white p-5 rounded-xl shadow-xl border border-gray-300">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Manage Name List</h2>
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
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
