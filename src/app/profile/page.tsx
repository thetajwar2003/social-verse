"use client";
import Header from "@/components/Header";
import MessageCard from "@/components/MessageCard";
import { auth } from "@/lib/firebase/config";
import Image from "next/image";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import messages from "../../mock/messages.json";
import ProfileDetails from "@/components/ProfileDetails";

export default function ProfilePage() {
  const [user] = useAuthState(auth);
  if (!user) {
    return <div>Please sign in to view this page.</div>;
  }

  const userData = {
    bio: "Let's explore the outdoors together, one snapshot at a time. My passion is photography and would love to collab! #CityExplorer #PhotographyEnthusiast",
    versesCount: 5, // Assuming you have a count for Verses
    followersCount: 50,
    followingCount: 99,
  };

  return (
    <ProfileDetails />
    <div>
      <Header />
      <div className="container mx-auto max-w-4xl p-4">
        {/* Profile Section */}
        <div className="p-6 rounded-lg shadow flex flex-col lg:flex-row items-center">
          <div className="w-40 h-40 overflow-hidden rounded-full mb-4 lg:mb-0 lg:mr-8">
            <Image
              src={user.photoURL || "/default-profile.jpg"} // Fallback to a default image if photoURL is not available
              alt={user.displayName || "Profile"}
              width={160}
              height={160}
              className="object-cover rounded-full"
              layout="intrinsic"
            />
          </div>
          <div className="flex-grow">
            <h2 className="text-2xl font-bold mb-2">{user.displayName}</h2>

            <p className="text-gray-300 mb-4">{userData.bio}</p>

            <div className="flex space-x-6 justify-center lg:justify-start">
              <div className="text-center">
                <span className="text-lg font-semibold">
                  {userData.versesCount}
                </span>

                <span className="block text-sm text-gray-300">Verses</span>

              </div>
              <div className="text-center">
                <span className="text-lg font-semibold">
                  {userData.followersCount}
                </span>

                <span className="block text-sm text-gray-300">Followers</span>

              </div>
              <div className="text-center">
                <span className="text-lg font-semibold">
                  {userData.followingCount}
                </span>

                <span className="block text-sm text-gray-300">Following</span>

              </div>
            </div>
          </div>
        </div>

        {/* Messages Section */}
        {messages.map((message, index) => (
          <MessageCard {...message} key={index} />
        ))}
      </div>
    </div>
  );
}
