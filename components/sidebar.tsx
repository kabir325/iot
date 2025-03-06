'use client'
import Link from 'next/link';
import { useEffect } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <div 
        className={`fixed top-0 right-0 h-full w-64 bg-white z-50 transform transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-5">
          <button onClick={onClose} className="absolute top-3 right-3 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <nav className="flex flex-col space-y-4 mt-8">
            <Link href="/" className="hover:text-gray-600" onClick={onClose}>About</Link>
            <Link href="/projects" className="hover:text-gray-600" onClick={onClose}>Projects</Link>
            <Link href="/contact" className="hover:text-gray-600" onClick={onClose}>Contact Me</Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
