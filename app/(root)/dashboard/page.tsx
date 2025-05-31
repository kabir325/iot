'use client'

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

// Mock data for projects
const mockProjects = [
  {
    id: 'project-1',
    name: 'Project 1',
    thumbnail: '/project-thumbnails/weather-station.png', // Fallback to a placeholder if image doesn't exist
    createdOn: 'Aug 2020',
    componentCount: 4,
    description: 'A simple weather station using ESP32 and temperature sensor',
    isFavorite: false
  },
  {
    id: 'project-2',
    name: 'Project 2',
    thumbnail: '/project-thumbnails/smart-home.png',
    createdOn: 'Jun 2020',
    componentCount: 4,
    description: 'Smart home automation with multiple sensors and actuators',
    isFavorite: true
  },
  {
    id: 'project-3',
    name: 'Project 3',
    thumbnail: '/project-thumbnails/led-control.png',
    createdOn: 'Aug 2020',
    componentCount: 4,
    description: 'LED control system with various patterns and animations',
    isFavorite: false
  },
  {
    id: 'project-4',
    name: 'Project 4',
    thumbnail: '/project-thumbnails/robot.png',
    createdOn: 'Aug 2023',
    componentCount: 5,
    description: 'Simple robot control system with motors and sensors',
    isFavorite: false
  },
];

export default function Dashboard() {
  const [projects, setProjects] = useState(mockProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [filterOption, setFilterOption] = useState('all');

  // Toggle favorite status
  const toggleFavorite = (projectId: string) => {
    setProjects(projects.map(project => 
      project.id === projectId 
        ? { ...project, isFavorite: !project.isFavorite } 
        : project
    ));
  };

  // Filter projects based on search term and filter option
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterOption === 'all') return matchesSearch;
    if (filterOption === 'favorites') return matchesSearch && project.isFavorite;
    
    return matchesSearch;
  });

  // Sort projects based on sort option
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortOption === 'newest') {
      return new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime();
    }
    if (sortOption === 'oldest') {
      return new Date(a.createdOn).getTime() - new Date(b.createdOn).getTime();
    }
    if (sortOption === 'a-z') {
      return a.name.localeCompare(b.name);
    }
    if (sortOption === 'z-a') {
      return b.name.localeCompare(a.name);
    }
    if (sortOption === 'most-components') {
      return b.componentCount - a.componentCount;
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Link href="/workspace/new">
            <Button>New Project</Button>
          </Link>
        </div>

        {/* Search and filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search projects..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-4">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={filterOption}
                onChange={(e) => setFilterOption(e.target.value)}
              >
                <option value="all">All Projects</option>
                <option value="favorites">Favorites</option>
              </select>
              
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
                <option value="most-components">Most Components</option>
              </select>
            </div>
          </div>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProjects.map((project) => (
            <div key={project._id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="relative h-48 bg-gray-200">
                <div className="absolute top-2 right-2 z-10">
                  <button 
                    onClick={() => toggleFavorite(project._id)}
                    className="p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors"
                  >
                    {project.isFavorite ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  {project.image ? (
                    <Image 
                      src={project.image} 
                      alt={project.name}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{project.name}</h3>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span>Created {new Date(project.createdAt).toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <span>{project.componentsUsed?.length || 0} components</span>
                </div>
                
                {project.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                )}
                
                <Link 
                  href={`/workspace/${project._id}`}
                  className="block w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Open
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {sortedProjects.length === 0 && (
          <div className="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No projects found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Try adjusting your search or filter criteria.' : 'Get started by creating a new project.'}
            </p>
            <div className="mt-6">
              <Link href="/workspace/new">
                <Button>
                  <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  New Project
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}