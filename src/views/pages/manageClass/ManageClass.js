import React, { useEffect, useState } from "react";
import Navbar from "../../../component/Navbar1";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCheck,
  faFileExport,
  faFileImport,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { API_DUMMY } from "../../../utils/api";
import Swal from "sweetalert2";
import { Pagination } from "flowbite-react";
import AddKelas from "../../../component/Modal/AddKelas";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const authConfig = {
  headers: {
    "auth-event": `jwt ${localStorage.getItem("token")}`,
  },
};

function ManageClass() {
  const [list, setList] = useState([]);
  const [classId, setClassId] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [show, setShow] = useState(false);
  const [showAddClass, setShowAddClass] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const history = useHistory();

  const handleAddClass = () => {
    setShowAddClass(true);
  };

  const handleCloseAddClass = () => {
    setShowAddClass(false);
  };

  const getAllData = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/instructur/class?limit=${limit}&name=${searchTerm}&page=${currentPage}`,
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
      if (localStorage.getItem("class_id") == 0) {
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

  const deleteData = async (id) => {
    try {
      await axios.delete(`${API_DUMMY}/api/instructur/class/${id}`, authConfig);
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

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        `${API_DUMMY}/api/instructur/class/import`,
        formData,
        authConfig
      );
      Swal.fire({
        icon: "success",
        title: "Berhasil Mengimpor Data",
        showConfirmButton: false,
        timer: 1500,
      });
      getAllData();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal Mengimpor Data",
        text:
          error.response?.data?.message ||
          "Terjadi kesalahan saat mengimpor data.",
        showConfirmButton: true,
      });
      console.log(error);
    }
  };

  const handleExport = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/instructur/class/export`,
        {
          ...authConfig,
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "kelas_user.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
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

  useEffect(() => {
    const classId = localStorage.getItem("class_id");
    setShowNavbar(classId !== "0");
    getAllData();
  }, [searchTerm, limit, currentPage]);

  const handleNextPage = (id) => {
    history.push(`/dashboard/${id}`);
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        {showNavbar && <Navbar />}
        <div className="px-32">
          <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mt-8 mb-10">
            <div className="flex justify-between">
              <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                Kelola Kelas
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
                      class="flex-shrink-0 z-10 inline-flex rounded-r-md items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                    >
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
                <button
                  type="button"
                  onClick={handleAddClass}
                  className="rounded-xl shadow p-2 px-3 border bg-green-500 mb-5 mr-2"
                >
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="text-xl text-white"
                  />
                </button>
                <label className="rounded-xl shadow p-2 px-3 border bg-blue-500 mb-5 mr-2 cursor-pointer">
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
                  className="rounded-xl shadow p-2 px-3 border bg-yellow-500 mb-5"
                >
                  <FontAwesomeIcon
                    icon={faFileExport}
                    className="text-xl text-white"
                  />
                </button>
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
                          <FontAwesomeIcon className="text-lg" icon={faCheck} />
                        </button>
                        {data.id ===
                          Number(localStorage.getItem("class_id")) && (
                          <button
                            className="py-3 px-4 rounded-lg text-white bg-green-500"
                            onClick={() => handleNextPage(data.id)}
                          >
                            <FontAwesomeIcon
                              className="text-lg"
                              icon={faArrowRight}
                            />
                          </button>
                        )}
                        <Link
                          to={"/update-class/" + data.id}
                          className="py-3 px-4 bg-blue-500 rounded-lg text-white"
                        >
                          <FontAwesomeIcon
                            className="text-lg"
                            icon={faPenToSquare}
                          />
                        </Link>
                        <button
                          className="py-3 px-4 bg-red-500 rounded-lg text-white"
                          onClick={() => deleteData(data.id)}
                        >
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
      {showAddClass && <AddKelas onClose={handleCloseAddClass} />}
    </>
  );
}

export default ManageClass;
