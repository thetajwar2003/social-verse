"use client";
import React, { useState } from "react";

export default function page() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = () => {
    // TODO: Implement the search functionality or call an API
    console.log("Search for:", searchTerm);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">
          Search for Users, Keywords, etc.
        </h2>
        <div className="flex justify-center">
          <input
            type="text"
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            placeholder="Enter your search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg ml-4"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
