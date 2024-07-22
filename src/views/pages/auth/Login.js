import axios from "axios";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // Correct import statement
import { API_DUMMY } from "../../../utils/api";
import Swal from "sweetalert2";
import login from "../../../component/Asset/login.png";

function Login() {
  const [showPassword, setShowPassword] = useState(false); // State untuk mengontrol apakah password ditampilkan atau tidak
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(`${API_DUMMY}/api/user/login`, data);

      if (response.status === 200) {
        const userData = response.data.data;

        // Store user data in localStorage
        localStorage.setItem("id", userData.id);
        localStorage.setItem("token", userData.token);
        localStorage.setItem("class_id", userData.class_id);
        localStorage.setItem("role", userData.role);
        localStorage.setItem("name", userData.name);

        // Retrieve role and class_id from localStorage
        const role = localStorage.getItem("role");
        const classId = localStorage.getItem("class_id");

        // Validate if student and class_id is "0"
        if (role === "student" && classId === "0") {
          Swal.fire({
            icon: "error",
            title: "Anda belum memiliki class ID. Silakan hubungi admin.",
            showConfirmButton: false,
            timer: 1500,
          });
          // Clear localStorage for this failed login attempt
          localStorage.removeItem("id");
          localStorage.removeItem("token");
          localStorage.removeItem("class_id");
          localStorage.removeItem("role");
          localStorage.removeItem("name");
          return;
        }

        setShow(false);
        Swal.fire({
          icon: "success",
          title: "Berhasil Login",
          showConfirmButton: false,
          timer: 1500,
        });

        // Logika redirect berdasarkan role user
        if (role === "instructur") {
          navigate("/tabel-class");
        } else if (role === "student") {
          navigate("/tabel-class");
          // setTimeout(() => {
          //   window.location.reload();
          // }, 1500);
        }
      }
    } catch (error) {
      console.error(error);
      setShow(false);
      Swal.fire({
        icon: "error",
        title: "Terjadi kesalahan saat login. Coba lagi nanti.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <body className="font-mono bg-gray-100 h-screen">
      {/* Container */}
      <div className="container mx-auto ">
        <br />
        <br />
        <div className="flex justify-center px-6 my-16">
          {/* Row */}
          <div className="w-full xl:w-3/4 lg:w-11/12 flex justify-between">
            {/* Col */}
            {/* <div className="hidden lg:block rounded-l-lg"> */}
            <img
              style={{ width: "50%" }}
              className="hidden lg:block rounded-l-lg"
              src={login}
              alt=""
            />
            {/* </div> */}
            {/* Col */}
            <div className="w-full lg:w-9/12 bg-white px-3 rounded-lg h-fit lg:rounded-l-none shadow-lg shadow-slate-400">
              <h3 className="pt-4 text-2xl text-center">Login!</h3>
              <form
                onSubmit={handleLogin}
                className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="firstName">
                    Email
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4 md:mr-2 md:mb-0 relative">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="password">
                    Password
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="******************"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer mt-5"
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEye /> : <FaEyeSlash />}{" "}
                  </span>
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="submit">
                    Masuk akun
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <Link
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    to="/forgotpass">
                    Tidak ingat kata sandi?
                  </Link>
                  <br />
                  <Link
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    to="/login-siswa">
                    Login sebagai siswa
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default Login;
