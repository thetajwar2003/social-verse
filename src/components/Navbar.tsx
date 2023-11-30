import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import NextLink from 'next/link';
import SearchBox from './SearchBox';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  return (
    <NextLink href={href} passHref>
      <div className="hover:underline cursor-pointer">{children}</div>
    </NextLink>
  );
};

const Navbar: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  };

  return (
    <nav className="nav-bar">
      <div className="container mx-auto flex justify-between items-center relative">
        <h1 className="text-2xl font-bold text-white flex items-center">
          Social Verse
        </h1>

        <div className="flex space-x-4">
          {/*Search button on navbar*/}
        <button
            className="left-0 text-white"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <FaSearch />
          </button>
          <NavLink href="/">Feed</NavLink>
          <NavLink href="/trending">Trending</NavLink>
          <NavLink href="/profile">My Profile</NavLink>
          <NavLink href="/settings">Settings</NavLink>
        </div>

        {/* Search box */}
        {isSearchOpen && (
          <div className=" text-black">
            <SearchBox onClose={handleCloseSearch} onSearch={() => console.log('Perform search')} />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
