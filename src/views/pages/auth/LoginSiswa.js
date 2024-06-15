import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function LoginSiswa() {
  const [showPassword, setShowPassword] = useState(false);
  const [requirePassword, setRequirePassword] = useState(false);

  useEffect(() => {
    const verifikasiPassword = localStorage.getItem("verifikasi_password") === 'true';
    setRequirePassword(verifikasiPassword);
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <body class="font-mono ">
      {/* Container */}
      <div class="container mx-auto ">
        <br />
        <br />
        <div class="flex justify-center px-6 my-16">
          {/* Row */}
          <div class="w-full xl:w-3/4 lg:w-11/12 flex">
            {/* Col */}
            <div
              class="w-full h-auto hidden lg:block lg:w-4/5 bg-cover rounded-l-lg"
              style={{
                backgroundImage:
                  " url('https://img.freepik.com/free-vector/profile-interface-concept-illustration_114360-3360.jpg?t=st=1715662478~exp=1715666078~hmac=d78ead5c54d0721c4f7c007da66f71aef3ff0138faaa3cc16f9042adde7faa5a&w=740')",
              }}></div>
            {/* Col */}
            <div class="w-full lg:w-9/12 bg-white p-8 rounded-lg lg:rounded-l-none shadow-lg shadow-slate-400">
              <h3 class="pt-4 text-2xl text-center">Login!</h3>
              <form
                class="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                <div class="mb-4 md:mr-2 md:mb-0">
                  <label
                    class="block mb-2 text-sm font-bold text-gray-700"
                    for="firstName">
                    Email
                  </label>
                  <input
                    class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Email"
                    required
                  />
                </div>
                {requirePassword && (
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="******************"
                      />
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        onClick={togglePasswordVisibility}
                        className="absolute top-4 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600"
                      />
                    </div>
                  </div>
                )}
                <div class="mb-6 text-center">
                  <button
                    class="w-full px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-green-700 focus:outline-none focus:shadow-outline"
                    type="submit">
                    Masuk akun
                  </button>
                </div>
                <hr class="mb-6 border-t" />
                <div class="text-center">
                  <a
                    class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
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