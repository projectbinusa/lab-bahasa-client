import React, { useEffect, useState } from "react";
import Navbar from "../../../component/Navbar1";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpFromBracket,
  faFileExport,
  faFileImport,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../utils/api";
import { Pagination } from "flowbite-react";
import AddNama from "../../../component/Modal/AddNama";
import { saveAs } from "file-saver";

function ManageName() {
  const [userData, setUserData] = useState([]);
  const class_id = localStorage.getItem("class_id");
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const param = useParams();
  const [showAddNama, setShowAddNama] = useState(false);

  const handleAddNama = () => {
    setShowAddNama(true);
  };

  const handleCloseAddNama = () => {
    setShowAddNama(false);
  };

  const authConfig = {
    headers: {
      "auth-event": `jwt ${localStorage.getItem("token")}`,
    },
  };

  const getAllData = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/instructur/class/${class_id}/management_name_list?limit=${limit}&name=${searchTerm}&page=${currentPage}`,
        authConfig
      );

      setUserData(response.data.data);
      setTotalPages(response.data.pagination.total_page);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const deleteData = async (id) => {
    try {
      const confirmResult = await Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Data ini akan dihapus dan tidak akan bisa kembali!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya",
      });
      if (confirmResult.isConfirmed) {
        await axios.delete(
          `${API_DUMMY}/api/instructur/class/${class_id}/management_name_list/${id}`,
          authConfig
        );
        await Swal.fire({
          title: "Deleted!",
          text: "Data berhasil dihapus.",
          icon: "success",
        });
        // Di sini Anda bisa memanggil fungsi atau melakukan apa pun yang diperlukan setelah penghapusan
        getAllData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          `${API_DUMMY}/api/instructur/class/${class_id}/import/management_name_list`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "auth-event": `jwt ${localStorage.getItem("token")}`,
            },
          }
        );
        Swal.fire("Success", response.data.message, "success");
        getAllData(); // Refresh data after import
      } catch (error) {
        Swal.fire("Error", error.response.data.error, "error");
      }
    }
  };

  const handleExport = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/instructur/class/${class_id}/export/management_name_list`,
        {
          headers: {
            "auth-event": `jwt ${localStorage.getItem("token")}`,
          },
          responseType: "blob", // Important for file download
        }
      );

      const blob = new Blob([response.data], { type: "text/csv" });
      saveAs(blob, "management_name_list.csv");
    } catch (error) {
      Swal.fire("Error", "Failed to export data", "error");
    }
  };

  function onPageChange(page) {
    setCurrentPage(page);
  }

  useEffect(() => {
    getAllData();
  }, [searchTerm, limit, currentPage]);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="px-4 sm:px-8 md:px-16 lg:px-32">
          <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mt-8">
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <h6 className="text-xl text-left font-bold text-gray-900 dark:text-white">
                Kelola Daftar Nama
              </h6>
              <div className="flex flex-col md:flex-row items-center gap-2 mt-4 md:mt-0 w-full md:w-auto">
                <div className="flex items-center w-full md:w-auto">
                  <input
                    type="search"
                    id="search-dropdown"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="block p-2.5 w-full md:w-full z-1 text-sm rounded-l-md text-gray-900 bg-gray-50 border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="Search name..."
                    required
                  />
                  <select
                    value={limit}
                    onChange={handleLimitChange}
                    className="flex-shrink-0 z-1 inline-flex rounded-r-md items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto justify-center my-2 md:my-0 md:justify-start">
                  <button
                    type="button"
                    onClick={handleAddNama}
                    className="rounded-xl shadow p-2 px-3 border bg-green-500"
                  >
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="text-xl text-white"
                    />
                  </button>
                  <label className="rounded-xl shadow p-2 px-3 border bg-blue-500 cursor-pointer">
                    <FontAwesomeIcon
                      icon={faFileImport}
                      className="text-xl text-white"
                    />
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleImport}
                      className="hidden"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={handleExport}
                    className="rounded-xl shadow p-2 px-3 border bg-yellow-500"
                  >
                    <FontAwesomeIcon
                      icon={faFileExport}
                      className="text-xl text-white"
                    />
                  </button>
                </div>
              </div>
            </div>
            <hr />
            <div className="overflow-x-auto shadow-md sm:rounded-lg mt-5">
              <div className="custom-scrollbar">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-center text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="whitespace-nowrap px-6 py-3">
                        No
                      </th>
                      <th scope="col" className="whitespace-nowrap px-6 py-3">
                        ID Siswa
                      </th>
                      <th scope="col" className="whitespace-nowrap px-6 py-3">
                        Nama
                      </th>
                      <th scope="col" className="whitespace-nowrap px-6 py-3">
                        Gender
                      </th>
                      <th scope="col" className="whitespace-nowrap px-6 py-3">
                        Jurusan
                      </th>
                      <th scope="col" className="whitespace-nowrap px-6 py-3">
                        Kelas
                      </th>
                      <th scope="col" className="whitespace-nowrap px-6 py-3">
                        Password
                      </th>
                      <th scope="col" className="whitespace-nowrap px-6 py-3">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {userData.map((manage, index) => (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        key={index}
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {index + 1}
                        </th>
                        <td className="px-6 py-4">997764</td>
                        <td className="px-6 py-4 whitespace-nowrap capitalize">{manage.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap capitalize">
                          {manage.gender}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap capitalize">
                          {manage.departement}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap capitalize">
                          {manage.class_id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap capitalize">
                          {manage.password}
                        </td>
                        <td className="px-6 py-4 flex items-center gap-5 justify-center">
                          <Link
                            to={"/update-name/" + manage.id}
                            className="py-2 px-3 bg-blue-500 rounded-lg text-white"
                          >
                            <FontAwesomeIcon
                              className="text-lg"
                              icon={faPenToSquare}
                            />
                          </Link>
                          <button
                            className="py-2 px-3 bg-red-500 rounded-lg text-white"
                            onClick={() => deleteData(manage.id)}
                          >
                            <FontAwesomeIcon
                              className="text-lg"
                              icon={faTrash}
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <Pagination
              className="mt-5"
              layout="table"
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              showIcons
            />
          </div>
        </div>
      </div>
      <style>
        {`
        .custom-scrollbar {
          overflow-y: auto;
          scrollbar-width: thin;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          border-radius: 3px;
        }
        `}
      </style>
      {showAddNama && <AddNama onClose={handleCloseAddNama} />}
    </>
  );
}

export default ManageName;
