'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Sidebar from './sidebar';
import { Button } from './ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header className="navbar sticky top-0 z-30 bg-background shadow-sm">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-4">
          {/* Left section: Logo and Title */}
          <div className="flex items-center space-x-2">
            {/* Logo (opens sidebar) */}
            <button 
              onClick={() => setIsSidebarOpen(true)} 
              className="p-2 rounded-full hover:bg-gray-200 transition-colors"
              aria-label="Open menu"
            >
              <Image
                src="/Logo.png"
                alt="logo"
                width={30}
                height={30}
                className="grayscale-image"
              />
            </button>
            
            {/* Title (links to home) */}
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold">IoT For Everyone</span>
            </Link>
          </div>
          
          {/* Middle section: Navigation Links */}
          <div className="hidden md:flex nav-links">
            <Link href="/" className="px-3 py-2 rounded-md hover:bg-gray-200 transition-colors">Home</Link>
            <Link href="/explore" className="px-3 py-2 rounded-md hover:bg-gray-200 transition-colors">Explore</Link>
            <Link href="/dashboard" className="px-3 py-2 rounded-md hover:bg-gray-200 transition-colors">Dashboard</Link>
            <Link href="/workspace" className="px-3 py-2 rounded-md hover:bg-gray-200 transition-colors">Workspace</Link>
          </div>

          {/* Mobile menu button - only visible on small screens */}
          {isMobile && (
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 rounded-md hover:bg-gray-200 transition-colors"
              aria-label="Menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}

          {/* Right section: Login/Signup or User Profile */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <button 
                className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold"
                onClick={() => setIsSidebarOpen(true)}
              >
                {userInitial}
              </button>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default Navbar;
