import React, { useEffect, useState } from "react";
import Navbar from "../../../component/Navbar1";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { API_DUMMY } from "../../../utils/api";
import Swal from "sweetalert2";
import { Pagination } from "flowbite-react";

const authConfig = {
  headers: {
    "auth-event": `jwt ${localStorage.getItem("token")}`,
  },
};

function LoginReport() {
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const class_id = localStorage.getItem("class_id")

  const getAllData = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/instructur/class/${class_id}/login_limits?limit=${limit}&name=${searchTerm}&page=${currentPage}`,
        authConfig
      );
      setList(response.data.data);
      setTotalPages(response.data.pagination.total_page);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const putClassIdUser = async (id) => {
    try {
      await axios.put(
        `${API_DUMMY}/api/instructur/update_class_id_user`,
        { class_id: id },
        authConfig
      );
      getAllData();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(`${API_DUMMY}/api/instructur/class/${class_id}/login_limits/${id}`, authConfig);
      Swal.fire({
        title: "Apakah anda yakin",
        text: "Data ini akan di hapus dan tidak akan bisa kembali!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Data berhasil di hapus.",
            icon: "success",
          });
        }
      });
      getAllData();
    } catch (error) {
      console.log(error);
    }
  };

  function onPageChange(page) {
    setCurrentPage(page);
  }

  useEffect(() => {
    // console.log(localStorage.getItem("class_id"));
    getAllData();
  }, [searchTerm, limit, currentPage]);

  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="px-32">
          <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mt-24 mb-10">
            <div className="flex justify-between">
              <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                Login Report
              </h6>
              <div className="flex justify-end">
                <div class="max-w-lg mx-auto">
                  <div class="flex mr-2">
                    <div class="relative w-full">
                      <input
                        type="search"
                        id="search-dropdown"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        class="block p-2.5 w-full z-20 text-sm rounded-l-md text-gray-900 bg-gray-50 border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 "
                        placeholder="Search name..."
                        required
                      />
                    </div>
                    <select
                      value={limit}
                      onChange={handleLimitChange}
                      class="flex-shrink-0 z-10 inline-flex rounded-r-md items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                    </select>
                  </div>
                </div>

                {/* <input
                  type="text"
                  placeholder="Name....."
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-gray-300 h-10 rounded-md mr-2"
                />

                <select
                  value={limit}
                  onChange={handleLimitChange}
                  className="border border-gray-300 h-10 rounded-md mr-2">
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select> */}
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
                      End Time
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {list.map((data, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {index + 1}
                      </th>
                      <td className="px-6 py-4">{data.end_time}</td>
                      <td className="px-6 py-4 flex items-center gap-5 justify-center">
                        <Link
                          to={"/update-login-report/" + data.id}
                          className="py-3 px-4 bg-blue-500 rounded-lg text-white">
                          <FontAwesomeIcon
                            className="text-lg"
                            icon={faPenToSquare}
                          />
                        </Link>
                        <button
                          className="py-3 px-4 bg-red-500 rounded-lg text-white"
                          onClick={() => deleteData(data.id)}>
                          <FontAwesomeIcon className="text-lg" icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>{" "}
            </div>
            <Pagination
              className="mt-5"
              layout="table"
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              showIcons
            />
            {/* <div className="flex justify-center mt-3">
              {pagination.total_page > 10 ? (
                <span>...</span>
              ) : (
                Array.from({ length: pagination.total_page }, (_, i) => (
                  <button
                    key={i}
                    className="px-3 py-1 mx-1 border rounded-md bg-green-500 text-white">
                    {i + 1}
                  </button>
                ))
              )}
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginReport;
