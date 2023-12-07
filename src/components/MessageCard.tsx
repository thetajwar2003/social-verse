import React, { useEffect, useState } from "react";
import { Verse } from "@/types/VerseType";
import { useSearchParams } from "next/navigation";
import { updateLikesAndDislikes, updateMessage } from "@/lib/firebase/database";
import { arrayUnion, doc, increment, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

interface MessageCardProps {
  verse: Verse;
  preview?: boolean;
}

function formatMilliseconds(ms: number): string {
  const inputDate = new Date(ms);
  const today = new Date();
  const isToday = inputDate.toDateString() === today.toDateString();
  const displayDate = isToday
    ? inputDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : inputDate.toLocaleDateString();
  return displayDate;
}

export default function MessageCard({
  verse,
  preview = false,
}: MessageCardProps) {
  console.log(verse);
  const [comments, setComments] = useState(verse.comments);
  const [newComment, setNewComment] = useState("");

  const searchParams = useSearchParams();
  const username = searchParams.get("currentUser");
  const guest = username == "guest";

  const handleLikeAndDislikes = async (action: "like" | "dislike") => {
    try {
      await updateLikesAndDislikes(verse.id!, verse.userId, username!, action);
    } catch (error) {
      console.log("Couldn't update likes", error);
    }
  };

  // TODO: add function that will check if the user is alredy in either the liked or the disliked array so they cant dislike again

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    const commentToAdd = {
      username: username!,
      content: newComment,
      postedDate: new Date().getTime(),
    };

    updateMessage(verse.id!, {
      comments: arrayUnion(commentToAdd),
    });
    setComments([...comments, commentToAdd]);
    setNewComment("");
  };

  useEffect(() => {
    setComments(verse.comments);
  }, [verse.comments]);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-4 w-full ">
      <div className="pb-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl text-black font-bold ">{verse.username}</h2>
          <span
            className={`text-sm font-semibold py-1 px-2 rounded-full ${
              verse.trendy
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {verse.trendy ? "Trending" : "Not Trending"}
          </span>
        </div>
        <p className="text-gray-700 text-base mb-2">{verse.content}</p>
        {verse.attachments && (
          <img
            src={verse.attachments}
            alt="attatchment"
            className="w-24 h-24 object-cover mb-4"
          />
        )}
        <div className="flex justify-between items-center ">
          <div className="flex items-center">
            <button
              className="flex items-center mr-2 hover:bg-blue-100 text-gray-500 rounded px-2 py-1"
              disabled={preview || guest}
              onClick={() => handleLikeAndDislikes("like")}
            >
              👍 <span className="ml-1">{verse.likes}</span>
            </button>
            <button
              className="flex items-center mr-2 hover:bg-blue-100 text-gray-500 rounded px-2 py-1"
              disabled={preview || guest}
              onClick={() => handleLikeAndDislikes("dislike")}
            >
              👎 <span className="ml-1">{verse.dislikes}</span>
            </button>
            <button
              className="flex items-center hover:bg-blue-100 text-gray-500 rounded px-2 py-1"
              disabled={preview}
            >
              👁️ <span className="ml-1">{verse.reads / 2}</span>
            </button>
          </div>
          {/* Display the formatted date or time */}
          <span className="text-gray-500 text-sm">
            {formatMilliseconds(verse.postedDate)}
          </span>
        </div>
      </div>
      {!preview && (
        <>
          <div className="px-4">
            <h3 className="text-lg text-black font-bold mb-2">Comments:</h3>
            {comments && comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg mb-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {comment.username}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatMilliseconds(comment.postedDate)}
                    </span>
                  </div>
                  <p className="text-gray-700 mt-1">{comment.content}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </div>
          {!guest && (
            <form
              onSubmit={handleCommentSubmit}
              className="px-4 py-4 border-t-2 border-slate-200 mt-4"
            >
              <input
                className="w-full p-2 text-gray-700 border rounded-lg focus:outline-none"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></input>
              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Comment
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
}
