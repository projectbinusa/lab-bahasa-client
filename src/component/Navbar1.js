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
import Questions from "../views/pages/response/Questions";
import ResponseCompetition from "../views/pages/response/ResponseCompetition";
import TopikChat from "../views/pages/Chat/TopikChat";
import TopikObrolan from "./Modal/TopikObrolan";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [chatDropdownOpen, setChatDropdownOpen] = useState(false);
  const [respDropdownOpen, setRespDropdownOpen] = useState(false);
  const [manageDropdownOpen, setManageDropdownOpen] = useState(false);
  const [isModalQuestion, setIsModalQuestion] = useState(false);
  const [isModalResponse, setIsModalResponse] = useState(false);
  const [showChatGroup, setShowChatGroup] = useState(false);
  const [showChatGroup1, setShowChatGroup1] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const history = useHistory();

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

  const toggleModalQuestion = () => {
    setIsModalQuestion(!isModalQuestion);
  };

  const toggleModalResponse = () => {
    setIsModalResponse(!isModalResponse);
  };

  const handleObrolanGrupClick1 = () => {
    setShowChatGroup1(true);
  };

  const handleCloseObrolanGrup1 = () => {
    setShowChatGroup1(false);
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
              <Link to="/screen-broadcast" className="text-sm font-semibold">
                <FontAwesomeIcon icon={faDisplay} className="px-1" />
                Siaran Layar
              </Link>
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
                  className="text-sm font-semibold flex items-center focus:outline-none">
                  <FontAwesomeIcon icon={faComments} className="px-1" />
                  Obrolan{" "}
                  <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
                </button>
                {chatDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                    <button
                      type="button"
                      onClick={handleObrolanGrupClick}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <FontAwesomeIcon icon={faUsers} className="mr-2" />{" "}
                      Obrolan Grup
                    </button>
                    <button
                      type="button"
                      onClick={handleObrolanGrupClick1}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
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
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <FontAwesomeIcon icon={faUserFriends} className="mr-2" />{" "}
                      Obrolan Tatap Muka
                    </Link>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={toggleRespDropdown}
                  className="text-sm font-semibold flex items-center focus:outline-none">
                  <FontAwesomeIcon icon={faMedapps} className="px-1" />
                  Kompetisi Respon
                  <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
                </button>
                {respDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                    <Link
                      to="/response-competition"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <FontAwesomeIcon icon={faMedal} className="mr-1" />
                      Kompetisi Respon{" "}
                    </Link>
                    <Link
                      to="/questions"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <FontAwesomeIcon icon={faQuestion} className="mr-2" />
                      Pertanyaan
                    </Link>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={toggleManageDropdown}
                  className="text-sm font-semibold flex items-center focus:outline-none">
                  <FontAwesomeIcon icon={faListCheck} className="px-1" />
                  Kelola Kelas
                  <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
                </button>
                {manageDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                    <Link
                      to="/manage-class"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <FontAwesomeIcon icon={faUsers} className="mr-2" /> Kelola
                      Kelas
                    </Link>
                    <Link
                      to="/manage-name"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <FontAwesomeIcon icon={faListOl} className="mr-2" />
                      Kelola Daftar Nama
                    </Link>
                    <Link
                      to="/login-siswa"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <FontAwesomeIcon icon={faUser} className="mr-2" />
                      Masuk Siswa
                    </Link>
                    <Link
                      to="/signed-information"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <FontAwesomeIcon icon={faCircleInfo} className="mr-2" />
                      Informasi yang Ditandatangani
                    </Link>
                  </div>
                )}
              </div>
              <div className="profile relative ml-6">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center focus:outline-none">
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
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <FontAwesomeIcon icon={faUser} className="mr-2" /> Profil
                      saya
                    </Link>
                    <Link
                      to=""
                      onClick={logout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                      Keluar
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {isModalQuestion && (
          <QuestionsModal toggleModalQuestion={toggleModalQuestion} />
        )}
        {isModalResponse && (
          <ResponseModal toggleModalResponse={toggleModalResponse} />
        )}
      </nav>
      {showChatGroup && <ObrolanGrup onClose={handleCloseObrolanGrup} />}
      {showChatGroup1 && <TopikObrolan onClose={handleCloseObrolanGrup1} />}
    </>
  );
}

function QuestionsModal({ toggleModalQuestion }) {
  const [width, setWidth] = useState(0.7 * window.innerWidth);
  const [height, setHeight] = useState(0.9 * window.innerHeight);

  const handleResize = (event, { size }) => {
    setWidth(size.width);
    setHeight(size.height);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* <Draggable handle=".handle">
        <div className="relative">
          <ResizableBox
            width={width}
            height={height}
            minConstraints={[300, 300]}
            maxConstraints={[window.innerWidth, window.innerHeight]}
            onResize={handleResize}
            className="bg-white p-8 rounded-lg shadow-lg overflow-hidden"
          >
            <h2 className="text-xl font-semibold mb-4">Pertanyaan</h2>
            <div className="handle cursor-move p-2 bg-gray-200 rounded-t-lg"></div>
            <div className="h-[80%] overflow-auto">
              <Questions />
            </div>
            <button
              onClick={toggleModalQuestion}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Tutup
            </button>
          </ResizableBox>
        </div>
      </Draggable> */}
    </div>
  );
}

function ResponseModal({ toggleModalResponse }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[70%] h-[90%]">
        <h2 className="text-xl font-semibold mb-4">Kompetisi Respon</h2>
        <div className="h-[80%] overflow-auto">
          <ResponseCompetition />
        </div>
        <button
          onClick={toggleModalResponse}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Tutup
        </button>
      </div>
    </div>
  );
}

export default Navbar;
