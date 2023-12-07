"use client";
import React, { useState } from "react";

import Footer from "@/components/Footer";
import Login from "@/components/Login";
import Link from "next/link";

import { signInWithGoogle } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [openModal, setOpenModal] = useState(false);

  const router = useRouter();

  const handleModal = () => {
    console.log(openModal);

    setOpenModal(!openModal);
  };

  const handleSignUp = () => {
    signInWithGoogle().then(() => router.push("/sign-up"));
  };

  return (
    <>
      {openModal ? <Login handleModal={handleModal} /> : null}
      <main className="flex min-h-screen flex-col items-center justify-between">
        <section className="text-gray-400 body-font">
          <div className="container flex px-5 py-24 md:flex-row flex-col items-center">
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10 flex flex-col flex-grow items-center">
              <img
                className="h-120 object-center rounded mb-4"
                alt="Social Verse Logo"
                src="/images/logo_main.png"
              />
            </div>
            <div className="md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:text-left items-center space-y-4">
              <h1 className="text-3xl font-bold text-white mb-4">
                Join Social Verse
              </h1>
              <button
                onClick={handleSignUp}
                className="px-14 w-full py-2 border flex gap-2 border-primary rounded-full text-slate-200 hover:border-secondary hover:text-slate-300 hover:shadow transition duration-150 items-center justify-center"
              >
                <img
                  className="w-4 h-4"
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  loading="lazy"
                  alt="google logo"
                />
                <span>Sign up with Google</span>
              </button>
              <Link
                href="/sign-up"
                className="px-14 w-full py-2 border flex gap-2 bg-blue-500 border-blue-500 rounded-full text-white hover:border-white hover:text-white hover:shadow transition duration-150 items-center justify-center"
              >
                <img
                  className="w-5 h-5"
                  src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/guest-male.png"
                  loading="lazy"
                  alt="account logo"
                />
                <span>Create an account</span>
              </Link>
              <p className="text-xs text-gray-400">
                By signing up, you agree to the Terms of Service and Privacy
                Policy, including Cookie Use.
              </p>
              <div className="w-full pt-20 space-y-2">
                <p className="text-xl text-white font-medium">
                  Already have an account?
                </p>
                <button
                  className="px-14 w-full py-2 border flex gap-2 bg-blue-500 border-blue-500 rounded-full text-white hover:border-white hover:text-white hover:shadow transition duration-150 items-center justify-center"
                  onClick={handleModal}
                >
                  <img
                    className="w-5 h-5"
                    src="https://img.icons8.com/material-outlined/24/FFFFFF/enter-2.png"
                    loading="lazy"
                    alt="log in logo"
                  />
                  Log In
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
