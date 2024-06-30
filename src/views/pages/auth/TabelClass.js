import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { API_DUMMY } from "../../../utils/api";
import Swal from "sweetalert2";
import { Pagination } from "flowbite-react";

const authConfig = {
  headers: {
    "auth-event": `jwt ${localStorage.getItem("token")}`,
  },
};

function TabelClass() {
  const [list, setList] = useState([]);
  const [classId, setClassId] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [show, setShow] = useState(false);
  const history = useHistory();
  const role = localStorage.getItem("role");

  const getAllData = async () => {
    const userClassId = localStorage.getItem("class_id");

    try {
      let url;
      if (role === "student" && userClassId) {
        url = `${API_DUMMY}/api/instructur/class/${userClassId}`;
      } else {
        url = `${API_DUMMY}/api/instructur/class?limit=${limit}&name=${searchTerm}&page=${currentPage}`;
      }

      const response = await axios.get(url, authConfig);
      if (role === "student" && userClassId) {
        setList([response.data.data]);
        setTotalPages(1); // Students only view their own class, so only one page
      } else {
        setList(response.data.data);
        setTotalPages(response.data.pagination.total_page);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const putClassActive = async (id) => {
    try {
      await axios.put(
        `${API_DUMMY}/api/instructur/class_active/${id}`,
        { is_active: 1 },
        authConfig
      );
      Swal.fire({
        icon: "success",
        title: "Berhasil Mengaktifkan Kelas",
        showConfirmButton: false,
        timer: 1500,
      });
      getAllData();
    } catch (error) {
      console.log(error);
    }
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

  const handleActivateClass = async (id) => {
    try {
      if (localStorage.getItem("class_id") === "0") {
        setClassId(id);
        await putClassActive(id);
        await putClassIdUser(id);
        localStorage.setItem("class_id", id);
      } else {
        setShow(false);
        Swal.fire({
          title: "Gagal memilih kelas",
          text: "Anda sudah memilih 1 kelas, tidak boleh lebih.",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  function onPageChange(page) {
    setCurrentPage(page);
  }

  useEffect(() => {
    getAllData();
  }, [searchTerm, limit, currentPage]);

  const handleNextPage = () => {
    history.push("/");
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="px-4 sm:px-8 md:px-16 lg:px-32">
          <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mt-8">
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <h6 className="text-xl text-left font-bold text-gray-900 dark:text-white">
                Kelola Kelas
              </h6>
              <div className="flex flex-col md:flex-row items-center gap-2 mt-4 md:mt-0 w-full md:w-auto">
                <div className="flex items-center w-full md:w-auto">
                  <input
                    type="search"
                    id="search-dropdown"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block p-2.5 w-full z-1 text-sm rounded-l-md text-gray-900 bg-gray-50 border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="Cari nama kelas..."
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
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-center text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Gambar
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Nama Server
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Nama Kelas
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Deskripsi
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Aktif
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
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {index + 1}
                      </th>
                      <td className="px-6 py-4">
                        <img src={data.file} alt="" />
                      </td>
                      <td className="px-6 py-4 capitalize">{data.user_name}</td>
                      <td className="px-6 py-4 capitalize">{data.name}</td>
                      <td className="px-6 py-4 capitalize">
                        {data.description}
                      </td>
                      <td className="px-6 py-4">
                        {data.is_active ? "Aktif" : "Tidak Aktif"}
                      </td>
                      <td className="px-6 py-4 flex items-center gap-5 justify-center">
                        {role === "instructur" && (
                          <button
                            className={`py-3 px-4 rounded-lg text-white ${
                              data.is_active
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-green-500"
                            }`}
                            onClick={() =>
                              !data.is_active && handleActivateClass(data.id)
                            }
                            disabled={data.is_active}
                          >
                            <FontAwesomeIcon
                              className="text-lg"
                              icon={faCheck}
                            />
                          </button>
                        )}
                        {data.id ===
                          Number(localStorage.getItem("class_id")) && (
                          <button
                            className="py-3 px-4 rounded-lg text-white bg-green-500"
                            onClick={handleNextPage}
                          >
                            <FontAwesomeIcon
                              className="text-lg"
                              icon={faArrowRight}
                            />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
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

export default TabelClass;
