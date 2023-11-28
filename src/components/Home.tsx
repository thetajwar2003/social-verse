"use client";
import React from 'react';
import Navbar from '@/components/Navbar';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
        
      <header className="bg-blue-500 text-white w-full py-4">
        <div className="container mx-auto">
          <Navbar/>
        </div>
      </header>
      <main className="container mx-auto my-8 flex flex-col items-center space-y-6">
        {/* Feed */}
        

        <p className="text-2xl font-semibold">Welcome to Social Verse</p>
        <p className="text-gray-600">Welcome message</p>
        
      </main>
      <footer className="bg-gray-200 text-gray-600 w-full py-4 mt-auto">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 Social Verse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
