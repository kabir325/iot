'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiSearch, FiPlus, FiMinus, FiMenu, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { MdOutlineGridView } from 'react-icons/md';
import { TbCircuitResistor } from 'react-icons/tb';
import { GiCube } from 'react-icons/gi';

// Mock component data
const components = [
  {
    id: 1,
    name: 'Arduino Uno',
    description: 'Microcontroller board based on the ATmega328P',
    image: '/images/components/arduino-uno.png',
    creditCost: 5,
    labels: ['Microcontroller', 'Beginner Friendly'],
    flags: {
      input: true,
      output: true,
      digital: true,
      analog: true,
      wireless: false,
      display: false,
      power: false
    }
  },
  {
    id: 2,
    name: 'Raspberry Pi 4',
    description: 'Single-board computer with 4GB RAM',
    image: '/images/components/raspberry-pi.png',
    creditCost: 15,
    labels: ['Computer', 'Advanced'],
    flags: {
      input: true,
      output: true,
      digital: true,
      analog: false,
      wireless: true,
      display: true,
      power: true
    }
  },
  {
    id: 3,
    name: 'DHT11 Sensor',
    description: 'Temperature and humidity sensor',
    image: '/images/components/dht11.png',
    creditCost: 2,
    labels: ['Sensor', 'Environmental'],
    flags: {
      input: true,
      output: false,
      digital: true,
      analog: false,
      wireless: false,
      display: false,
      power: false
    }
  },
  {
    id: 4,
    name: 'HC-SR04',
    description: 'Ultrasonic distance sensor',
    image: '/images/components/ultrasonic.png',
    creditCost: 2,
    labels: ['Sensor', 'Distance'],
    flags: {
      input: true,
      output: false,
      digital: true,
      analog: false,
      wireless: false,
      display: false,
      power: false
    }
  },
  {
    id: 5,
    name: 'OLED Display',
    description: '0.96 inch I2C OLED display module',
    image: '/images/components/oled.png',
    creditCost: 3,
    labels: ['Display', 'Output'],
    flags: {
      input: false,
      output: true,
      digital: true,
      analog: false,
      wireless: false,
      display: true,
      power: false
    }
  },
  {
    id: 6,
    name: 'Relay Module',
    description: '5V relay for controlling high voltage devices',
    image: '/images/components/relay.png',
    creditCost: 2,
    labels: ['Actuator', 'Power Control'],
    flags: {
      input: false,
      output: true,
      digital: true,
      analog: false,
      wireless: false,
      display: false,
      power: true
    }
  },
  {
    id: 7,
    name: 'Servo Motor SG90',
    description: 'Small servo motor for precise control',
    image: '/images/components/servo.png',
    creditCost: 3,
    labels: ['Actuator', 'Motion'],
    flags: {
      input: false,
      output: true,
      digital: true,
      analog: true,
      wireless: false,
      display: false,
      power: false
    }
  },
  {
    id: 8,
    name: 'ESP8266 WiFi Module',
    description: 'WiFi module for IoT connectivity',
    image: '/images/components/esp8266.png',
    creditCost: 4,
    labels: ['Connectivity', 'Wireless'],
    flags: {
      input: true,
      output: true,
      digital: true,
      analog: false,
      wireless: true,
      display: false,
      power: false
    }
  },
  {
    id: 9,
    name: 'LED RGB',
    description: 'RGB LED for colorful light output',
    image: '/images/components/rgb-led.png',
    creditCost: 1,
    labels: ['Output', 'Light'],
    flags: {
      input: false,
      output: true,
      digital: true,
      analog: true,
      wireless: false,
      display: true,
      power: false
    }
  },
  {
    id: 10,
    name: 'Soil Moisture Sensor',
    description: 'Sensor for measuring soil moisture levels',
    image: '/images/components/soil-moisture.png',
    creditCost: 3,
    labels: ['Sensor', 'Environmental'],
    flags: {
      input: true,
      output: false,
      digital: false,
      analog: true,
      wireless: false,
      display: false,
      power: false
    }
  }
];

// Categories for filtering
const categories = [
  { id: 'input', label: 'Input' },
  { id: 'output', label: 'Output' },
  { id: 'digital', label: 'Digital' },
  { id: 'analog', label: 'Analog' },
  { id: 'wireless', label: 'Wireless' },
  { id: 'display', label: 'Display' },
  { id: 'power', label: 'Power' },
];

