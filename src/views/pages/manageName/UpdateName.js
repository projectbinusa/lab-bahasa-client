import React from "react";
import Navbar from "../../../component/Navbar1";

function UpdateName() {
  return (
    <>
      <div className="flex flex-col h-screen bg-gray-100">
        <Navbar />
        <div className="content-page container mx-auto p-4 mt-5">
          <div className="add-name mt-12 bg-white p-8 rounded-xl shadow-xl border border-gray-300">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-5">
              Tambah Daftar Nama
            </h1>
            <form onSubmit={""}>
              <div className="md:grid grid-cols-2 gap-4">
                <div className="relative mb-4">
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    ID Siswa
                  </label>
                  <input
                    type="text"
                    id="className"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2"
                    placeholder="Masukkan ID Siswa"
                    required
                  />
                </div>
                <div className="relative mb-4">
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Nama
                  </label>
                  <input
                    type="text"
                    id="className"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2"
                    placeholder="Masukkan Nama"
                    required
                  />
                </div>
                <div className="relative mb-4">
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Gender
                  </label>
                  <input
                    type="text"
                    id="className"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2"
                    placeholder="Masukkan Gender"
                    required
                  />
                </div>
                <div className="relative mb-4">
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Jurusan
                  </label>
                  <input
                    type="text"
                    id="className"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2"
                    placeholder="Masukkan Jurusan"
                    required
                  />
                </div>
                <div className="relative mb-4">
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Kelas
                  </label>
                  <input
                    type="text"
                    id="className"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2"
                    placeholder="Masukkan Kelas"
                    required
                  />
                </div>
                <div className="relative mb-4">
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <input
                    type="text"
                    id="className"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2"
                    placeholder="Masukkan Password"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg text-white bg-green-400 hover:bg-green-600 text-base font-semibold"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateName;
