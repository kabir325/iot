// app/(root)/projects/[id]/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface PageProps {
  params: { id: string };
}

// Mock data for simulation
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `Project - ${params.id}`,
  };
}

export default async function ProjectDetails({ params }: PageProps) {
  const project = mockProject;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">

          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <h1 className="text-3xl font-bold">{project.name}</h1>

              <div className="flex gap-3">
                <Link href={`/projects/${params.id}/edit`}>
                  <Button variant="outline">Edit</Button>
                </Link>

                <Link href={`/workspace/${params.id}`}>
                  <Button>Simulate</Button>
                </Link>
              </div>
            </div>

            <div className="mt-2 text-sm text-gray-500">
              <span>Created: {project.createdOn}</span>
              <span className="mx-2">•</span>
              <span>Created by: {project.createdBy}</span>
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
            <ul className="space-y-2">
              {project.components.map((comp) => (
                <li key={comp.id} className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-blue-100 text-blue-800 mr-3 flex items-center justify-center">•</span>
                  <div>
                    <span className="font-medium">{comp.name}</span>
                    <span className="text-gray-500 ml-2">({comp.quantity}x)</span>
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
                  <span className="h-6 w-6 rounded-full bg-gray-100 text-gray-800 mr-3 flex items-center justify-center">•</span>
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
            <h2 className="text-lg font-medium mb-2">Notes</h2>
            <p className="text-gray-500 italic">No notes added yet. Implement editable notes in client component if needed.</p>
          </div>

        </div>

        <div className="mt-6">
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 flex items-center">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
