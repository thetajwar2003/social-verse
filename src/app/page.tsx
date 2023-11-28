"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import './styles.css';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
        
      <header className="bg-white text-white w-full py-4">
        <div className="container mx-auto">
          <Navbar/>
        </div>
      </header>
      <main className="container mx-auto my-8 flex flex-col items-center space-y-6">

        <p className="text-2xl font-semibold">Welcome!</p>

        <form className="messageForm">
      <h2 className="messageHeader">Share your message with Social Verse!</h2>
      <input
        type="text"
        className="messageField"
        placeholder="Weekend plan?"
      />
    </form>
    <button className='postBtn'>Post</button>

        
      </main>
      <p>Here, the other people's posts will be shown.</p>
      <footer className="bg-white text-black w-full py-4 mt-auto">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 Social Verse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
