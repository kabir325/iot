'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

// Mock project data
const mockProject = {
  id: 'project-1',
  name: 'Weather Station',
  createdOn: 'May 10, 2025',
  createdBy: 'You',
  description: 'A weather station using an ESP32 and a temperature and humidity sensor.',
  thumbnail: '/project-thumbnails/weather-station.png',
  components: [
    { id: 'comp-1', name: 'DHT11 Sensor', quantity: 1, type: 'sensor' },
    { id: 'comp-2', name: 'ESP32 Dev Board', quantity: 1, type: 'microcontroller' },
    { id: 'comp-3', name: 'LED', quantity: 2, type: 'output' },
  ],
  versionHistory: [
    { id: 'v-1', date: 'May 23, 2025', description: 'Added LED' },
    { id: 'v-2', date: 'May 22, 2025', description: 'Updated code logic' },
  ],
  notes: '',
};

interface PageProps {
  params: { id: string };
}

export default function ProjectDetails({ params }: PageProps) {
  const [project, setProject] = useState(mockProject);
  const [notes, setNotes] = useState(project.notes);
  const [isEditing, setIsEditing] = useState(false);

  // In a real app, you would fetch the project data based on the ID
  useEffect(() => {
    // Simulating API call
    console.log(`Fetching project with ID: ${params.id}`);
    // setProject(fetchedProject);
  }, [params.id]);

  const handleSaveNotes = () => {
    setProject({ ...project, notes });
    setIsEditing(false);
  };

  const handleDeleteProject = () => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      // In a real app, you would call an API to delete the project
      console.log(`Deleting project with ID: ${params.id}`);
      // Redirect to dashboard after deletion
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header with title and actions */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <h1 className="text-3xl font-bold">{project.name}</h1>
              
              <div className="flex gap-3">
                <Link href={`/projects/${params.id}/edit`}>
                  <Button variant="outline" className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Edit
                  </Button>
                </Link>
                
                <Button variant="outline" className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={handleDeleteProject}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex items-center gap-1 text-green-600 hover:text-green-700 hover:bg-green-50"
                  onClick={() => {
                    // In a real app, this would call an API to publish the project
                    alert('Project published to Explore section!');
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Publish
                </Button>
                
                <Link href={`/workspace/${params.id}`}>
                  <Button className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Simulate
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="mt-2 text-sm text-gray-500">
              <span>Created: {project.createdOn}</span>
              {project.createdBy && (
                <>
                  <span className="mx-2">•</span>
                  <span>Created by: {project.createdBy}</span>
                </>
              )}
            </div>
          </div>
          
          {/* Description */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium mb-2">Description</h2>
            <p className="text-gray-700">{project.description}</p>
          </div>
          
          {/* Project Preview */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium mb-4">Project Preview</h2>
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <div className="relative h-[400px] w-full">
                {/* Fallback to a placeholder if the image doesn't exist */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Components Used */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium mb-4">Components Used</h2>
            <ul className="space-y-2">
              {project.components.map((component) => (
                <li key={component.id} className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 mr-3">
                    •
                  </span>
                  <div>
                    <span className="font-medium">{component.name}</span>
                    <span className="text-gray-500 ml-2">({component.quantity}x)</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Version History */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium mb-4">Version History</h2>
            <ul className="space-y-2">
              {project.versionHistory.map((version) => (
                <li key={version.id} className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 text-gray-800 mr-3">
                    •
                  </span>
                  <div>
                    <span className="font-medium">{version.date}</span>
                    <span className="text-gray-700 ml-2">{version.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Notes */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Notes</h2>
              {!isEditing && (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Edit Notes
                </Button>
              )}
            </div>
            
            {isEditing ? (
              <div>
                <textarea
                  className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes about your project here..."
                />
                <div className="mt-3 flex justify-end space-x-3">
                  <Button variant="outline" size="sm" onClick={() => {
                    setNotes(project.notes);
                    setIsEditing(false);
                  }}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSaveNotes}>
                    Save Notes
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-md min-h-[100px]">
                {notes ? (
                  <p className="text-gray-700 whitespace-pre-wrap">{notes}</p>
                ) : (
                  <p className="text-gray-500 italic">No notes added yet. Click 'Edit Notes' to add some.</p>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Back to Dashboard */}
        <div className="mt-6">
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}