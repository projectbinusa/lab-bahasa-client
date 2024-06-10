import React, { useEffect, useState } from "react";
import Navbar from "../../../component/Navbar1";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpFromBracket,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../utils/api";

function ManageName() {
  const [userData, setUserData] = useState([]);
  const token = localStorage.getItem("token");
  const class_id = localStorage.getItem("id");

  const getAllJabatan = async (classId) => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/instructur/class/${classId}/management_name_list`
      );
  
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  

  const deleteData = async (id) => {
    Swal.fire({
      title: "Anda Ingin Menghapus Data ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:2024/api/jabatan/delete/` + id, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          Swal.fire({
            icon: "success",
            title: "Dihapus!",
            showConfirmButton: false,
          });

          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: "error",
            title: "Gagal Menghapus Data",
          });
        }
      }
    });
  };
  useEffect(() => {
    getAllJabatan(5);
  }, []);
  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="px-32">
          <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mt-24">
            <div className="flex justify-between">
              <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                Kelola Daftar Nama
              </h6>
              <div className="flex gap-3 mb-5">
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
            <hr />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-center text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ID Siswa
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Nama
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Gender
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Jurusan
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Kelas
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Password
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center">
                   {userData.map((manage, index) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                       {index + 1}
                    </th>

                    <td className="px-6 py-4">997764</td>
                    <td className="px-6 py-4">{manage.name}</td>
                    <td className="px-6 py-4">{manage.gender}</td>
                    <td className="px-6 py-4">{manage.departement}</td>
                    <td className="px-6 py-4">{manage.class_id}</td>
                    <td className="px-6 py-4">{manage.password_prompt}</td>
                    <td className="px-6 py-4 flex items-center gap-5 justify-center">
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
                  </tr>
                   ))}
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
