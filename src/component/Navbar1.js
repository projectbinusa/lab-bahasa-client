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
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useModal } from "./Modal/ModalContext";
import ObrolanGrup from "./Modal/ObrolanGrub";
import TopikChat from "../views/pages/Chat/TopikChat";
import TopikObrolan from "./Modal/TopikObrolan";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
import Pertanyaan from "./Modal/Pertanyaan";
import Kompetisi from "./Modal/Kompetisi";
import ScreenBroadcast from "./Modal/ScreenBroadcast";
import SignInModal from "./Modal/SignInSiswa";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [chatDropdownOpen, setChatDropdownOpen] = useState(false);
  const [respDropdownOpen, setRespDropdownOpen] = useState(false);
  const [manageDropdownOpen, setManageDropdownOpen] = useState(false);
  const [showChatGroup, setShowChatGroup] = useState(false);
  const [showChatGroup1, setShowChatGroup1] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const history = useHistory();
  const [showScreenBroadCast, setShowScreenBroadCast] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleChatDropdown = () => {
    setChatDropdownOpen(!chatDropdownOpen);
  };

  const toggleRespDropdown = () => {
    setRespDropdownOpen(!respDropdownOpen);
  };

  const toggleManageDropdown = () => {
    setManageDropdownOpen(!manageDropdownOpen);
  };

  const handleObrolanGrupClick1 = () => {
    setShowChatGroup1(true);
  };

  const handleCloseObrolanGrup1 = () => {
    setShowChatGroup1(false);
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

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-green-500 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <a href="" className="flex ms-2 md:me-24">
                <img src={Logo} className="h-11 me-3 text-white" alt="" />
              </a>
            </div>
            <div className="link flex items-center gap-4 text-white">
              <Link to="/dashboard" className="text-sm font-semibold">
                <FontAwesomeIcon icon={faChartLine} className="px-1" />
                Dasbor
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
              <Link to="/interaction-student" className="text-sm font-semibold">
                <FontAwesomeIcon icon={faChalkboardUser} className="px-1" />
                Siswa Interaksi
              </Link>
              <div className="relative">
                <button
                  onClick={toggleChatDropdown}
                  className="text-sm font-semibold flex items-center focus:outline-none"
                >
                  <FontAwesomeIcon icon={faComments} className="px-1" />
                  Obrolan{" "}
                  <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
                </button>
                {chatDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                    <button
                      type="button"
                      onClick={handleObrolanGrupClick}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FontAwesomeIcon icon={faUsers} className="mr-2" />{" "}
                      Obrolan Grup
                    </button>
                    <button
                      type="button"
                      onClick={handleObrolanGrupClick1}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FontAwesomeIcon icon={faComments} className="mr-2" />{" "}
                      Topik Obrolan
                    </button>
                    {/* <Link
                      to="#"
                      onClick={handleObrolanGrupClick1}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FontAwesomeIcon icon={faComments} className="mr-2" />{" "}
                      Topik Obrolan
                    </Link> */}
                    <Link
                      to="/face-to-face-chat"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FontAwesomeIcon icon={faUserFriends} className="mr-2" />{" "}
                      Obrolan Tatap Muka
                    </Link>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={toggleRespDropdown}
                  className="text-sm font-semibold flex items-center focus:outline-none"
                >
                  <FontAwesomeIcon icon={faMedapps} className="px-1" />
                  Kompetisi Respon
                  <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
                </button>
                {respDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                    <button
                      type="button"
                      onClick={handleResponse}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FontAwesomeIcon icon={faMedal} className="mr-1" />
                      Kompetisi Respon
                    </button>
                    <button
                      type="button"
                      onClick={handleQuestions}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FontAwesomeIcon icon={faQuestion} className="mr-2" />
                      Pertanyaan
                    </button>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={toggleManageDropdown}
                  className="text-sm font-semibold flex items-center focus:outline-none"
                >
                  <FontAwesomeIcon icon={faListCheck} className="px-1" />
                  Kelola Kelas
                  <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
                </button>
                {manageDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                    <Link
                      to="/manage-class"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FontAwesomeIcon icon={faUsers} className="mr-2" /> Kelola
                      Kelas
                    </Link>
                    <Link
                      to="/manage-name"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FontAwesomeIcon icon={faListOl} className="mr-2" />
                      Kelola Daftar Nama
                    </Link>
                    <button
                      type="button"
                      onClick={handleSignIn}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FontAwesomeIcon icon={faUser} className="mr-2" />
                      Masuk Siswa
                    </button>
                    <Link
                      to="/signed-information"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FontAwesomeIcon icon={faCircleInfo} className="mr-2" />
                      Informasi yang Ditandatangani
                    </Link>
                    <Link
                      to="/login-report"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FontAwesomeIcon icon={faKey} className="mr-2" />
                      Login Report
                    </Link>
                  </div>
                )}
              </div>
              <div className="profile relative ml-6">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center focus:outline-none"
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    alt="User profile"
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FontAwesomeIcon icon={faUser} className="mr-2" /> Profil
                      saya
                    </Link>
                    <Link
                      to=""
                      onClick={logout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                      Keluar
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      {showChatGroup && <ObrolanGrup onClose={handleCloseObrolanGrup} />}
      {showChatGroup1 && <TopikObrolan onClose={handleCloseObrolanGrup1} />}
      {showQuestions && <Pertanyaan onClose={handleCloseQuestions} />}
      {showResponse && <Kompetisi onClose={handleCloseResponse} />}
      {showScreenBroadCast && (
        <ScreenBroadcast onClose={handleCloseScreenBroadcast} />
      )}
      {showSignIn && <SignInModal onClose={handleCloseSignIn} />}
    </>
  );
}

export default Navbar;
