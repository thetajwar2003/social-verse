"use client";
import React, { useEffect, useState } from "react";
import AuthLayout from "../authLayout";
import LoadingScreen from "@/components/LoadingScreen";
import { Verse } from "@/types/VerseType";
import MessageCard from "@/components/MessageCard";
import Link from "next/link";

import { getTrendyMessages, getUserData } from "@/lib/firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/config";

export default function Trending() {
  const [username, setUsername] = useState("guest");
  const [verses, setVerses] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchMessages = async (userExists: boolean) => {
      try {
        const allMessages = await getTrendyMessages();
        setVerses(allMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
      setLoading(false);
    };
    const fetchUserData = async () => {
      try {
        const data = await getUserData(user?.uid!);
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
        <div className="container mx-auto p-10 flex">
          <section className="flex-grow">
            <div className="text-center pb-4">
              <h1 className="text-4xl font-bold ">Top Trending Verses</h1>
            </div>
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
        </div>
      </div>
    </AuthLayout>
  );
}
