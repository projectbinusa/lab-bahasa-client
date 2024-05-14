import React from "react";
// import "../../../css/login.css";
function Login() {
  return (
    <body class="font-mono ">
      {/* <!-- Container --> */}
      <div class="container mx-auto">
        <div class="flex justify-center px-6 my-16">
          {/* <!-- Row --> */}
          <div class="w-full xl:w-3/4 lg:w-11/12 flex">
            {/* <!-- Col --> */}
            <div
              class="w-full h-auto hidden lg:block lg:w-5/6 bg-cover rounded-l-lg"
              style={{
                backgroundImage:
                  " url('https://img.freepik.com/free-vector/profile-interface-concept-illustration_114360-3360.jpg?t=st=1715662478~exp=1715666078~hmac=d78ead5c54d0721c4f7c007da66f71aef3ff0138faaa3cc16f9042adde7faa5a&w=740')",
              }}
            ></div>
            {/* <!-- Col --> */}
            <div class="w-full lg:w-9/12 bg-white p-8 rounded-lg lg:rounded-l-none">
              <h3 class="pt-4 text-2xl text-center">Create an Account!</h3>
              <form class="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                <div class="mb-4 md:mr-2 md:mb-0">
                  <label
                    class="block mb-2 text-sm font-bold text-gray-700"
                    for="firstName"
                  >
                    Email
                  </label>
                  <input
                    class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Email"
                  />
                </div>
                <div class="mb-4 md:mr-2 md:mb-0">
                  <label
                    class="block mb-2 text-sm font-bold text-gray-700"
                    for="password"
                  >
                    Password
                  </label>
                  <input
                    class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="******************"
                  />
                  {/* <p class="text-xs italic text-red-500">
                    Please choose a password.
                  </p> */}
                </div>
                {/* <br /> */}
                <div class="mb-6 text-center">
                  <button
                    class="w-full px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-green-700 focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Register Account
                  </button>
                </div>
                <hr class="mb-6 border-t" />
                <div class="text-center">
                  <a
                    class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    href="/forgotpass"
                  >
                    Forgot Password?
                  </a>
                </div>
                {/* <div class="text-center">
                  <a
                    class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    href="#"
                  >
                    Already have an account? Login!
                  </a>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default Login;
