import React, { useState } from "react";
import { API_DUMMY } from "../../../utils/api";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ForgotPass() {
  const [email, setEmail] = useState("");
  const history = useHistory()

  const send_email = async (e) => {
    e.preventDefault();
    let url_hit = `${API_DUMMY}/api/forgot_password`;
    try {
      const response = await axios.post(url_hit, {
        email,
      });
      if (response.status == 200) {
        Swal.fire({
          icon: "success",
          title: "Email pengaturan ulang kata sandi terkirim",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/verify-code")
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <body class="font-mono ">
      {/* <!-- Container --> */}
      <div class="container mx-auto">
        <br />
        <br />
        <div class="flex justify-center px-6 my-12">
          {/* <!-- Row --> */}
          <div class="w-full xl:w-3/4 lg:w-11/12 flex">
            {/* <!-- Col --> */}
            <div
              class="w-full h-auto  hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
              style={{
                backgroundImage:
                  "url('https://img.freepik.com/free-vector/hacker-breaking-lock-get-access-personal-information-computer-isometric_1284-63723.jpg?t=st=1715668915~exp=1715672515~hmac=9773a5d10213c22cc51796519f51bf5b421993274c5f247d2589bf784aebcecb&w=740')",
              }}
            ></div>
            {/* <!-- Col --> */}
            <div class="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none shadow-lg shadow-slate-400">
              <div class="px-8 mb-4 text-center">
                {/* <h3 class="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
                <p class="mb-4 text-sm text-gray-700">
                  We get it, stuff happens. Just enter your email address below
                  and we'll send you a link to reset your password!
                </p> */}
                <h3 class="pt-4 mb-2 text-2xl">Lupa kata sandi Anda?</h3>
                <p class="mb-4 text-sm text-gray-700">
                  Kami mengerti, banyak hal terjadi. Cukup masukkan alamat email
                  Anda di bawah dan kami akan mengirimkan Anda tautan untuk
                  mengatur ulang kata sandi Anda!
                </p>
              </div>
              <form onSubmit={send_email} class="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                <div class="mb-4">
                  <label
                    class="block mb-2 text-sm font-bold text-gray-700"
                    for="email"
                  >
                    Email
                  </label>
                  <input
                    class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Enter Email Address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div class="mb-6 text-center">
                  <button
                    class="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Mengatur Ulang Kata Sandi
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default ForgotPass;
