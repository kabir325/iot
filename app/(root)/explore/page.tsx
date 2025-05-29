'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

// Mock data for published projects
const mockPublishedProjects = [
  {
    id: 'project-1',
    name: 'Smart Home Automation',
    thumbnail: '/project-thumbnails/weather-station.png',
    description: 'A comprehensive IoT system for home automation using ESP32 and various sensors.',
    author: 'John Doe',
    publishedDate: 'May 15, 2025',
    likes: 42,
    views: 128,
    tags: ['home-automation', 'esp32', 'sensors']
  },
  {
    id: 'project-2',
    name: 'Plant Monitoring System',
    thumbnail: '/project-thumbnails/weather-station.png',
    description: 'Monitor soil moisture, light, and temperature for your plants with automatic watering system.',
    author: 'Jane Smith',
    publishedDate: 'April 22, 2025',
    likes: 36,
    views: 95,
    tags: ['agriculture', 'arduino', 'automation']
  },
  {
    id: 'project-3',
    name: 'Air Quality Monitor',
    thumbnail: '/project-thumbnails/weather-station.png',
    description: 'Track indoor air quality with this ESP8266-based system that measures PM2.5, CO2, temperature, and humidity.',
    author: 'Alex Johnson',
    publishedDate: 'June 3, 2025',
    likes: 28,
    views: 76,
    tags: ['air-quality', 'esp8266', 'health']
  },
  {
    id: 'project-4',
    name: 'Smart Irrigation Controller',
    thumbnail: '/project-thumbnails/weather-station.png',
    description: 'Automate your garden irrigation with weather forecast integration and soil moisture sensing.',
    author: 'Michael Brown',
    publishedDate: 'May 30, 2025',
    likes: 19,
    views: 64,
    tags: ['irrigation', 'raspberry-pi', 'garden']
  },
];

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [projects, setProjects] = useState(mockPublishedProjects);
  const { isAuthenticated } = useAuth();

  // Get all unique tags from projects
  const allTags = Array.from(new Set(
    mockPublishedProjects.flatMap(project => project.tags)
  ));

  // Filter projects based on search term and selected tag
  useEffect(() => {
    let filtered = mockPublishedProjects;
    
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(project => 
        project.name.toLowerCase().includes(lowerCaseSearch) ||
        project.description.toLowerCase().includes(lowerCaseSearch) ||
        project.author.toLowerCase().includes(lowerCaseSearch) ||
        project.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearch))
      );
    }
    
    if (selectedTag) {
      filtered = filtered.filter(project => 
        project.tags.includes(selectedTag)
      );
    }
    
    setProjects(filtered);
  }, [searchTerm, selectedTag]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Explore Projects</h1>
          <p className="mt-2 text-gray-600">Discover innovative IoT projects created by our community</p>
        </div>
        
        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <svg
                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          
          {isAuthenticated && (
            <Link href="/projects/new">
              <Button className="whitespace-nowrap">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Project
              </Button>
            </Link>
          )}
        </div>
        
        {/* Tags */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${!selectedTag ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              All
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${selectedTag === tag ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        
        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:transform hover:scale-[1.02]">
                <div className="relative h-48 w-full bg-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{project.name}</h3>
                    <div className="flex items-center text-gray-500 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {project.likes}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-2">By {project.author} • {project.publishedDate}</p>
                  
                  <p className="text-gray-700 mb-4 line-clamp-3">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-500 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {project.views} views
                    </div>
                    
                    <Link href={`/projects/${project.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No projects found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}