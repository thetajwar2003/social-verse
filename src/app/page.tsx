"use client";
import { createContext, useState } from "react";

import Link from "next/link";
import AuthLayout from "./authLayout";

import messages from "../mock/messages.json";
import MessageCard from "@/components/MessageCard";
import { signOut } from "@/lib/firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";

export default function Home() {
  const [user] = useAuthState(auth);

  const router = useRouter();
  return (
    <AuthLayout>
      <div className="flex flex-col h-screen">
        <main className="container mx-auto my-8 flex flex-col items-center space-y-6">
          <div className="text-center">
            <div className="mx-auto">
              <img
                src="./logo_main.png"
                alt="Social Verse Logo"
                className="h-28 mb-4 mx-auto"
              />
            </div>
            <h1 className="text-5xl font-bold mb-6 font-Raleway-Bold">
              {" "}
              Find your verse
            </h1>

            <p className="text-lg text-white mb-6">
              Discover the endless possibilities
              <br />
              of connecting through the power of shared stories
            </p>
          </div>

          <div className="mt-80 flex flex-col items-center">
            {user ? (
              <>
                <form
                  className="messageForm mt-8"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <h2 className="text-2xl font-semibold mb-4">
                    Hey {user.displayName}! Share your message with Social
                    Verse!
                  </h2>
                  <input
                    type="text"
                    className="border p-2 w-full text-black"
                    placeholder="Weekend plan?"
                    // value={postText}
                    // onChange={(e) => setPostText(e.target.value)}
                  />
                  <button
                    className="postBtn bg-blue-500 text-white px-4 py-2 mt-4 rounded"
                    disabled={true}
                    // onClick={handlePostSubmit}
                  >
                    Post
                  </button>
                </form>
              </>
            ) : null}

            {/*should only appear when user is logged in*/}
            {messages.map((m, index) => (
              <MessageCard {...m} key={index} />
            ))}
          </div>
        </main>
      </div>
    </AuthLayout>
  );
}
