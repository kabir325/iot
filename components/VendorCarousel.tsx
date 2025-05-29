'use client';

import { useState } from 'react';
import Image from 'next/image';
import { vendors } from '@/data/vendors';

export default function VendorCarousel() {
  const [isAnimationPaused, setIsAnimationPaused] = useState(false);

  // Duplicate the vendors array to create a seamless loop
  const allVendors = [...vendors, ...vendors];
  
  // Handle mouse events directly in the JSX instead of using useEffect
  const handleMouseEnter = () => setIsAnimationPaused(true);
  const handleMouseLeave = () => setIsAnimationPaused(false);

  return (
    <div className="w-full overflow-hidden bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center mb-8">Supported Hardware Vendors</h2>
        
        <div 
          className="relative overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            className={`flex space-x-16 whitespace-nowrap ${isAnimationPaused ? '' : 'animate-carousel'}`}
            style={{
              animationPlayState: isAnimationPaused ? 'paused' : 'running',
            }}
          >
            {allVendors.map((vendor, index) => (
              <div 
                key={`${vendor.id}-${index}`} 
                className="inline-flex flex-col items-center justify-center w-24 h-24"
              >
                <div className="relative w-16 h-16">
                  <Image 
                    src={vendor.logo} 
                    alt={vendor.name}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <span className="mt-2 text-sm text-gray-600">{vendor.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}