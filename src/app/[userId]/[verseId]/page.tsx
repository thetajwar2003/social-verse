"use client";
import AuthLayout from "@/app/authLayout";
import LoadingScreen from "@/components/LoadingScreen";
import MessageCard from "@/components/MessageCard";
import OgPosterCard from "@/components/OgPosterCard";
import {
  deleteUserVerse,
  getMessage,
  getSpecificUserData,
  updateMessage,
  updateUser,
} from "@/lib/firebase/database";
import { DocumentData, increment } from "firebase/firestore";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function VersePage() {
  const pathname = usePathname();
  const [poster, setPoster] = useState<DocumentData | null>(null);
  const [verse, setVerse] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [incrementInitialized, setIncrementInitialized] = useState(false);

  const searchParams = useSearchParams();
  const userType = searchParams.get("userType");

  useEffect(() => {
    const pathSegments = pathname.split("/").filter(Boolean);
    if (pathSegments.length >= 2) {
      const userId = pathSegments[0];
      const verseId = pathSegments[1];

      const fetchData = async () => {
        try {
          if (!incrementInitialized) {
            await updateMessage(verseId, {
              reads: increment(1),
            });
            setIncrementInitialized(true);
          }
          const [currentVerse, ogPoster] = await Promise.all([
            getMessage(verseId),
            getSpecificUserData(userId),
          ]);

          setVerse(currentVerse);
          setPoster(ogPoster);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [pathname]);

  useEffect(() => {
    const updateTrendy = async () => {
      await updateMessage(verse.id, {
        trendy: (verse.reads + 2) / 2 > 10,
      });
    };

    updateTrendy();
  }, [verse]);

  const handleDelete = async () => {
    try {
      const deleted = await deleteUserVerse(verse.userId, verse.id);
      console.log(deleted);
    } catch (error) {
      console.log(error);
    }
  };

  const handleWarn = async () => {
    try {
      await updateUser(verse.userId, { warnings: increment(1) });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthLayout>
      {loading && <LoadingScreen />}
      <div className="container mx-auto flex p-6">
        <div className="w-2/6 pr-2">
          {poster && <OgPosterCard user={poster} />}
          <button
            className="w-full mb-2 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
            onClick={handleWarn}
          >
            Complain
          </button>
          {userType == "SU" && (
            <button
              className="w-full mb-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
              onClick={handleDelete}
            >
              Delete Post
            </button>
          )}
        </div>
        <div className="w-4/6 flex-grow pr-4">
          {verse && <MessageCard verse={verse} />}
        </div>
      </div>
    </AuthLayout>
  );
}
