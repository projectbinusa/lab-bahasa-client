import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../../../component/Navbar1";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
  return (
    // <>
    //   <div className="all bg-[#F4F4F4] h-screen">
    //     <div className="sticky top-0 z-50">
    //       <Navbar />
    //     </div>
    //     <div className="px-32 mt-12">
    //       <div className="card grid grid-cols-2 gap-4 mb-10">
    //         <div className="card-1 rounded-lg text-white bg-[#44dba8]">
    //           <div className="px-8 py-5 flex justify-between">
    //             <div className="icon">Icon</div>
    //             <div className="ket text-right">
    //               <p className="text-xl font-semibold">Jumlah Siswa</p>
    //               <p className="text-3xl font-bold">20</p>
    //             </div>
    //           </div>
    //           <div className="text-center rounded-b-lg bg-[#14C38E] py-1">
    //             Lihat Selengkapnya
    //           </div>
    //         </div>
    //         <div className="card-2 rounded-lg text-white bg-[#44dba8]">
    //           <div className="px-8 py-5 flex justify-between">
    //             <div className="icon">Icon</div>
    //             <div className="ket text-right">
    //               <p className="text-xl font-semibold">Jumlah Siswa</p>
    //               <p className="text-3xl font-bold">20</p>
    //             </div>
    //           </div>
    //           <div className="text-center rounded-b-lg bg-[#14C38E] py-1">
    //             Lihat Selengkapnya
    //           </div>
    //         </div>
    //       </div>
    //       <h6 className="mb-2 text-xl font-bold text-gray-600 dark:text-white">
    //         Manage Class
    //       </h6>{" "}
    //       <div className="data-cards mb-10">
    //         <div class="relative overflow-x-auto">
    //           <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    //             <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    //               <tr>
    //                 <th scope="col" class="px-6 py-3">
    //                   Product name
    //                 </th>
    //                 <th scope="col" class="px-6 py-3">
    //                   Color
    //                 </th>
    //                 <th scope="col" class="px-6 py-3">
    //                   Category
    //                 </th>
    //                 <th scope="col" class="px-6 py-3">
    //                   Price
    //                 </th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    //                 <th
    //                   scope="row"
    //                   class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    //                 >
    //                   Apple MacBook Pro 17"
    //                 </th>
    //                 <td class="px-6 py-4">Silver</td>
    //                 <td class="px-6 py-4">Laptop</td>
    //                 <td class="px-6 py-4">$2999</td>
    //               </tr>
    //               <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    //                 <th
    //                   scope="row"
    //                   class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    //                 >
    //                   Microsoft Surface Pro
    //                 </th>
    //                 <td class="px-6 py-4">White</td>
    //                 <td class="px-6 py-4">Laptop PC</td>
    //                 <td class="px-6 py-4">$1999</td>
    //               </tr>
    //               <tr class="bg-white dark:bg-gray-800">
    //                 <th
    //                   scope="row"
    //                   class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    //                 >
    //                   Magic Mouse 2
    //                 </th>
    //                 <td class="px-6 py-4">Black</td>
    //                 <td class="px-6 py-4">Accessories</td>
    //                 <td class="px-6 py-4">$99</td>
    //               </tr>
    //             </tbody>
    //           </table>
    //         </div>

    //         <div className="card-student mt-8">
    //           <h6 className="mb-2 text-xl font-bold text-gray-600 dark:text-white">
    //             Manage Class List
    //           </h6>{" "}
    //           <div class="relative overflow-x-auto">
    //             <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    //               <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    //                 <tr>
    //                   <th scope="col" class="px-6 py-3">
    //                     Product name
    //                   </th>
    //                   <th scope="col" class="px-6 py-3">
    //                     Color
    //                   </th>
    //                   <th scope="col" class="px-6 py-3">
    //                     Category
    //                   </th>
    //                   <th scope="col" class="px-6 py-3">
    //                     Price
    //                   </th>
    //                 </tr>
    //               </thead>
    //               <tbody>
    //                 <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    //                   <th
    //                     scope="row"
    //                     class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    //                   >
    //                     Apple MacBook Pro 17"
    //                   </th>
    //                   <td class="px-6 py-4">Silver</td>
    //                   <td class="px-6 py-4">Laptop</td>
    //                   <td class="px-6 py-4">$2999</td>
    //                 </tr>
    //                 <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    //                   <th
    //                     scope="row"
    //                     class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    //                   >
    //                     Microsoft Surface Pro
    //                   </th>
    //                   <td class="px-6 py-4">White</td>
    //                   <td class="px-6 py-4">Laptop PC</td>
    //                   <td class="px-6 py-4">$1999</td>
    //                 </tr>
    //                 <tr class="bg-white dark:bg-gray-800">
    //                   <th
    //                     scope="row"
    //                     class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    //                   >
    //                     Magic Mouse 2
    //                   </th>
    //                   <td class="px-6 py-4">Black</td>
    //                   <td class="px-6 py-4">Accessories</td>
    //                   <td class="px-6 py-4">$99</td>
    //                 </tr>
    //               </tbody>
    //             </table>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>

    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="flex h-full">
        <div className="content-page container p-8 ml-0 md:ml-10 mt-12">
          {/* <div className="mt-5 w-full">
            <div className="p-4 text-center bg-slate-300 border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <h2 className="text-2xl font-semibold mb-4">
                Selamat Datang di Absensi
                <span> @{username}</span>
              </h2>
              <a className="profile-menu-link">{day}, </a>
              <a className="profile-menu-link active">{date} - </a>
              <a className="profile-menu-link">{time}</a>
            </div>
          </div> */}

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 mt-12">
            <div class="">
              <div class="relative cursor-pointer dark:text-white">
                <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-green-500 rounded-lg dark:bg-gray-200"></span>
                <div class="relative p-6 bg-white dark:bg-gray-800 border-2 border-green-500 dark:border-gray-300 rounded-lg hover:scale-105 transition duration-500">
                  <div class="flex items-center">
                    <span class="text-xl">
                      <FontAwesomeIcon icon={faUsers} />
                    </span>
                    <h3 class="my-2 ml-3 text-lg font-bold text-gray-800 dark:text-white">
                      Jumlah Siswa
                    </h3>
                  </div>
                  <p class="text-gray-600 dark:text-gray-300">
                    This is the short description of your feature.
                  </p>
                </div>
              </div>
            </div>
            <div class="">
              <div class="relative cursor-pointer dark:text-white">
                <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-green-500 rounded-lg dark:bg-gray-200"></span>
                <div class="relative p-6 bg-white dark:bg-gray-800 border-2 border-green-500 dark:border-gray-300 rounded-lg hover:scale-105 transition duration-500">
                  <div class="flex items-center">
                    <span class="text-xl">
                      <FontAwesomeIcon icon={faUsers} />
                    </span>
                    <h3 class="my-2 ml-3 text-lg font-bold text-gray-800 dark:text-white">
                      Jumlah Siswa
                    </h3>
                  </div>
                  <p class="text-gray-600 dark:text-gray-300">
                    This is the short description of your feature.
                  </p>
                </div>
              </div>
            </div>
            <div class="">
              <div class="relative cursor-pointer dark:text-white">
                <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-green-500 rounded-lg dark:bg-gray-200"></span>
                <div class="relative p-6 bg-white dark:bg-gray-800 border-2 border-green-500 dark:border-gray-300 rounded-lg hover:scale-105 transition duration-500">
                  <div class="flex items-center">
                    <span class="text-xl">
                      <FontAwesomeIcon icon={faUsers} />
                    </span>
                    <h3 class="my-2 ml-3 text-lg font-bold text-gray-800 dark:text-white">
                      Jumlah Siswa
                    </h3>
                  </div>
                  <p class="text-gray-600 dark:text-gray-300">
                    This is the short description of your feature.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <br />

          {/* Tabel Absensi */}
          <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between">
              <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                Manage Class
              </h6>
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
                      Class Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Active
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
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      1
                    </th>
                    <td className="px-6 py-4">Class 1</td>
                    <td className="px-6 py-4">Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <br />

          {/* Tabel Cuti */}
          <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between">
              <h6 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                Manage Class List
              </h6>
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
                      Student ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Gender
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Department
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Class
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Password
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {/* {cutiData.map((cuti, index) => (
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
                      <td className="px-6 py-4">{cuti.username}</td>
                      <td className="px-6 py-4">
                        {formatDate(cuti.created_at)}
                      </td>
                      <td className="px-6 py-4">{cuti.durasi}</td>
                      <td className="px-6 py-4">{cuti.status}</td>
                    </tr>
                  ))} */}
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      1
                    </th>

                    <td className="px-6 py-4">997764</td>
                    <td className="px-6 py-4">Alex</td>
                    <td className="px-6 py-4">Female</td>
                    <td className="px-6 py-4">Computer</td>
                    <td className="px-6 py-4">One</td>
                    <td className="px-6 py-4">********</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
