import React, { useEffect, useState } from "react";
import Navbar from "../../../component/Navbar1";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../utils/api";
import { Pagination } from "flowbite-react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const authConfig = {
  headers: {
    "auth-event": `jwt ${localStorage.getItem("token")}`,
  },
};

function ResponseCompetition() {
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const class_id = localStorage.getItem("class_id");

  const getAllData = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/instructur/class/${class_id}/answer?limit=${limit}&answer=${searchTerm}&page=${currentPage}`,
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

  function onPageChange(page) {
    setCurrentPage(page);
  }

  const deleteData = async (id) => {
    try {
      await axios.delete(
        `${API_DUMMY}/api/instructur/class/^${localStorage.getItem(
          "class_id"
        )}/answer/${id}`,
        authConfig
      );
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

  useEffect(() => {
    getAllData();
  }, [limit, searchTerm, currentPage]);

  return (
    <>
      <div className="flex flex-col h-screen overflow-x-hidden">
        <Navbar />
        <div className="px-4 sm:px-8 md:px-16 lg:px-32">
          <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mt-8">
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <h6 className="text-xl text-left font-bold text-gray-900 dark:text-white">
                Response Kompetisi
              </h6>
              <div className="flex flex-col md:flex-row items-center gap-2 mt-4 md:mt-0 w-full md:w-auto">
                <div className="flex items-center w-full md:w-auto">
                  <input
                    type="search"
                    id="search-dropdown"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block p-2.5 w-full z-1 text-sm rounded-l-md text-gray-900 bg-gray-50 border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="Search name..."
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
              </div>
            </div>
            <hr />
            <div className="overflow-x-auto shadow-md sm:rounded-lg mt-5">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-center text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-6 py-3 text-left"
                    >
                      No
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-6 py-3 text-left"
                    >
                      Question Id
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-6 py-3 text-left"
                    >
                      Jawaban
                    </th>
                    {localStorage.getItem("role") === "instructur" ? (
                      <>
                        <th scope="col" className="px-6 py-3 text-left">
                          Client name
                        </th>
                      </>
                    ) : (
                      <></>
                    )}
                    <th
                      scope="col"
                      className="whitespace-nowrap px-6 py-3 text-left"
                    >
                      Waktu menjawab client
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-6 py-3 text-left"
                    >
                      Score
                    </th>
                    {localStorage.getItem("role") === "instructur" ? (
                      <>
                        <th scope="col" className="px-6 py-3 text-left">
                          Aksi
                        </th>
                      </>
                    ) : (
                      <></>
                    )}
                  </tr>
                </thead>
                <tbody className="text-center">
                  {list.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-6 py-4 text-gray-500 dark:text-gray-400"
                      >
                        Data Tidak Ada
                      </td>
                    </tr>
                  ) : (
                    <>
                      {list.map((data, index) => (
                        <tr
                          key={index}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 text-left font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {index + 1}
                          </th>
                          {/* <td className="px-6 py-4 text-left">
                            <img src={data.file} alt="" />
                          </td> */}
                          <td className="whitespace-nowrap px-6 py-4 text-left">
                            {data.question_id}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-left capitalize">
                            {data.answer}
                          </td>
                          {localStorage.getItem("role") === "instructur" ? (
                            <>
                              <td className="whitespace-nowrap px-6 py-4 text-left capitalize">
                                {data.user_name}
                              </td>
                            </>
                          ) : (
                            <></>
                          )}
                          <td className="whitespace-nowrap px-6 py-4 text-left">
                            {data.answer_time_user}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-left">
                            {data.score}
                          </td>
                          {localStorage.getItem("role") === "instructur" ? (
                            <>
                              <td className="whitespace-nowrap px-6 py-4 text-left flex items-center">
                                <Link
                                  to={"/score-answer/" + data.id}
                                  className="py-2 px-4 bg-green-500 rounded-lg text-white"
                                >
                                  <i className="fa-solid fa-star"></i>
                                </Link>
                              </td>
                            </>
                          ) : (
                            <></>
                          )}
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
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
    </>
  );
}

export default ResponseCompetition;
