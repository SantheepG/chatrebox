import React, { useState } from "react";

const Login = ({ setUser }) => {
  const [name, setName] = useState("");
  const [alert, setAlert] = useState(false);

  const checkName = () => {
    if (name === "") {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    } else {
      setUser(name);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex justify-center items-center">
      <div className="animate-view-spin-from-left absolute w-60 h-60 rounded-xl bg-indigo-300 -top-5 -left-16 z-0 transform rotate-45 hidden md:block"></div>
      <div className="animate-view-spin-from-right absolute w-48 h-48 rounded-xl bg-indigo-300 -bottom-6 -right-10 transform rotate-12 hidden md:block"></div>
      <div class="animate-slide-down relative py-3 sm:max-w-xl sm:mx-auto">
        <div class="absolute inset-0 bg-gradient-to-b from-purple-200 to-purple-300 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div class="relative bg-white shadow-lg rounded-3xl px-20 py-16">
          <div class="max-w-md mx-auto">
            <div>
              <div className="flex flex-row items-center justify-center h-12 w-full">
                <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    ></path>
                  </svg>
                </div>
                <div className="ml-2 font-bold text-2xl">
                  <span className="text-indigo-500">Chatre</span>
                  <span className="text-gray-500">Box</span>
                </div>
              </div>
            </div>
            <div class="divide-y divide-gray-200">
              <form
                class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
                onSubmit={(e) => {
                  checkName();
                  e.preventDefault();
                }}
              >
                <div class="relative">
                  <div className="">
                    <div className="relative mt-2 mr-1 w-full">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className={` border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0`}
                        placeholder=" "
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <label
                        for="name"
                        className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
                      >
                        Your name
                      </label>
                    </div>
                    <span className="absolute animate-view-content text-xs text-red-500 mt-2">
                      {alert && (
                        <span className="animate-view-content">
                          Enter your name to proceed
                        </span>
                      )}
                    </span>
                  </div>
                </div>
                <div class="relative">
                  <button
                    class="w-full py-2 text-xl text-white bg-purple-400 rounded-lg hover:bg-purple-500 transition-all mt-6"
                    type="submit"
                  >
                    Join
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="animate-view-spin-from-right w-40 h-40 absolute bg-purple-300 rounded-full top-0 right-12 hidden md:block"></div>
      <div className="animate-view-spin-from-left w-20 h-40 absolute bg-purple-300 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block"></div>
    </div>
  );
};

export default Login;
