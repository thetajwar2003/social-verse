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
        <img src="/images/logo_main.png" alt="Social Verse Logo" width="70" height="70" />
        <div className="flex space-x-4">
          <NavLink href="/">Feed</NavLink>
          <NavLink href="/trending">Trending</NavLink>
          <NavLink href="/profile">My Profile</NavLink>
          <NavLink href="/settings">Settings</NavLink>  {/* change it to an icon later on */}
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
