import Logo from "../component/Asset/programmer.png";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import SignInModal from "./Modal/SignInSiswa";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [chatDropdownOpen, setChatDropdownOpen] = useState(false);
  const [respDropdownOpen, setRespDropdownOpen] = useState(false);
  const [manageDropdownOpen, setManageDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [showSignIn, setShowSignIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const classId = localStorage.getItem("class_id");

  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role);
  }, []);

  const handleSignIn = () => {
    setShowSignIn(true);
  };

  const handleCloseSignIn = () => {
    setShowSignIn(false);
  };

  const logout = () => {
    // Membersihkan localStorage
    localStorage.clear();

    // Menampilkan Swal dan menunggu sebelum melakukan pengalihan halaman
    Swal.fire({
      icon: "success",
      title: "Berhasil logout.",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      // Mengarahkan pengguna ke halaman login setelah Swal selesai
      navigate("/login");
    });
  };

  const toggleDropdown = (dropdownName) => {
    switch (dropdownName) {
      case "chat":
        setChatDropdownOpen(!chatDropdownOpen);
        setRespDropdownOpen(false);
        setManageDropdownOpen(false);
        setIsDropdownOpen(false);
        break;
      case "response":
        setChatDropdownOpen(false);
        setRespDropdownOpen(!respDropdownOpen);
        setManageDropdownOpen(false);
        setIsDropdownOpen(false);
        break;
      case "manage":
        setChatDropdownOpen(false);
        setRespDropdownOpen(false);
        setManageDropdownOpen(!manageDropdownOpen);
        setIsDropdownOpen(false);
        break;
      case "profile":
        setChatDropdownOpen(false);
        setRespDropdownOpen(false);
        setManageDropdownOpen(false);
        setIsDropdownOpen(!isDropdownOpen);
        break;
      default:
        setChatDropdownOpen(false);
        setRespDropdownOpen(false);
        setManageDropdownOpen(false);
        setIsDropdownOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className="md:sticky top-0 z-1 w-full bg-blue-700 shadow-md shadow-blue-700/50 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 lg:flex lg:items-center lg:justify-between">
        <div className="px-3 py-3 lg:px-5 lg:pl-3 flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button onClick={toggleSidebar} className="text-white lg:hidden">
              {/* <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} /> */}
              <i
                class={`${
                  isSidebarOpen
                    ? "fa-solid fa-circle-xmark"
                    : "fa-solid fa-bars"
                }`}></i>
            </button>
            <a href="" className="flex ms-2">
              <img src={Logo} className="h-11 me-6 text-white" alt="" />
            </a>
          </div>
        </div>

        {userRole === "instructur" && (
          <>
            <div
              className={`${
                isSidebarOpen ? "block" : "hidden"
              } lg:block lg:flex-grow lg:items-center lg:justify-between lg:mx-36 w-full`}>
              <div className="link flex flex-col lg:flex-row items-start lg:items-center gap-3 text-white py-1 px-1">
                <Link to={`/`} className="text-sm font-semibold">
                  <i class="fa-solid fa-chart-line px-1"></i>
                  Halaman Utama
                </Link>
                <Link
                  to={`/code-room/${classId}`}
                  className="text-sm font-semibold">
                  <i class="fa-solid fa-video px-1"></i>
                  Siaran Layar
                </Link>
                <Link
                  to={`/code-room-camera/${classId}`}
                  className="text-sm font-semibold">
                  <i class="fa-solid fa-camera px-1"></i>
                  Kamera
                </Link>
                {/* <Link
                  to={"/realtime-whiteboard"}
                  className="text-sm font-semibold">
                  <FontAwesomeIcon icon={faChalkboard} className="px-1" />
                  Papan tulis interaktif
                </Link>
                <Link
                  to={`/realtime-interaction`}
                  className="text-sm font-semibold">
                  <FontAwesomeIcon icon={faChalkboardUser} className="px-1" />
                  Siswa Interaksi
                </Link> */}

                <div className={`inline-block relative dropdown`}>
                  <button
                    // onClick={() => toggleDropdown("chat")}
                    className="text-sm  font-semibold flex items-center focus:outline-none">
                    <i class="fa-solid fa-comments px-1"></i>
                    Obrolan <i class="fa-solid fa-caret-down ml-1"></i>
                  </button>
                  {/* {chatDropdownOpen && ( */}
                  <ul
                    className={`absolute z-10 dropdown-menu hidden lg:w-48 bg-white rounded-md shadow-lg py-2`}>
                    <li>
                      <Link
                        to={`/group-chat/${classId}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <i class="fa-solid fa-users mr-2"></i>
                        Obrolan Grup
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`/topic-chat/${classId}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <i class="fa-solid fa-comment-dots mr-2"></i> Topik
                        Obrolan
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`/face-to-face-chat/${classId}`}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 whitespace-nowrap hover:bg-gray-100">
                        <i class="fa-solid fa-user-group mr-2"></i> Obrolan
                        Individual
                      </Link>
                    </li>
                  </ul>
                  {/* )} */}
                </div>

                <div className={`inline-block relative dropdown`}>
                  <button
                    // onClick={() => toggleDropdown("response")}
                    className="text-sm font-semibold flex items-center focus:outline-none">
                    <i class="fa-solid fa-ranking-star px-1"></i>
                    Kompetisi Respon <i class="fa-solid fa-caret-down ml-1"></i>
                  </button>
                  {/* {respDropdownOpen && ( */}
                  <div
                    className={`absolute z-10 dropdown-menu hidden lg:w-48 bg-white rounded-md shadow-lg py-2`}>
                    <Link
                      to={`/response-competition/${classId}`}
                      type="button"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <i class="fa-solid fa-medal mr-2"></i>
                      Kompetisi Respon
                    </Link>
                    <Link
                      to={`/questions/${classId}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <i class="fa-solid fa-circle-question mr-2"></i>{" "}
                      Pertanyaan
                    </Link>
                    <Link
                      to={`/multiple-question/${classId}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <i class="fa-solid fa-clipboard-question mr-2"></i>{" "}
                      Pilihan Ganda
                    </Link>
                  </div>
                  {/* // )} */}
                </div>

                <div className={`inline-block relative dropdown`}>
                  <button
                    // onClick={() => toggleDropdown("manage")}
                    className="text-sm font-semibold flex items-center focus:outline-none">
                    <i class="fa-solid fa-list px-1"></i>
                    Kelola Kelas <i class="fa-solid fa-caret-down ml-1"></i>
                  </button>
                  {/* {manageDropdownOpen && ( */}
                  <div
                    className={`fixed dropdown-menu hidden lg:w-48 bg-white rounded-md shadow-lg py-2`}>
                    <Link
                      to={`/manage-class/${classId}`}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 whitespace-nowrap hover:bg-gray-100">
                      <i class="fa-regular fa-rectangle-list mr-2"></i>Kelola
                      Daftar Kelas
                    </Link>
                    <Link
                      to={`/manage-name/${classId}`}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 whitespace-nowrap hover:bg-gray-100">
                      <i class="fa-solid fa-address-book mr-2"></i> Kelola
                      Daftar Nama
                    </Link>
                    <button
                      type="button"
                      onClick={handleSignIn}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <i class="fa-solid fa-users mr-2"></i>
                      Masuk Siswa
                    </button>
                    <Link
                      to={`/signed-information/${classId}`}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <i class="fa-solid fa-list-ol mr-2"></i> Informasi yang
                      Ditandatangani
                    </Link>
                  </div>
                  {/* // )} */}
                </div>
              </div>
            </div>
          </>
        )}

        {userRole === "student" && (
          <>
            <div
              className={`${
                isSidebarOpen ? "block" : "hidden"
              } lg:block lg:flex-grow lg:items-center lg:justify-between lg:mx-36 w-full`}>
              <div className="link flex flex-col lg:flex-row items-start lg:items-center gap-3 text-white py-1 px-1">
                <Link to={"/"} className="text-sm font-semibold">
                  <i class="fa-solid fa-chart-line px-1"></i>
                  Halaman Utama
                </Link>
                <Link
                  to={"/code-room/" + classId}
                  className="text-sm font-semibold">
                  <i class="fa-solid fa-video px-1"></i>
                  Siaran Layar
                </Link>
                <Link
                  to={"/code-room-camera/" + classId}
                  className="text-sm font-semibold">
                  <i class="fa-solid fa-camera px-1"></i>
                  Kamera
                </Link>
                {/* <Link
                  to={"/realtime-whiteboard"}
                  className="text-sm font-semibold">
                  <FontAwesomeIcon icon={faChalkboard} className="px-1" />
                  Papan Gambar
                </Link>
                <Link
                  to={`/realtime-interaction`}
                  className="text-sm font-semibold">
                  <FontAwesomeIcon icon={faUsers} className="px-1" />
                  Interaksi Siswa
                </Link>{" "} */}
                <div className={`inline-block relative dropdown`}>
                  <button
                    // onClick={() => toggleDropdown("response")}
                    className="text-sm font-semibold flex items-center focus:outline-none">
                    <i class="fa-solid fa-ranking-star px-1"></i>
                    Kompetisi Respon <i class="fa-solid fa-caret-down ml-1"></i>
                  </button>
                  {/* {respDropdownOpen && ( */}
                  <div
                    className={`absolute dropdown-menu hidden lg:w-48 bg-white rounded-md shadow-lg py-2 z-1`}>
                    <Link
                      to={`/response-competition/${classId}`}
                      type="button"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <i class="fa-solid fa-medal mr-2"></i>
                      Kompetisi Respon
                    </Link>
                    <Link
                      to={`/question-answer/${classId}`}
                      type="button"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <i class="fa-solid fa-chalkboard-user mr-2"></i>
                      Jawab Pertanyaan
                    </Link>
                  </div>
                  {/* )} */}
                </div>
                <div className={`inline-block relative dropdown`}>
                  <button
                    // onClick={() => toggleDropdown("chat")}
                    className="text-sm  font-semibold flex items-center focus:outline-none">
                    <i class="fa-solid fa-comments px-1"></i>
                    Obrolan <i class="fa-solid fa-caret-down ml-1"></i>
                  </button>
                  {/* {chatDropdownOpen && ( */}
                  <ul
                    className={`absolute dropdown-menu hidden lg:w-48 bg-white rounded-md shadow-lg py-2 z-1`}>
                    <li>
                      <Link
                        to={`/group-chat/${classId}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <i class="fa-solid fa-users mr-2"></i>
                        Obrolan Grup
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`/topic-chat/${classId}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <i class="fa-solid fa-comment-dots mr-2"></i> Topik
                        Obrolan
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`/face-to-face-chat/${classId}`}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 whitespace-nowrap hover:bg-gray-100">
                        <i class="fa-solid fa-user-group mr-2"></i> Obrolan
                        Individual
                      </Link>
                    </li>
                  </ul>
                  {/* )} */}
                </div>
              </div>
            </div>
          </>
        )}

        <div className="sm:relative absolute top-0 right-0 py-3 px-2">
          <div className="profile inline-block relative dropdown">
            <button
              // onClick={() => toggleDropdown("profile")}
              className="flex items-center focus:outline-none">
              <img
                className="h-10 me-6 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="User profile"
              />
            </button>
            {/* {isDropdownOpen && ( */}
            <div className="absolute dropdown-menu hidden right-0 w-48 bg-white rounded-md shadow-lg py-2 z-50">
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 items-center">
                <i class="fa-solid fa-user mr-2"></i> Profil saya
              </Link>
              <button
                onClick={logout}
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
                <i class="fa-regular fa-left-from-bracket mr-2"></i>
                Keluar
              </button>
            </div>
            {/* )} */}
          </div>
        </div>
      </nav>

      <style>
        {`
          .ease-custom {
            transition-timing-function: cubic-bezier(.61,-0.53,.43,1.43);
          }
          .dropdown:hover .dropdown-menu {
            display: block;
            z-index: 1000;
          }
        `}
      </style>

      {showSignIn && <SignInModal onClose={handleCloseSignIn} />}
    </>
  );
}

export default Navbar;
