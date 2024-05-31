import React, { useEffect, useState } from "react";
import Navbar from "../../../component/Navbar1";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { API_DUMMY } from "../../../utils/api";
import Swal from "sweetalert2";

const authConfig = {
  headers: {
    "auth-event": `jwt ${localStorage.getItem("token")}`,
  },
};

function ManageClass() {
  const [list, setList] = useState([]);
  const [is_active, setIs_active] = useState(1);
  const [show, setShow] = useState(false);

  const getAllDAta = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/instructur/class`,
        authConfig
      );
      setList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const Put = async (id) => {
    // e.preventDefault();
    console.log(id);
    try {
      await axios.put(
        `${API_DUMMY}/api/instructur/class_active/${id}`,
        is_active,
        authConfig
      );
      setShow(false);
      Swal.fire({
        icon: "success",
        title: "Berhasil Mengaktifkan Kelas",
        showConfirmButton: false,
        timer: 1500,
      });
      getAllDAta();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllDAta();
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="px-32">
          <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mt-24">
            <div className="flex justify-between">
              <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                Kelola Kelas
              </h6>
              <Link
                to="/add-class"
                className="rounded-xl shadow-xl py-3 px-4 bg-gray-100 mb-5">
                <FontAwesomeIcon
                  icon={faPlus}
                  className="text-xl text-green-400"
                />
              </Link>
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
                  {/* {absenData.map((absen, index) => (
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
                      <td className="px-6 py-4">{absen.username}</td>
                      <td className="px-6 py-4">
                        {formatDate(absen.tanggalAbsen)}
                      </td>
                      <td className="px-6 py-4">{absen.jamMasuk || "-"}</td>
                      <td className="px-6 py-4">{absen.jamPulang || "-"}</td>
                      <td className="px-6 py-4">{absen.kehadiran}</td>
                    </tr>
                  ))} */}
                  {list.map((data, index) => {
                    return (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {index + 1}
                        </th>
                        <td className="px-6 py-4">
                          <img src={data.file} alt="" />
                        </td>
                        <td className="px-6 py-4">{data.name}</td>
                        <td className="px-6 py-4">{data.description}</td>
                        <td className="px-6 py-4">
                          {data.is_active ? "Aktif" : "Tidak Aktif"}
                        </td>
                        <td className="px-6 py-4 flex items-center gap-5 justify-center">
                          <button className="py-3 px-4 bg-green-500 rounded-lg text-white ">
                            <FontAwesomeIcon
                              className="text-lg"
                              icon={faCheck}
                              type="button"
                              onClick={() => Put(data.id)}
                            />
                          </button>
                          {/* <button className="py-3 px-4 bg-blue-500 rounded-lg text-white ">
                        <FontAwesomeIcon
                          className="text-lg"
                          icon={faPenToSquare}
                        />
                      </button> */}
                          <Link
                            to="/update-class"
                            className="py-3 px-4 bg-blue-500 rounded-lg text-white ">
                            <FontAwesomeIcon
                              className="text-lg"
                              icon={faPenToSquare}
                            />
                          </Link>
                          <button className="py-3 px-4 bg-red-500 rounded-lg text-white ">
                            <FontAwesomeIcon
                              className="text-lg"
                              icon={faTrash}
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
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
