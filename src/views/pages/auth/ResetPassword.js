import React, { useState } from "react";
import { API_DUMMY } from "../../../utils/api";
import axios from "axios";
import Swal from "sweetalert2";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function ResetPassword() {
  const [new_password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [konfirmPassword, setKonfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const history = useHistory();
  const token = useParams();

  const reset_password = async (e) => {
    e.preventDefault();
    if (new_password != konfirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password dan Konfirmasi Password tidak cocok",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    let url_hit = `${API_DUMMY}/api/reset-password?token=${token.token}`;
    try {
      const response = await axios.post(url_hit, {
        email: email,
        new_password: new_password,
      });
      if (response.status == 200) {
        Swal.fire({
          icon: "success",
          title: "Password berhasil di reset",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <body class="font-mono ">
      {/* <!-- Container --> */}
      <div class="container mb-2">
        <br />
        <br />
        <div class="flex justify-center px-6">
          {/* <!-- Row --> */}
          <div class="w-full xl:w-3/4 lg:w-11/12 flex">
            {/* <!-- Col --> */}
            <div
              class="w-full h-auto  hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
              style={{
                backgroundImage:
                  "url('https://img.freepik.com/free-vector/hacker-breaking-lock-get-access-personal-information-computer-isometric_1284-63723.jpg?t=st=1715668915~exp=1715672515~hmac=9773a5d10213c22cc51796519f51bf5b421993274c5f247d2589bf784aebcecb&w=740')",
              }}></div>
            {/* <!-- Col --> */}
            <div class="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none shadow-lg shadow-slate-400">
              <div class="px-8 mb-4 text-center">
                <h3 class="pt-4 mb-2 text-2xl">Reset Password</h3>
                <p class="mb-4 text-sm text-gray-700">
                  Ganti password baru anda di sini
                </p>
              </div>
              <form
                onSubmit={reset_password}
                class="px-8 pt-6 pb-8 bg-white rounded">
                <div class="mb-4">
                  <label
                    class="block mb-2 text-sm font-bold text-gray-700"
                    for="email">
                    Email
                  </label>
                  <input
                    class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Masukan email anda"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                <div class="mb-4 md:mr-2 md:mb-0 relative">
                    <label
                      class="block mb-2 text-sm font-bold text-gray-700"
                      for="password"
                    >
                      Password
                    </label>
                    <input
                      class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="***************"
                      value={new_password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer mb-7"
                      onClick={() => setShowPassword(!showPassword)} // Mengubah state showPassword ketika ikon diklik
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}{" "}
                      {/* Menampilkan ikon view atau hide password sesuai dengan state showPassword */}
                    </span>
                    <p class="text-xs italic text-red-500">
                    Kata sandi 8 digit huruf
                    </p>
                    <p class="text-xs italic text-red-500 mb-3">besar & kecil</p>
                  </div>
                  <div class="mb-4 md:mr-2 md:mb-0 relative">
                    <label
                      class="block mb-2 text-sm font-bold text-gray-700"
                      for="email">
                      Konfirmasi Password
                    </label>
                    <input
                      class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="***************"
                      required
                      value={konfirmPassword}
                      onChange={(e) => setKonfirmPassword(e.target.value)}
                    />
                    <span
                      class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer mb-7"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}{" "}
                    </span>
                  </div>
                </div>
                  <div class="mb-6 text-center">
                    <button
                      class="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                      type="submit">
                      Reset Password
                    </button>
                  </div>
                <hr class="mb-6 border-t" />
                <div class="text-center">
                  <a
                    class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    href="/forgotpass">
                    Code Kadarluwarsa ?, kirim ulang email anda di forgot password
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

export default ResetPassword;
