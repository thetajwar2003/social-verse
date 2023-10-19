import { type } from "os";
import React from "react";

type LoginProps = {
  handleModal: () => void;
};

export default function Login({ handleModal }: LoginProps) {
  return (
    <section className="text-gray-400 body-font absolute inset-0 bg-black">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-row text-center w-full mb-12 justify-around">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-white">
            Sign Into Social Verse
          </h1>
          <button
            type="button"
            className="absolute xs:top-10 top-16 xs:right-10 right-96 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={handleModal}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto justify-center">
          <div className="flex flex-col -m-2 items-center">
            <div className="p-2 w-1/2">
              <div className="relative">
                <label className="leading-7 text-sm text-gray-400">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="elon_musk_lover22"
                  className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>

            <div className="p-2 w-1/2">
              <div className="relative">
                <label className="leading-7 text-sm text-gray-400">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="*********"
                  className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-auto space-y-4">
              <button className="flex mx-auto text-white bg-primary border-0 py-2 px-8 focus:outline-none hover:bg-secondary rounded-full text-lg w-full justify-center items-center">
                <img
                  className="w-5 h-5"
                  src="https://img.icons8.com/material-outlined/24/FFFFFF/enter-2.png"
                  loading="lazy"
                  alt="log in logo"
                />
                Log In
              </button>
              <button className="mx-auto px-8 py-2 border flex gap-2 border-primary rounded-full text-slate-200 hover:border-secondary hover:text-slate-300 hover:shadow transition duration-150 items-center justify-center">
                <img
                  className="w-4 h-4"
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  loading="lazy"
                  alt="google logo"
                />
                Sign up with Google
              </button>
            </div>
            <div className="p-2 w-full pt-8 mt-8 border-t border-gray-800 text-center"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
