import React, { useEffect, useState } from "react";
import Navbar from "../../../component/Navbar1";
// import {
//   faArrowRightFromBracket,
//   faCircleCheck,
//   faFloppyDisk,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API_DUMMY } from "../../../utils/api";
import axios from "axios";
import { Pagination } from "flowbite-react";

const authConfig = {
  headers: {
    "auth-event": `jwt ${localStorage.getItem("token")}`,
  },
};

function SignedInformation() {
  const [data, setData] = useState([]);
  const class_id = localStorage.getItem("class_id");
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allData, setAllData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const getAllData = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/instructur/class/${class_id}/management_name_list?limit=${limit}&page=${currentPage}`,
        authConfig
      );
      const filteredData = response.data.data.filter(
        (item) => item.role === "student"
      );
      setAllData(filteredData);
      setTotalPages(response.data.pagination.total_page);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllData();
  }, [limit, currentPage]);

  useEffect(() => {
    if (searchTerm) {
      setIsSearching(true);
      const filteredData = allData.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setData(filteredData);
    } else {
      setIsSearching(false);
      setData(allData);
    }
  }, [searchTerm, allData]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  function onPageChange(page) {
    setCurrentPage(page);
  }

  return (
    <div className="flex flex-col overflow-x-hidden min-h-screen">
      <Navbar />
      <div className="flex-grow px-4 sm:px-32">
        <div className="w-full p-4 re bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mt-10">
          <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
            <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
              Informasi Masuk
            </h6>
            <div className="flex flex-col lg:flex-row lg:items-center">
              <div className="flex max-w-lg mb-2 lg:mb-0 lg:mr-2">
                <input
                  type="search"
                  id="search-dropdown"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="block p-2.5 w-full z-1 text-sm rounded-l-md text-gray-900 bg-gray-50 border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  placeholder="Search name..."
                  autoComplete="of"
                  required
                />
                <select
                  value={limit}
                  onChange={handleLimitChange}
                  className="flex-shrink-0 z-1 inline-flex rounded-r-md items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
              {/* <button className="rounded-xl shadow-xl py-2 px-4 bg-gray-100">
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  className="text-xl text-green-400"
                />
              </button>
              <button className="rounded-xl shadow-xl py-2 px-4 bg-gray-100">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="text-xl text-green-400"
                />
              </button>
              <button className="rounded-xl shadow-xl py-2 px-4 bg-gray-100">
                <FontAwesomeIcon
                  icon={faFloppyDisk}
                  className="text-xl text-green-400"
                />
              </button> */}
            </div>
          </div>
          <hr />

          <div className="overflow-x-auto shadow-md sm:rounded-lg mt-5">
            <table className="w-full table-auto text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-center text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-5 py-3 text-center">
                    No
                  </th>
                  <th scope="col" className="px-5 py-3 text-center">
                    ID Siswa
                  </th>
                  <th scope="col" className="px-5 py-3 text-center">
                    Nama
                  </th>
                  <th scope="col" className="px-5 py-3 text-center">
                    Gender
                  </th>
                  <th scope="col" className="px-5 py-3 text-center">
                    Kelas
                  </th>
                  <th scope="col" className="px-5 py-3 text-center">
                    Jurusan
                  </th>
                  <th scope="col" className="px-5 py-3 text-center">
                    Waktu Sign in
                  </th>
                  <th scope="col" className="px-5 py-3 text-center">
                    Komentar
                  </th>
                </tr>
              </thead>
              <tbody className="text-center">
                {data.length === 0 ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-5 py-4 text-left text-gray-900 dark:text-gray-300"
                    >
                      {isSearching
                        ? "Pencarian Tidak Ditemukan"
                        : "Data Tidak Ada"}
                    </td>
                  </tr>
                ) : (
                  data.map((item, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-5 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {index + 1}
                      </th>
                      <td className="px-3 py-4 text-center">
                        {item.client_id || "-"}
                      </td>
                      <td className="px-3 py-4 text-center capitalize">
                        {item.name || "-"}
                      </td>
                      <td className="px-3 py-4 text-center capitalize">
                        {item.gender || "-"}
                      </td>
                      <td className="px-3 py-4 text-center capitalize">
                        {item.class_id || "-"}
                      </td>
                      <td className="px-3 py-4 text-center capitalize">
                        {item.departement || "-"}
                      </td>
                      <td className="px-3 py-4 text-center capitalize">
                        {item.created_date || "-"}
                      </td>
                      <td className="px-3 py-4 text-center capitalize">
                        {item.comment || "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* {totalPages > 1 && ( */}
          <Pagination
            className="mt-5 text-center"
            layout="table"
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            showIcons
          />
          {/* )} */}
        </div>
      </div>
    </div>
  );
}

export default SignedInformation;
