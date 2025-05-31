'use client'

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-bold text-lg mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link></li>
              <li><Link href="/explore" className="text-gray-600 hover:text-gray-900">Explore Projects</Link></li>
              <li><Link href="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link></li>
              <li><Link href="/workspace" className="text-gray-600 hover:text-gray-900">Workspace</Link></li>
              <li><Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Help</h3>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-gray-600 hover:text-gray-900">Documentation</Link></li>
              <li><Link href="/tutorials" className="text-gray-600 hover:text-gray-900">Tutorials</Link></li>
              <li><Link href="/faq" className="text-gray-600 hover:text-gray-900">FAQs</Link></li>
              <li><Link href="/report" className="text-gray-600 hover:text-gray-900">Report an Issue</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/terms" className="text-gray-600 hover:text-gray-900">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
              <li><Link href="/refund" className="text-gray-600 hover:text-gray-900">Refund Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:support@iot-simulate.dev" className="text-gray-600 hover:text-gray-900 flex items-center">
                  <span className="mr-2">📧</span> support@iot-simulate.dev
                </a>
              </li>
              <li>
                <Link href="/feedback" className="text-gray-600 hover:text-gray-900 flex items-center">
                  <span className="mr-2">🛠</span> Feedback / Feature Requests
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-gray-600 hover:text-gray-900 flex items-center">
                  <span className="mr-2">🗨</span> Discord / Community Forum
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} IoT Simulate. All rights reserved.</p>
          <p className="mt-2">Built for accessibility, experimentation, and the future of learning.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;