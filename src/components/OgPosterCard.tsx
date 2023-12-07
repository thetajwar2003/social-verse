import React, { useState } from "react";

interface OgPosterCardProps {
  user: any;
}

export default function OgPosterCard({ user }: OgPosterCardProps) {
  const [isFollowed, setIsFollowed] = useState(false);

  const toggleFollow = () => {
    setIsFollowed(!isFollowed);
  };
  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-4 flex items-center space-x-4">
      <img
        src={user.profilePicUrl}
        alt="Profile"
        className="h-16 w-16 rounded-full"
      />
      <div className="flex-grow">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-black">{user.username}</h3>
          <button
            onClick={toggleFollow}
            className={`text-white font-bold p-1 rounded ${
              isFollowed
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </button>
        </div>
        <div className="flex space-x-2 mt-2">
          <p className="text-black">Followers: {user.followers}</p>
          <p className="text-black">Following: {user.following}</p>
        </div>
        <p
          className={`text-black mt-2 flex justify-center ${
            user.trendy
              ? "bg-green-100 text-green-800 font-bold p-1 rounded"
              : "bg-red-100 text-red-800 font-bold p-1 rounded"
          }`}
        >
          {user.trendy ? "Trendy" : "Not Trendy"}
        </p>
      </div>
    </div>
  );
}
