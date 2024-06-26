import { faMedapps } from "@fortawesome/free-brands-svg-icons";
import Logo from "../component/Asset/programmer.png";
import {
  faCamera,
  faCaretDown,
  faChalkboard,
  faChalkboardUser,
  faChartLine,
  faCircleInfo,
  faComments,
  faDisplay,
  faKey,
  faListCheck,
  faListOl,
  faMedal,
  faQuestion,
  faSignOutAlt,
  faUser,
  faUserFriends,
  faUsers,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
import SignInModal from "./Modal/SignInSiswa";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [chatDropdownOpen, setChatDropdownOpen] = useState(false);
  const [respDropdownOpen, setRespDropdownOpen] = useState(false);
  const [manageDropdownOpen, setManageDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const history = useHistory();
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
    history.push("/");
    localStorage.clear();
    Swal.fire({
      icon: "success",
      title: "Berhasil logout.",
      showConfirmButton: false,
      timer: 1500,
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
      <nav className="md:sticky top-0 z-1 w-full bg-green-500 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 lg:flex lg:items-center lg:justify-between">
        <div className="px-3 py-3 lg:px-5 lg:pl-3 flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button onClick={toggleSidebar} className="text-white lg:hidden">
              <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
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
              } lg:block lg:flex-grow lg:items-center lg:justify-between lg:mx-36 w-full`}
            >
              <div className="link flex flex-col lg:flex-row items-start lg:items-center gap-3 text-white py-1 px-1">
                <Link
                  to={`/dashboard/${classId}`}
                  className="text-sm font-semibold"
                >
                  <FontAwesomeIcon icon={faChartLine} className="px-1" />
                  Halaman Utama
                </Link>
                <Link
                  to={`/code-room/${classId}`}
                  className="text-sm font-semibold"
                >
                  <FontAwesomeIcon icon={faDisplay} className="px-1" />
                  Siaran Layar
                </Link>
                <Link
                  to={`/code-room-camera/${classId}`}
                  className="text-sm font-semibold"
                >
                  <FontAwesomeIcon icon={faCamera} className="px-1" />
                  Kamera
                </Link>
                <Link
                  to={`/whiteboard/${classId}`}
                  className="text-sm font-semibold"
                >
                  <FontAwesomeIcon icon={faChalkboard} className="px-1" />
                  Papan tulis interaktif
                </Link>
                <Link
                  to={`/interaction-student/${classId}`}
                  className="text-sm font-semibold"
                >
                  <FontAwesomeIcon icon={faChalkboardUser} className="px-1" />
                  Siswa Interaksi
                </Link>

                <div className={`relative ${isSidebarOpen ? "ml-0" : ""}`}>
                  <button
                    onClick={() => toggleDropdown("chat")}
                    className="text-sm font-semibold flex items-center focus:outline-none"
                  >
                    <FontAwesomeIcon icon={faComments} className="px-1" />
                    Obrolan{" "}
                    <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
                  </button>
                  {chatDropdownOpen && (
                    <div
                      className={`absolute ${
                        isSidebarOpen
                          ? "left-full ml-2"
                          : "top-full right-0 mr-2"
                      } mt-2 lg:w-48 bg-white rounded-md shadow-lg py-2 z-1`}
                    >
                      <Link
                        to={`/group-chat/${classId}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FontAwesomeIcon icon={faUsers} className="mr-2" />
                        Obrolan Grup
                      </Link>
                      <Link
                        to={`/topic-chat/${classId}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FontAwesomeIcon icon={faComments} className="mr-2" />{" "}
                        Topik Obrolan
                      </Link>
                      <Link
                        to={`/face-to-face-chat/${classId}`}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 whitespace-nowrap hover:bg-gray-100"
                      >
                        <FontAwesomeIcon
                          icon={faUserFriends}
                          className="mr-2"
                        />{" "}
                        Obrolan Tatap Muka
                      </Link>
                    </div>
                  )}
                </div>

                <div className={`relative ${isSidebarOpen ? "ml-0" : ""}`}>
                  <button
                    onClick={() => toggleDropdown("response")}
                    className="text-sm font-semibold flex items-center focus:outline-none"
                  >
                    <FontAwesomeIcon icon={faMedapps} className="px-1" />
                    Kompetisi Respon{" "}
                    <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
                  </button>
                  {respDropdownOpen && (
                    <div
                      className={`absolute ${
                        isSidebarOpen
                          ? "left-full ml-2"
                          : "top-full right-0 mr-2"
                      } mt-2 lg:w-48 bg-white rounded-md shadow-lg py-2 z-1`}
                    >
                      <Link
                        to={`/response-competition/${classId}`}
                        type="button"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FontAwesomeIcon icon={faMedal} className="mr-1" />
                        Kompetisi Respon
                      </Link>
                      <Link
                        to={`/questions/${classId}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FontAwesomeIcon icon={faQuestion} className="mr-2" />{" "}
                        Pertanyaan
                      </Link>
                    </div>
                  )}
                </div>

                <div className={`relative ${isSidebarOpen ? "ml-0" : ""}`}>
                  <button
                    onClick={() => toggleDropdown("manage")}
                    className="text-sm font-semibold flex items-center focus:outline-none"
                  >
                    <FontAwesomeIcon icon={faListCheck} className="px-1" />
                    Kelola Kelas{" "}
                    <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
                  </button>
                  {manageDropdownOpen && (
                    <div
                      className={`absolute ${
                        isSidebarOpen
                          ? "left-full ml-2"
                          : "top-full right-0 mr-2"
                      } mt-2 lg:w-48 bg-white rounded-md shadow-lg py-2 z-1`}
                    >
                      {/* <Link
                        to="/manage-class/
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 whitespace-nowrap hover:bg-gray-100">
                        <FontAwesomeIcon icon={faUsers} className="mr-2" />{" "}
                        Kelola Kelas
                      </Link> */}
                      <Link
                        to={`/manage-name/${classId}`}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 whitespace-nowrap hover:bg-gray-100"
                      >
                        <FontAwesomeIcon icon={faListOl} className="mr-2" />{" "}
                        Kelola Daftar Nama
                      </Link>
                      <button
                        type="button"
                        onClick={handleSignIn}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FontAwesomeIcon icon={faUser} className="mr-2" />
                        Masuk Siswa
                      </button>
                      <Link
                        to={`/signed-information/${classId}`}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FontAwesomeIcon icon={faCircleInfo} className="mr-2" />{" "}
                        Informasi yang Ditandatangani
                      </Link>
                    </div>
                  )}
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
              } lg:block lg:flex-grow lg:items-center lg:justify-between lg:ml-80 w-full`}
            >
              <div className="link flex flex-col lg:flex-row items-start lg:items-center gap-3 text-white p-3 lg:p-0">
                <Link
                  to={"/dashboard/" + classId}
                  className="text-sm font-semibold"
                >
                  <FontAwesomeIcon icon={faChartLine} className="px-1" />
                  Halaman Utama
                </Link>
                <Link
                  to={"/code-room/" + classId}
                  className="text-sm font-semibold"
                >
                  <FontAwesomeIcon icon={faDisplay} className="px-1" />
                  Siaran Layar
                </Link>
                <Link
                  to={"/code-room-camera/" + classId}
                  className="text-sm font-semibold"
                >
                  <FontAwesomeIcon icon={faCamera} className="px-1" />
                  Kamera
                </Link>
                <Link
                  to={"/interaction-student/" + classId}
                  className="text-sm font-semibold"
                >
                  <FontAwesomeIcon icon={faUsers} className="px-1" />
                  Interaksi Siswa
                </Link>{" "}
                <div className={`relative ${isSidebarOpen ? "ml-0" : ""}`}>
                  <button
                    onClick={() => toggleDropdown("response")}
                    className="text-sm font-semibold flex items-center focus:outline-none"
                  >
                    <FontAwesomeIcon icon={faMedapps} className="px-1" />
                    Kompetisi Respon{" "}
                    <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
                  </button>
                  {respDropdownOpen && (
                    <div
                      className={`absolute ${
                        isSidebarOpen
                          ? "left-full ml-2"
                          : "top-full right-0 mr-2"
                      } mt-2 lg:w-48 bg-white rounded-md shadow-lg py-2 z-1`}
                    >
                      <Link
                        to={`/response-competition/${classId}`}
                        type="button"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FontAwesomeIcon icon={faMedal} className="mr-1" />
                        Kompetisi Respon
                      </Link>
                      <Link
                        to={"/question-answer/" + classId}
                        type="button"
                        className="lock px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FontAwesomeIcon icon={faUsers} className="px-1" />
                        Question answer
                      </Link>
                    </div>
                  )}
                </div>
                <div className={`relative ${isSidebarOpen ? "ml-0" : ""}`}>
                  <button
                    onClick={() => toggleDropdown("chat")}
                    className="text-sm font-semibold flex items-center focus:outline-none"
                  >
                    <FontAwesomeIcon icon={faComments} className="px-1" />
                    Obrolan{" "}
                    <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
                  </button>
                  {chatDropdownOpen && (
                    <div
                      className={`absolute ${
                        isSidebarOpen
                          ? "left-full ml-2"
                          : "top-full right-0 mr-2"
                      } mt-2 lg:w-48 bg-white rounded-md shadow-lg py-2 z-50`}
                    >
                      <Link
                        to={"/group-chat/" + classId}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FontAwesomeIcon icon={faUsers} className="mr-2" />
                        Obrolan Grup
                      </Link>
                      <Link
                        to={"/topic-chat/" + classId}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FontAwesomeIcon icon={faComments} className="mr-2" />{" "}
                        Topik Obrolan
                      </Link>
                      <Link
                        to={"/face-to-face-chat/" + classId}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 whitespace-nowrap hover:bg-gray-100"
                      >
                        <FontAwesomeIcon
                          icon={faUserFriends}
                          className="mr-2"
                        />{" "}
                        Obrolan Tatap Muka
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        <div className="sm:relative absolute top-0 right-0 py-3 px-2">
          <div className="profile">
            <button
              onClick={() => toggleDropdown("profile")}
              className="flex items-center focus:outline-none"
            >
              <img
                className="h-10 me-6 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="User profile"
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 items-center"
                >
                  <FontAwesomeIcon icon={faUser} className="mr-2" /> Profil saya
                </Link>
                <Link
                  to=""
                  onClick={logout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 items-center"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  Keluar
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {showSignIn && <SignInModal onClose={handleCloseSignIn} />}
    </>
  );
}

export default Navbar;
