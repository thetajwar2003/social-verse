import React, { ChangeEvent, useState, useEffect, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/config";
import { DocumentData } from "firebase/firestore";
import { uploadFile } from "@/lib/firebase/storage";
import { Verse } from "@/types/VerseType";
import { addMessage } from "@/lib/firebase/database";

interface PostCardProps {
  userData: DocumentData | null;
}

export default function PostCard({ userData }: PostCardProps) {
  const [user] = useAuthState(auth);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [postText, setPostText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [verseType, setVerseType] = useState("verse");

  useEffect(() => {
    // When file is set, create a URL for it
    if (file) {
      const url = URL.createObjectURL(file);
      console.log(url);
      setFileUrl(url);

      // Clean up the URL when it's no longer needed
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [file]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files![0];
    if (!selectedFile) return;

    setFile(selectedFile); // Set the file to state
  };

  const triggerFileInput = () => {
    document.getElementById("hiddenFileInput")!.click();
  };

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPostText(event.target.value);
  };

  const handlePost = async () => {
    let firebaseUrl = "";

    if (file) {
      // Assuming uploadFile is an async function
      // Wait for it to complete and get the URL
      firebaseUrl = await uploadFile(file, user?.uid!);
    }

    const postData: Verse = {
      content: postText,
      attachments: firebaseUrl, // Use firebaseUrl here
      likes: 0,
      dislikes: 0,
      trendy: false,
      keywords: [],
      reads: 0,
      username: userData!.username,
      userId: user?.uid!,
      postedDate: Date.now(),
      comments: [],
      usersLiked: [],
      usersDisliked: [],
      verseType: verseType,
    };

    await addMessage(postData);

    setFile(null);
    setPostText("");
    setFileUrl("");
    setVerseType("verse");
  };

  return (
    <div className="bg-black p-4 flex flex-col space-y-4">
      <div className="flex items-center space-x-4">
        <img
          src={user?.photoURL || "default-profile.png"}
          alt="Profile"
          className="rounded-full h-12 w-12"
        />

        <input
          type="text"
          placeholder="Give us your most fire verse!"
          className="flex-1 bg-transparent text-white placeholder-gray-500 border-none outline-none"
          value={postText}
          onChange={handleTextChange}
        />

        {userData && userData!.userType == "CU" && (
          <div className="flex items-center">
            <div className="form-check form-check-inline ml-6">
              <input
                className="form-radio h-5 w-5 text-blue-600"
                type="radio"
                name="verseType"
                id="ad"
                value="ad"
                checked={verseType === "ad"}
                onChange={() => setVerseType("ad")}
              />
              <label className="ml-2 text-gray-700" htmlFor="ad">
                Ad
              </label>
            </div>

            <div className="form-check form-check-inline ml-6">
              <input
                className="form-radio h-5 w-5 text-blue-600"
                type="radio"
                name="verseType"
                id="job"
                value="job"
                checked={verseType === "job"}
                onChange={() => setVerseType("job")}
              />
              <label className="ml-2 text-gray-700" htmlFor="job">
                Job
              </label>
            </div>
          </div>
        )}

        <button onClick={triggerFileInput} className="text-blue-400">
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/material-rounded/24/FFFFFF/image.png"
            alt="image"
          />
        </button>
      </div>

      <input
        id="hiddenFileInput"
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }} // Hide the file input
        accept="image/*,video/*" // Accept both image and video files
      />

      {fileUrl &&
        (file?.type.startsWith("image") ? (
          <img src={fileUrl} alt="Uploaded" className="max-w-full h-auto" />
        ) : (
          <video src={fileUrl} controls className="max-w-full h-auto"></video>
        ))}

      <button
        className="bg-blue-500 text-white rounded-full px-4 py-1 self-start"
        onClick={handlePost}
      >
        Post
      </button>
    </div>
  );
}
