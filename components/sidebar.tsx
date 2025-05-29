'use client'
import Link from 'next/link';
import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Sidebar panel - changed from right to left side */}
      <div 
        className={`fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform shadow-lg ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } overflow-y-auto`}
      >
        {/* Header with logo and close button */}
        <div className="p-5 border-b flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image
              src="/Logo.png"
              alt="logo"
              width={30}
              height={30}
              className="grayscale-image"
            />
            <span className="font-bold text-lg">IoT For Everyone</span>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Menu sections */}
        <div className="p-5">
          {/* Account Details */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Account Details</h3>
            <nav className="flex flex-col space-y-2">
              <Link 
                href={isAuthenticated ? "/profile" : "/login"} 
                className="px-2 py-1.5 rounded hover:bg-gray-100 transition-colors flex items-center" 
                onClick={(e) => {
                  if (!isAuthenticated) {
                    e.preventDefault();
                    onClose();
                    router.push('/login?redirect=/profile');
                  } else {
                    onClose();
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile Info
              </Link>
            </nav>
          </div>
          
          {/* Settings */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Settings</h3>
            <nav className="flex flex-col space-y-2">
              <Link 
                href={isAuthenticated ? "/settings" : "/login"} 
                className="px-2 py-1.5 rounded hover:bg-gray-100 transition-colors flex items-center" 
                onClick={(e) => {
                  if (!isAuthenticated) {
                    e.preventDefault();
                    onClose();
                    router.push('/login?redirect=/settings');
                  } else {
                    onClose();
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Preferences
              </Link>
            </nav>
          </div>
          
          {/* Project History */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Project History</h3>
            <nav className="flex flex-col space-y-2">
              <Link 
                href={isAuthenticated ? "/projects/recent" : "/login"} 
                className="px-2 py-1.5 rounded hover:bg-gray-100 transition-colors flex items-center" 
                onClick={(e) => {
                  if (!isAuthenticated) {
                    e.preventDefault();
                    onClose();
                    router.push('/login?redirect=/projects/recent');
                  } else {
                    onClose();
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Recent Projects
              </Link>
            </nav>
          </div>
          
          {/* Change Log */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Change Log</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/changelog" className="px-2 py-1.5 rounded hover:bg-gray-100 transition-colors flex items-center" onClick={onClose}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                View Changes
              </Link>
            </nav>
          </div>
          
          {/* Subscriptions */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Subscriptions</h3>
            <nav className="flex flex-col space-y-2">
              <Link 
                href={isAuthenticated ? "/subscriptions" : "/login"} 
                className="px-2 py-1.5 rounded hover:bg-gray-100 transition-colors flex items-center" 
                onClick={(e) => {
                  if (!isAuthenticated) {
                    e.preventDefault();
                    onClose();
                    router.push('/login?redirect=/subscriptions');
                  } else {
                    onClose();
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Billing & Plans
              </Link>
            </nav>
          </div>
          
          {/* Component Library */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Component Library</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/components" className="px-2 py-1.5 rounded hover:bg-gray-100 transition-colors flex items-center" onClick={onClose}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Available Components
              </Link>
            </nav>
          </div>
          
          {/* Help / Docs */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Help & Support</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/help" className="px-2 py-1.5 rounded hover:bg-gray-100 transition-colors flex items-center" onClick={onClose}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Documentation
              </Link>
              <Link href="/report" className="px-2 py-1.5 rounded hover:bg-gray-100 transition-colors flex items-center" onClick={onClose}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Report Issue
              </Link>
              <Link href="/community" className="px-2 py-1.5 rounded hover:bg-gray-100 transition-colors flex items-center" onClick={onClose}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
                Community Forum
              </Link>
            </nav>
          </div>
          
          {/* Logout */}
          <div className="pt-6 border-t">
            {isAuthenticated ? (
              <button 
                onClick={() => {
                  logout();
                  onClose();
                  router.push('/');
                }}
                className="px-2 py-1.5 rounded hover:bg-gray-100 transition-colors flex items-center text-red-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            ) : (
              <Link href="/login" className="px-2 py-1.5 rounded hover:bg-gray-100 transition-colors flex items-center text-blue-600" onClick={onClose}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
