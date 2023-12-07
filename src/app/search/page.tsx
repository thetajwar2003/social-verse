"use client";
import React, { useState } from "react";
import AuthLayout from "../authLayout";
import { searchMessagesByWord } from "@/lib/firebase/database";
import MessageCard from "@/components/MessageCard";

export default function page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const results = await searchMessagesByWord(searchTerm);
      setSearchResults(results);
    } catch (error) {
      console.error("Search failed:", error);
      // Handle error appropriately
    }
    setLoading(false);
  };

  return (
    <AuthLayout>
      <div className="flex justify-center items-top h-screen mt-4">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">
            Search for Users, Keywords, etc.
          </h2>
          <div className="flex justify-center">
            <input
              type="text"
              className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none text-black"
              placeholder="Search for anything"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg ml-4"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
          {/* Display search results */}
          <div>
            {searchResults.map((v, index) => (
              <MessageCard verse={v} key={index} />
            ))}
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
