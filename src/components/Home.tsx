"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import "../../styles.css";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import firebaseConfig from '../../firebase'; 
import app from '../../firebase';
import db from '../../firebase';


const Home: React.FC = () => {

  {/* Update firestore db with a new post */}
  const [postText, setPostText] = useState('');

  const handlePostSubmit = async () => {
    try {
      const postDocRef = await addDoc(collection(db, 'posts'), {
        text: postText,
        timestamp: new Date(),
      });
      console.log('Post added with ID:', postDocRef.id);

      // Clear the input field after submission
      setPostText('');
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <header className="bg-white text-white w-full py-4">
        <Navbar />
      </header>
      <main className="container mx-auto my-8 flex flex-col items-center space-y-6">
        <div className="text-center">
          <div className="mx-auto">
            <img
              src="./images/logo_main.png"
              alt="Social Verse Logo"
              className="h-28 mb-4 mx-auto"
            />
          </div>
          <h1 className="text-5xl font-bold mb-6 font-Raleway-Bold">
            {" "}
      
            Find your verse
          </h1>

          <p className="text-lg text-white mb-6">
            Discover the endless possibilities
            <br />
            of connecting through the power of shared stories
          </p>
        </div>

        {/*should only appear when user is not logged in*/}
        <div className="mb-20">
          <button className="bg-blue-500 text-white px-4 py-2 mr-4 rounded">
            Create Account
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded">
            Login
          </button>
        </div>
        {/*should only appear when user is not logged in*/}

        <div className="mt-80">
          {/*should only appear when user is logged in*/}
          <form className="messageForm mt-8" onSubmit={(e) => e.preventDefault()}>
            <h2 className="text-2xl font-semibold mb-4">
              Share your message with Social Verse!
            </h2>
            <input
              type="text"
              className="border p-2 w-full text-black"
              placeholder="Weekend plan?"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            />
            <button className="postBtn bg-blue-500 text-white px-4 py-2 mt-4 rounded" onClick={handlePostSubmit}>
              Post
            </button>
          </form>
          {/*should only appear when user is logged in*/}
          <p>Here, other people's posts will be shown.</p>
        </div>
      </main>
      <footer className="bg-black text-white w-full py-4 mt-auto">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 Social Verse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
