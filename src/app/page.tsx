"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import AuthLayout from "./authLayout";

import messages from "../mock/messages.json";
import MessageCard from "@/components/MessageCard";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";
import PostCard from "@/components/PostCard";
import { getUserData } from "@/lib/firebase/database";
import { DocumentData } from "firebase/firestore";

export default function Home() {
  const [userData, setUserData] = useState<DocumentData | null>(null);
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData(user?.uid!);
        setUserData(data); // Set the user data state
        console.log(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle the error as needed
      }
    };

    // Call the function if userId is available
    if (user?.uid!) {
      fetchUserData();
    }
  }, [user]);

  return (
    <AuthLayout>
      <div className="flex flex-col h-screen">
        <main className="container mx-auto p-10 flex">
          <section className="flex-grow">
            <div className="text-center py-4">
              <img
                src="./logo_main.png"
                alt="Social Verse Logo"
                className="h-12 mb-2 mx-auto"
              />
              <h1 className="text-xl font-bold mb-4">Find your verse</h1>
              <p className="text-sm mb-4">
                Discover the endless possibilities of connecting through the
                power of shared stories
              </p>
            </div>

            {/* User post input */}
            {user ? <PostCard userData={userData} /> : null}

            {/* User posts feed */}
            <div className="divide-y">
              {messages.map((m, index) => (
                <MessageCard {...m} key={index} />
              ))}
            </div>
          </section>

          <aside className="w-80 pt-4 pl-4">
            {/* Top 3 Trendy Users */}
            <div className=" rounded-lg mb-4 p-4">
              <h3 className="font-bold text-lg mb-2">Top 3 Trendy Users</h3>
              {/* Add user cards here */}
            </div>

            {/* Suggested Users */}
            <div className=" rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">Suggested Users</h3>
              {/* Add user cards here */}
            </div>
          </aside>
        </main>
      </div>
    </AuthLayout>
  );
}
