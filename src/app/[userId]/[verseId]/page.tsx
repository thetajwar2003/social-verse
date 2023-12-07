"use client";
import AuthLayout from "@/app/authLayout";
import LoadingScreen from "@/components/LoadingScreen";
import MessageCard from "@/components/MessageCard";
import OgPosterCard from "@/components/OgPosterCard";
import {
  getMessage,
  getSpecificUserData,
  updateMessage,
} from "@/lib/firebase/database";
import { DocumentData, increment } from "firebase/firestore";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function VersePage() {
  const pathname = usePathname();
  const [poster, setPoster] = useState<DocumentData | null>(null);
  const [verse, setVerse] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [incrementInitialized, setIncrementInitialized] = useState(false);

  useEffect(() => {
    const pathSegments = pathname.split("/").filter(Boolean);
    if (pathSegments.length >= 2) {
      const userId = pathSegments[0];
      const verseId = pathSegments[1];

      const fetchData = async () => {
        try {
          if (!incrementInitialized) {
            console.log("here");
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

    // return () => setIncrementInitialized(false);
  }, [pathname]);
  return (
    <AuthLayout>
      {loading && <LoadingScreen />}
      <div className="container mx-auto flex p-6">
        <div className="w-2/6 pr-2">
          {poster && <OgPosterCard user={poster} />}
        </div>
        <div className="w-4/6 flex-grow pr-4">
          {verse && <MessageCard verse={verse} />}
        </div>
      </div>
    </AuthLayout>
  );
}
