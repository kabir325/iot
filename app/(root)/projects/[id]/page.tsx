'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface ProjectComponentType {
  component: {
    _id: string;
    name: string;
    description: string;
    image?: string;
    flags?: string[];
  };
  quantity: number;
  config?: any;
}

interface VersionHistoryType {
  date: string;
  description: string;
}

interface ProjectType {
  _id: string;
  name: string;
  description: string;
  createdBy: {
    _id: string;
    name: string;
  };
  createdAt: string;
  image?: string;
  componentsUsed: ProjectComponentType[];
  connections: any;
  notes: string;
  versionHistory: VersionHistoryType[];
  isPublic: boolean;
  views: number;
  likes: number;
  tags: string[];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectDetails({ params }: PageProps) {
  const [project, setProject] = useState<ProjectType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/projects/${params.id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Project not found');
          } else if (response.status === 403) {
            throw new Error('You do not have permission to view this project');
          } else {
            throw new Error('Failed to fetch project');
          }
        }
        
        const data = await response.json();
        setProject(data);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProject();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
                <div className="mt-4">
                  <Link href="/dashboard">
                    <Button variant="outline">Back to Dashboard</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!project) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">

          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <h1 className="text-3xl font-bold">{project.name}</h1>

              <div className="flex gap-3">
                {isAuthenticated && project.createdBy._id === localStorage.getItem('user')?._id && (
                  <Link href={`/projects/${params.id}/edit`}>
                    <Button variant="outline">Edit</Button>
                  </Link>
                )}

                <Link href={`/workspace/${params.id}`}>
                  <Button>Open in Workspace</Button>
                </Link>
              </div>
            </div>

            <div className="mt-2 text-sm text-gray-500">
              <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <span>Created by: {project.createdBy?.name || 'Unknown'}</span>
              {project.isPublic && (
                <>
                  <span className="mx-2">•</span>
                  <span>Public Project</span>
                </>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium mb-2">Description</h2>
            <p className="text-gray-700">{project.description}</p>
          </div>

          {/* Components */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium mb-4">Components Used</h2>
            {project.componentsUsed && project.componentsUsed.length > 0 ? (
              <ul className="space-y-2">
                {project.componentsUsed.map((comp, index) => (
                  <li key={index} className="flex items-start">
                    <span className="h-6 w-6 rounded-full bg-blue-100 text-blue-800 mr-3 flex items-center justify-center">•</span>
                    <div>
                      <span className="font-medium">{comp.component?.name || 'Unknown Component'}</span>
                      <span className="text-gray-500 ml-2">({comp.quantity}x)</span>
                      {comp.component?.flags && comp.component.flags.length > 0 && (
                        <span className="text-gray-500 ml-2">({comp.component.flags.join(', ')})</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No components added to this project yet.</p>
            )}
          </div>

          {/* Version History */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium mb-4">Version History</h2>
            {project.versionHistory && project.versionHistory.length > 0 ? (
              <ul className="space-y-2">
                {project.versionHistory.map((version, index) => (
                  <li key={index} className="flex items-start">
                    <span className="h-6 w-6 rounded-full bg-gray-100 text-gray-800 mr-3 flex items-center justify-center">•</span>
                    <div>
                      <span className="font-medium">{new Date(version.date).toLocaleDateString()}</span>
                      <span className="text-gray-700 ml-2">{version.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No version history available.</p>
            )}
          </div>

          {/* Notes */}
          <div className="p-6">
            <h2 className="text-lg font-medium mb-2">Notes</h2>
            {project.notes ? (
              <p className="text-gray-700 whitespace-pre-wrap">{project.notes}</p>
            ) : (
              <p className="text-gray-500 italic">No notes added yet.</p>
            )}
          </div>

        </div>

        <div className="mt-6 flex gap-4">
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 flex items-center">
            ← Back to Dashboard
          </Link>
          <Link href="/explore" className="text-blue-600 hover:text-blue-800 flex items-center">
            ← Back to Explore
          </Link>
        </div>
      </div>
    </div>
  );
}
