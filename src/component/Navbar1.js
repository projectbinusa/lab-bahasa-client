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
import ObrolanGrup from "./Modal/ObrolanGrub";
import TopikObrolan from "./Modal/TopikObrolan";
import Pertanyaan from "./Modal/Pertanyaan";
import Kompetisi from "./Modal/Kompetisi";
import ScreenBroadcast from "./Modal/ScreenBroadcast";
import FaceToFace from "./Modal/FaceToFace";
import SignInModal from "./Modal/SignInSiswa";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [chatDropdownOpen, setChatDropdownOpen] = useState(false);
  const [respDropdownOpen, setRespDropdownOpen] = useState(false);
  const [manageDropdownOpen, setManageDropdownOpen] = useState(false);
  const [showChatGroup, setShowChatGroup] = useState(false);
  const [showChatGroup1, setShowChatGroup1] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [showFaceToFace, setShowFaceToFace] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const history = useHistory();
  const [showScreenBroadCast, setShowScreenBroadCast] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [userRole, setUserRole] = useState("");

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

  const handleScreenBroadCastClick = () => {
    setShowScreenBroadCast(true);
  };

  const handleCloseScreenBroadcast = () => {
    setShowScreenBroadCast(false);
  };

  const handleObrolanGrupClick = () => {
    setShowChatGroup(true);
  };

  const handleCloseObrolanGrup = () => {
    setShowChatGroup(false);
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

  const handleObrolanGrupClick1 = () => {
    setShowChatGroup1(true);
  };

  const handleCloseObrolanGrup1 = () => {
    setShowChatGroup1(false);
  };

  const handleFaceToFace = () => {
    setShowFaceToFace(true);
  };

  const handleCloseFaceToFace = () => {
    setShowFaceToFace(false);
  };

  const handleQuestions = () => {
    setShowQuestions(true);
  };

  const handleCloseQuestions = () => {
    setShowQuestions(false);
  };

  const handleResponse = () => {
    setShowResponse(true);
  };

  const handleCloseResponse = () => {
    setShowResponse(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className="md:sticky top-0 z-50 w-full bg-green-500 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 lg:flex lg:items-center lg:justify-between">
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
                <Link to="/dashboard" className="text-sm font-semibold">
                  <FontAwesomeIcon icon={faChartLine} className="px-1" />
                  Halaman Utama
                </Link>
                <button
                  onClick={handleScreenBroadCastClick}
                  className="text-sm font-semibold"
                >
                  <FontAwesomeIcon icon={faDisplay} className="px-1" />
                  Siaran Layar
                </button>
                <Link to="/camera" className="text-sm font-semibold">
                  <FontAwesomeIcon icon={faCamera} className="px-1" />
                  Kamera
                </Link>
                <Link to="/whiteboard" className="text-sm font-semibold">
                  <FontAwesomeIcon icon={faChalkboard} className="px-1" />
                  Papan tulis interaktif
                </Link>
                <Link
                  to="/interaction-student"
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
                      } mt-2 lg:w-48 bg-white rounded-md shadow-lg py-2 z-50`}
                    >
                      <button
                        type="button"
                        onClick={handleObrolanGrupClick}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 whitespace-nowrap hover:bg-gray-100"
                      >
                        <FontAwesomeIcon icon={faUsers} className="mr-2" />
                        Obrolan Grup
                      </button>
                      <button
                        type="button"
                        onClick={handleObrolanGrupClick1}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 whitespace-nowrap hover:bg-gray-100"
                      >
                        <FontAwesomeIcon icon={faComments} className="mr-2" />{" "}
                        Topik Obrolan
                      </button>
                      <button
                        type="button"
                        onClick={handleFaceToFace}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 whitespace-nowrap hover:bg-gray-100"
                      >
                        <FontAwesomeIcon
                          icon={faUserFriends}
                          className="mr-2"
                        />{" "}
                        Obrolan Tatap Muka
                      </button>
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
                      } mt-2 lg:w-48 bg-white rounded-md shadow-lg py-2 z-50`}
                    >
                      <button
                        type="button"
                        onClick={handleResponse}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 whitespace-nowrap hover:bg-gray-100"
                      >
                        <FontAwesomeIcon icon={faMedal} className="mr-1" />{" "}
                        Kompetisi Respon
                      </button>
                      <button
                        type="button"
                        onClick={handleQuestions}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 whitespace-nowrap hover:bg-gray-100"
                      >
                        <FontAwesomeIcon icon={faQuestion} className="mr-2" />{" "}
                        Pertanyaan
                      </button>
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
                      } mt-2 lg:w-48 bg-white rounded-md shadow-lg py-2 z-50`}
                    >
                      <Link
                        to="/manage-class"
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 whitespace-nowrap hover:bg-gray-100"
                      >
                        <FontAwesomeIcon icon={faUsers} className="mr-2" />{" "}
                        Kelola Kelas
                      </Link>
                      <Link
                        to="/manage-name"
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
                        to="/signed-information"
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
                <Link to="/dashboard" className="text-sm font-semibold">
                  <FontAwesomeIcon icon={faChartLine} className="px-1" />
                  Halaman Utama
                </Link>
                <button
                  onClick={handleScreenBroadCastClick}
                  className="text-sm font-semibold"
                >
                  <FontAwesomeIcon icon={faDisplay} className="px-1" />
                  Siaran Layar
                </button>
                <Link to="/camera" className="text-sm font-semibold">
                  <FontAwesomeIcon icon={faCamera} className="px-1" />
                  Kamera
                </Link>
                <Link to="/interaction-student" className="text-sm font-semibold">
                  <FontAwesomeIcon icon={faUsers} className="px-1" />
                  Intseraksi Siswa
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
                      } mt-2 lg:w-48 bg-white rounded-md shadow-lg py-2 z-50`}
                    >
                      <button
                        type="button"
                        onClick={handleObrolanGrupClick}
                        className="block px-4 py-2 text-sm text-gray-700 whitespace-nowrap hover:bg-gray-100"
                      >
                        <FontAwesomeIcon icon={faUsers} className="mr-2" />
                        Obrolan Grup
                      </button>
                      <button
                        type="button"
                        onClick={handleObrolanGrupClick1}
                        className="block px-4 py-2 text-sm text-gray-700 whitespace-nowrap hover:bg-gray-100"
                      >
                        <FontAwesomeIcon icon={faComments} className="mr-2" />{" "}
                        Topik Obrolan
                      </button>
                      <button
                        type="button"
                        onClick={handleFaceToFace}
                        className="block px-4 py-2 text-sm text-gray-700 whitespace-nowrap hover:bg-gray-100"
                      >
                        <FontAwesomeIcon
                          icon={faUserFriends}
                          className="mr-2"
                        />{" "}
                        Obrolan Tatap Muka
                      </button>
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
      {showChatGroup && <ObrolanGrup onClose={handleCloseObrolanGrup} />}
      {showChatGroup1 && <TopikObrolan onClose={handleCloseObrolanGrup1} />}
      {showQuestions && <Pertanyaan onClose={handleCloseQuestions} />}
      {showResponse && <Kompetisi onClose={handleCloseResponse} />}
      {showFaceToFace && <FaceToFace onClose={handleCloseFaceToFace} />}
      {showScreenBroadCast && (
        <ScreenBroadcast onClose={handleCloseScreenBroadcast} />
      )}
      {showSignIn && <SignInModal onClose={handleCloseSignIn} />}
    </>
  );
}

export default Navbar;