export default function WorkspacePage() {
  // State for sidebar visibility
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // State for zoom level
  const [zoomLevel, setZoomLevel] = useState(100);
  
  // State for search term
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for selected categories
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  // State for active view (circuit, 2D, 3D)
  const [activeView, setActiveView] = useState('circuit');

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Toggle sidebar collapse state
  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Adjust zoom
  const adjustZoom = (increment: boolean) => {
    setZoomLevel(prev => {
      const newZoom = increment ? prev + 10 : prev - 10;
      return Math.max(50, Math.min(150, newZoom));
    });
  };

  // Toggle category selection
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Filter components based on search term and selected categories
  const filteredComponents = components.filter(component => {
    // Filter by search term
    const matchesSearch = 
      searchTerm === '' ||
      component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by selected categories
    const matchesCategories = 
      selectedCategories.length === 0 ||
      selectedCategories.every(category => component.flags[category as keyof typeof component.flags]);
    
    return matchesSearch && matchesCategories;
  });

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      {sidebarOpen && (
        <div className={`bg-white border-r border-gray-200 overflow-y-auto transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-80'}`}>
          {/* Sidebar collapse toggle */}
          <div className="flex justify-end p-2 border-b border-gray-200">
            <button 
              className="p-1 rounded-full hover:bg-gray-100"
              onClick={toggleSidebarCollapse}
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
            </button>
          </div>

          {!sidebarCollapsed ? (
            <>
              {/* Search bar */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search components..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FiSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
              </div>
              
              {/* Categories */}
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-medium text-gray-700 mb-2">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      className={`px-3 py-1 text-sm rounded-full ${selectedCategories.includes(category.id) 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      onClick={() => toggleCategory(category.id)}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Component list */}
              <div className="p-4">
                <h3 className="font-medium text-gray-700 mb-4">Components</h3>
                
                {filteredComponents.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {filteredComponents.map(component => (
                      <div 
                        key={component.id} 
                        className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
                        draggable
                      >
                        <div className="flex items-center mb-2">
                          <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center mr-2">
                            {component.image ? (
                              <Image 
                                src={component.image} 
                                alt={component.name} 
                                width={32} 
                                height={32} 
                                className="object-contain"
                              />
                            ) : (
                              <div className="text-gray-400 text-xs">No img</div>
                            )}
                          </div>
                          <div className="overflow-hidden">
                            <h4 className="font-medium text-gray-800 text-sm truncate">{component.name}</h4>
                            <p className="text-xs text-gray-500 truncate">{component.description}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mb-2">
                          {component.labels.slice(0, 2).map((label, index) => (
                            <span 
                              key={index} 
                              className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded truncate max-w-full"
                              title={label}
                            >
                              {label}
                            </span>
                          ))}
                          {component.labels.length > 2 && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">+{component.labels.length - 2}</span>
                          )}
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="text-xs font-medium text-gray-700">
                            {component.creditCost} cr
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No components match your filters.
                    <button 
                      className="block mx-auto mt-2 text-blue-500 hover:underline"
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategories([]);
                      }}
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            // Collapsed sidebar view
            <div className="py-4">
              <div className="flex flex-col items-center space-y-6">
                <button 
                  className="p-2 rounded-full hover:bg-gray-100" 
                  title="Search"
                  onClick={() => setSidebarCollapsed(false)}
                >
                  <FiSearch className="text-gray-700" />
                </button>
                {categories.slice(0, 5).map(category => (
                  <button
                    key={category.id}
                    className={`p-2 rounded-full ${selectedCategories.includes(category.id) 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    onClick={() => toggleCategory(category.id)}
                    title={category.label}
                  >
                    {category.label.charAt(0)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Main workspace area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Sidebar toggle button */}
        <button
          className="absolute top-4 left-4 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
          onClick={toggleSidebar}
        >
          <FiMenu className="text-gray-700" />
        </button>
        
        {/* Workspace */}
        <div 
          className="flex-1 bg-gray-50 overflow-auto"
          style={{
            backgroundImage: 'url("/images/mesh-grid.png")',
            backgroundSize: `${zoomLevel}px ${zoomLevel}px`,
            backgroundPosition: 'center',
          }}
        >
          {/* Workspace content goes here */}
        </div>
        
        {/* Top-right controls */}
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md">
          <div className="flex">
            <button 
              className={`px-3 py-1.5 text-sm ${activeView === 'circuit' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setActiveView('circuit')}
            >
              <TbCircuitResistor className="inline mr-1" /> Circuit
            </button>
            <button 
              className={`px-3 py-1.5 text-sm ${activeView === '2d' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setActiveView('2d')}
            >
              <MdOutlineGridView className="inline mr-1" /> 2D
            </button>
            <button 
              className={`px-3 py-1.5 text-sm ${activeView === '3d' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setActiveView('3d')}
            >
              <GiCube className="inline mr-1" /> 3D
            </button>
          </div>
        </div>
        
        {/* Bottom-right zoom controls - fixed position */}
        <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-md flex">
          <button 
            className="p-2 text-gray-700 hover:bg-gray-100"
            onClick={() => adjustZoom(false)}
            disabled={zoomLevel <= 50}
          >
            <FiMinus />
          </button>
          <div className="px-3 py-2 text-sm text-gray-700">{zoomLevel}%</div>
          <button 
            className="p-2 text-gray-700 hover:bg-gray-100"
            onClick={() => adjustZoom(true)}
            disabled={zoomLevel >= 150}
          >
            <FiPlus />
          </button>
        </div>
      </div>
    </div>
  );
}
