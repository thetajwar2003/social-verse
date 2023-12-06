"use client";
import React, { useEffect, ChangeEvent, FormEvent, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/config";
import { addUser } from "@/lib/firebase/database";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const [user] = useAuthState(auth);

  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    dob: "",
    bio: "",
    profilePicUrl: "",
    name: "",
    email: "",
    isCorporateUser: false,
    // Additional fields as needed
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: "",
        dob: "",
        bio: "",
        profilePicUrl: user.photoURL!,
        name: user?.displayName!,
        email: user?.email!,
        isCorporateUser: false,
      });
      console.log(user);
    }
  }, [user]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = {
      ...formData,
      followers: 0,
      following: 0,
      trendy: false,
      verses: [],
      trendyVerses: 0,
      tips: 0,
      totalLike: 0,
      totalDislikes: 0,
      warnings: 0,
      userType: formData.isCorporateUser ? "CU" : "OU",
    };

    console.log(userData);
    // Handle the form submission, like sending data to a server

    await addUser(userData, user?.uid!);

    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <label className="block">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        defaultValue={user?.displayName!}
        className="block w-full p-2 border rounded-md text-black"
        disabled
      />

      <label className="block">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        defaultValue={formData.email!}
        className="block w-full p-2 border rounded-md text-black"
        disabled
      />

      <label className="block">Date of Birth</label>
      <input
        type="date"
        id="dob"
        name="dob"
        placeholder="MM/DD/YYYY"
        onChange={handleChange}
        className="block w-full p-2 border rounded-md text-black"
      />

      <label className="block">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="Username"
        onChange={handleChange}
        className="block w-full p-2 border rounded-md text-black"
      />

      <label className="block">Bio</label>
      <textarea
        id="bio"
        name="bio"
        placeholder="Tell us about yourself"
        onChange={handleChange}
        className="block w-full p-2 border rounded-md text-black"
      />

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isCorporateUser"
          name="isCorporateUser"
          onChange={(e) =>
            setFormData({ ...formData, isCorporateUser: e.target.checked })
          }
        />
        <label>Corporate User?</label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Sign Up
      </button>
    </form>
  );
}
