import axios from "axios";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../utils/api";

function LoginSiswa() {
  const [showPassword, setShowPassword] = useState(false);
  const [requirePassword, setRequirePassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const verifikasiPassword = localStorage.getItem("verifikasi_password") === 'true';
    setRequirePassword(verifikasiPassword);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    let data = { email };

    if (password) {
      data.password = password;
    }

    try {
      const response = await axios.post(`${API_DUMMY}/api/student/login`, data);

      if (response.status === 200) {
        const userData = response.data.data;
        localStorage.setItem("id", userData.id);
        localStorage.setItem("token", userData.token);
        localStorage.setItem("class_id", userData.class_id);
        localStorage.setItem("role", userData.role);
        localStorage.setItem("name", userData.name);
        setShow(false);
        Swal.fire({
          icon: "success",
          title: "Berhasil Login",
          showConfirmButton: false,
          timer: 1500,
        });

        // Logika redirect berdasarkan role user dan class_id
        if (userData.role === "instructor") {
          history.push("/tabel-class");
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else if (userData.role === "student") {
          if (userData.class_id === "0") {
            setShow(false);
            Swal.fire({
              icon: "error",
              title: "Anda belum memiliki class ID. Silakan hubungi admin.",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            history.push("/tabel-class");
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <body className="font-mono ">
      {/* Container */}
      <div className="container mx-auto ">
        <br />
        <br />
        <div className="flex justify-center px-6 my-16">
          {/* Row */}
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            {/* Col */}
            <div
              className="w-full h-auto hidden lg:block lg:w-4/5 bg-cover rounded-l-lg"
              style={{
                backgroundImage:
                  " url('https://img.freepik.com/free-vector/profile-interface-concept-illustration_114360-3360.jpg?t=st=1715662478~exp=1715666078~hmac=d78ead5c54d0721c4f7c007da66f71aef3ff0138faaa3cc16f9042adde7faa5a&w=740')",
              }}></div>
            {/* Col */}
            <div className="w-full lg:w-9/12 bg-white p-8 rounded-lg lg:rounded-l-none shadow-lg shadow-slate-400">
              <h3 className="pt-4 text-2xl text-center">Login!</h3>
              <form onSubmit={handleLogin} className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
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
                {requirePassword && (
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="password">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="******************"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        onClick={togglePasswordVisibility}
                        className="absolute top-4 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600"
                      />
                    </div>
                  </div>
                )}
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-green-700 focus:outline-none focus:shadow-outline"
                    type="submit">
                    Masuk akun
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <a
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    href="/forgotpass">
                    Tidak ingat kata sandi?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default LoginSiswa;
