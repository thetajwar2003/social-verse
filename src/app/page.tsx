"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import AuthLayout from "./authLayout";

import MessageCard from "@/components/MessageCard";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/config";
import PostCard from "@/components/PostCard";
import {
  getAllMessages,
  getTopThreeLikedMessages,
  getUserData,
} from "@/lib/firebase/database";
import { DocumentData } from "firebase/firestore";
import { Verse } from "@/types/VerseType";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  const [userData, setUserData] = useState<DocumentData | null>(null);
  const [username, setUsername] = useState("guest");
  const [verses, setVerses] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchMessages = async (userExists: boolean) => {
      try {
        if (userExists) {
          // Supposed to run when user IS logged in
          const allMessages = await getAllMessages();
          setVerses(allMessages);
        } else {
          // Supposed to run when user is NOT logged in
          const topMessages = await getTopThreeLikedMessages();
          setVerses(topMessages);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
      setLoading(false);
    };
    const fetchUserData = async () => {
      try {
        const data = await getUserData(user?.uid!);
        setUserData(data);
        setUsername(data!.username);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle the error as needed
      }
    };

    if (user?.uid) {
      fetchUserData();
      fetchMessages(true);
    } else {
      fetchMessages(false);
    }
  }, [user]);

  return (
    <AuthLayout>
      <div className="flex flex-col h-screen">
        {loading && <LoadingScreen />}
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

            {verses &&
              verses.map((v: Verse, index: number) => (
                <Link
                  href={`/${v.userId}/${v.id}?currentUser=${username}`}
                  key={v.id}
                >
                  <MessageCard verse={v} key={v.id} preview={true} />
                </Link>
              ))}
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
