"use client";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";
import Header from "@/components/Header";
import MessageCard from "@/components/MessageCard";
import { auth } from "@/lib/firebase/config";

import { getMessagesByUserId, getUserData } from "@/lib/firebase/database";
import { DocumentData } from "firebase/firestore";

export default function ProfilePage() {
  const [user] = useAuthState(auth);
  const [userMessages, setUserMessages] = useState<any[]>([]);
  const [userData, setUserData] = useState<DocumentData | null>(null);

  const trendy = userData?.trendy; // Replace with actual condition or data check
  const warningCount = userData?.warnings;

  useEffect(() => {
    const fetchUserDataAndMessages = async () => {
      if (user) {
        try {
          const data = await getUserData(user.uid);
          setUserData(data);

          const messages: any = await getMessagesByUserId(user.uid);
          setUserMessages(messages);
          console.log(messages);
        } catch (error) {
          console.error("Error fetching data:", error);
          // Handle the error as needed
        }
      }
    };
    fetchUserDataAndMessages();
  }, [user]);

  if (!user) {
    return <div>Please sign in to view this page.</div>;
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto max-w-4xl p-4">
        {/* Profile Section */}
        <div className="p-6 rounded-lg shadow flex flex-col lg:flex-row items-center">
          <div className="w-40 h-40 overflow-hidden rounded-full mb-4 lg:mb-0 lg:mr-8">
            <Image
              src={user.photoURL || "/default-profile.jpg"}
              alt={user.displayName || "Profile"}
              width={160}
              height={160}
              className="object-cover rounded-full"
              layout="intrinsic"
            />
          </div>
          <div className="flex-grow">
            <h2 className="text-2xl font-bold mb-2">{user.displayName}</h2>
            <p className="text-gray-300 mb-4">{userData?.bio}</p>

            <div className="flex space-x-6 justify-center lg:justify-start">
              {/* Safely access userData properties with optional chaining and nullish coalescing */}
              <div className="text-center">
                <span className="text-lg font-semibold">
                  {userData?.verses.length ?? "N/A"}
                </span>
                <span className="block text-sm text-gray-300">Verses</span>
              </div>
              <div className="text-center">
                <span className="text-lg font-semibold">
                  {userData?.followers ?? "N/A"}
                </span>
                <span className="block text-sm text-gray-300">Followers</span>
              </div>
              <div className="text-center">
                <span className="text-lg font-semibold">
                  {userData?.following ?? "N/A"}
                </span>
                <span className="block text-sm text-gray-300">Following</span>
              </div>
            </div>
            <div className="mt-4">
              {trendy && (
                <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                  Trendy
                </span>
              )}
              {warningCount > 0 && (
                <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                  Warnings: {warningCount}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Messages Section */}
        {userMessages.map((message: any, index: number) => (
          <MessageCard verse={message} key={index} />
        ))}
      </div>
    </div>
  );
}
