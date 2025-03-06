'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Sidebar from './sidebar';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 530);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header className="navbar">
        <nav className="logo">
          <Link href="/">
            <Image 
              src="/Logo.png" 
              alt="logo" 
              width={144} 
              height={30}
              className="grayscale-image"
            />
          </Link>
          <div className="nav-links">
            {isMobile ? (
              <button onClick={() => setIsSidebarOpen(true)}>
                <Image 
                  src="/menu1.png" 
                  alt="menu" 
                  width={30} 
                  height={30}
                  className="grayscale-image"
                />
              </button>
            ) : (
              <>
                <Link href="/">About</Link>
                <Link href="/projects">Projects</Link>
                <Link href="/contact">Contact Me</Link>
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
