import {
  faCaretDown,
  faComments,
  faSignOutAlt,
  faUser,
  faUserFriends,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom"; // Assuming you're using react-router for navigation

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [chatDropdownOpen, setChatDropdownOpen] = useState(false);
  const [respDropdownOpen, setRespDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleChatDropdown = () => {
    setChatDropdownOpen(!chatDropdownOpen);
  };

  const toggleRespDropdown = () => {
    setRespDropdownOpen(!respDropdownOpen);
  };

  return (
    <div className="navbar bg-green-500 flex justify-between items-center px-14 py-2 text-white">
      <div className="logo">
        <img
          // src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
          alt="Logo"
          width={60}
        />
      </div>
      <div className="link flex items-center gap-6">
        <p className="text-sm font-semibold">Dashboard</p>
        <p className="text-sm font-semibold">Screen Broadcast</p>
        <p className="text-sm font-semibold">Camera</p>
        <p className="text-sm font-semibold">Interactive Whiteboard</p>
        <p className="text-sm font-semibold">Interaction Student</p>
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
                <FontAwesomeIcon icon={faUsers} className="mr-2" /> Group Chat
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
                <FontAwesomeIcon icon={faUserFriends} className="mr-2" /> Face
                to Face Chat
              </Link>
            </div>
          )}
        </div>
        <p className="text-sm font-semibold">Response Competition</p>
        <p className="text-sm font-semibold">Manage Class</p>
        <p className="text-sm font-semibold">Manage Name List</p>
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
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
