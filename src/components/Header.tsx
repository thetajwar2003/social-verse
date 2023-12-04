import Link from "next/link";
import React from "react";
import SearchBox from "./SearchBox";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/config";
import { signOut } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";

export default function Header() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    router.refresh();
  };

  return (
    <nav className="nav-bar">
      <div className="container mx-auto flex justify-between items-center relative p-4">
        <h1 className="text-2xl font-bold text-white flex items-center">
          Social Verse
        </h1>

        <div className="flex items-center space-x-4">
          {/*Search button on navbar*/}
          <SearchBox />
          {user ? (
            <>
              <Link href="/">
                <div className="hover:underline cursor-pointer">Feed</div>
              </Link>
              <Link href="/trending">
                <div className="hover:underline cursor-pointer">Trending</div>
              </Link>
              <Link href="/profile">
                <div className="hover:underline cursor-pointer">My Profile</div>
              </Link>
              <Link href="/settings">
                <div className="hover:underline cursor-pointer">Settings</div>
              </Link>
              <button
                onClick={handleSignOut}
                className="bg-red-500 text-white p-1 rounded"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link href="/login" className="bg-blue-500 text-white p-1 rounded">
              <span className="text-white">Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
