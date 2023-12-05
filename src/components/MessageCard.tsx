import React from "react";

interface MessageCardProps {
  authorID: string;
  content: string;
  likes: number;
  dislikes: number;
  reads: string;
  trendy: boolean;
  postedDate: string; // Assume this is an ISO string for simplicity
}

export default function MessageCard({
  authorID,
  content,
  likes,
  dislikes,
  reads,
  trendy,
  postedDate,
}: MessageCardProps) {
  // Create a Date object from the postedDate string
  const postedDateTime = new Date(postedDate);
  const today = new Date();

  // Format the date or time depending on if it's today or not
  const isToday = postedDateTime.toDateString() === today.toDateString();
  const displayDate = isToday
    ? postedDateTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : postedDateTime.toLocaleDateString();

  return (
    <div className="bg-white shadow-md rounded-lg p-6 m-4 w-full ">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl text-black font-bold ">{authorID}</h2>
        <span
          className={`text-sm font-semibold py-1 px-2 rounded-full ${
            trendy ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {trendy ? "Trending" : "Not Trending"}
        </span>
      </div>
      <p className="text-gray-700 text-base mb-4">{content}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <button className="flex items-center mr-2 hover:bg-blue-100 text-gray-500 rounded px-2 py-1">
            👍 <span className="ml-1">{likes}</span>
          </button>
          <button className="flex items-center mr-2 hover:bg-blue-100 text-gray-500 rounded px-2 py-1">
            👎 <span className="ml-1">{dislikes}</span>
          </button>
          <button className="flex items-center hover:bg-blue-100 text-gray-500 rounded px-2 py-1">
            👁️ <span className="ml-1">{reads}</span>
          </button>
        </div>
        {/* Display the formatted date or time */}
        <span className="text-gray-500 text-sm">{displayDate}</span>
      </div>
    </div>
  );
}
