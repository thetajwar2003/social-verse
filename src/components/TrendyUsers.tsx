import { getTrendyUsers } from "@/lib/firebase/database";
import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import OgPosterCard from "./OgPosterCard";
import LoadingScreen from "./LoadingScreen";

export default function TrendyUsers() {
  const [userData, setUserData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendyUserData = async () => {
      try {
        const data = await getTrendyUsers();
        setUserData(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle the error as needed
      }
    };

    fetchTrendyUserData();
  }, []);

  return (
    <>
      {loading && <LoadingScreen />}
      {userData &&
        userData.map((user: any, index: number) => (
          <OgPosterCard user={user} key={index} />
        ))}
    </>
  );
}
