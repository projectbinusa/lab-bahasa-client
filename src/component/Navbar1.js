import {
  faCaretDown,
  faComments,
  faListOl,
  faQuestion,
  faSignOutAlt,
  faUser,
  faUserFriends,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [chatDropdownOpen, setChatDropdownOpen] = useState(false);
  const [respDropdownOpen, setRespDropdownOpen] = useState(false);
  const [manageDropdownOpen, setManageDropdownOpen] = useState(false);

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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-green-500 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <a href="" className="flex ms-2 md:me-24">
              <img src="" className="h-11 me-3 text-white" alt="" />
            </a>
          </div>
          <div className="link flex items-center gap-6 text-white">
            <Link to="/dashboard" className="text-sm font-semibold">
              Dashboard
            </Link>
            <Link to="/screen-broadcast" className="text-sm font-semibold">
              Screen Broadcast
            </Link>
            <Link to="/camera" className="text-sm font-semibold">
              Camera
            </Link>
            <Link to="/whiteboard" className="text-sm font-semibold">
              Interactive Whiteboard
            </Link>
            <Link to="/interaction-student" className="text-sm font-semibold">
              Interaction Student
            </Link>
            <div className="relative">
              <button
                onClick={toggleChatDropdown}
                className="text-sm font-semibold flex items-center focus:outline-none"
              >
                Chat <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
              </button>
              {chatDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                  <Link
                    to="/group-chat"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FontAwesomeIcon icon={faUsers} className="mr-2" /> Group
                    Chat
                  </Link>
                  <Link
                    to="/topic-chat"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FontAwesomeIcon icon={faComments} className="mr-2" /> Topic
                    Chat
                  </Link>
                  <Link
                    to="/face-to-face-chat"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FontAwesomeIcon icon={faUserFriends} className="mr-2" />{" "}
                    Face to Face Chat
                  </Link>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={toggleRespDropdown}
                className="text-sm font-semibold flex items-center focus:outline-none"
              >
                Response Competition
                <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
              </button>
              {respDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                  <Link
                    to="/response-competition"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FontAwesomeIcon icon={faQuestion} className="mr-2" />{" "}
                    Questions
                  </Link>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={toggleManageDropdown}
                className="text-sm font-semibold flex items-center focus:outline-none"
              >
                Manage Class
                <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
              </button>
              {manageDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                  <Link
                    to="/manage-class"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FontAwesomeIcon icon={faUsers} className="mr-2" /> Manage
                    Class
                  </Link>
                  <Link
                    to="/manage-name"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FontAwesomeIcon icon={faListOl} className="mr-2" /> Manage
                    Name List
                  </Link>
                  <Link
                    to="/login-siswa"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    Sign In Student
                  </Link>
                </div>
              )}
            </div>
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
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <FontAwesomeIcon icon={faUser} className="mr-2" /> My Profile
                </Link>
                <Link
                  to="/logout"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />{" "}
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
