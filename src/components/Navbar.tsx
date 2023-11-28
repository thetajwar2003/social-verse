import React from 'react';
import Link from 'next/link';
import NextLink from 'next/link';

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
  return (
    <nav className="nav-bar">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Social Verse</h1>
        <div className="flex space-x-4">
          <NavLink href="/">Feed</NavLink>
          <NavLink href="/trending">Trending</NavLink>
          <NavLink href="/profile">My Profile</NavLink>
          <NavLink href="/settings">Settings</NavLink> 
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
