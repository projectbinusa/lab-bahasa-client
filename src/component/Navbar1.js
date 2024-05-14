import React, { useState } from "react";
import { Link } from "react-router-dom"; // Assuming you're using react-router for navigation

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="navbar bg-transparent flex justify-between items-center px-32 py-2">
      <div className="logo">
        <img
          // src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
          alt="Logo"
          width={60}
        />
      </div>
      <div className="link flex items-center gap-5">
        <p className="text-lg font-semibold">Screen Broadcast</p>
        <p className="text-lg font-semibold">Net Movie</p>
        <p className="text-lg font-semibold">Camera</p>
        <p className="text-lg font-semibold">Interactive Whiteboard</p>
      </div>
      <div className="profile relative">
        <button onClick={toggleDropdown} className="flex items-center focus:outline-none">
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
              My Profile
            </Link>
            <Link
              to="/logout"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
