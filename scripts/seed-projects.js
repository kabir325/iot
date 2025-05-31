// This script creates a standalone version of the seed-projects.js script
// that doesn't rely on an external MongoDB connection

const fs = require('fs');
const path = require('path');

// Create directory for output if it doesn't exist
const outputDir = path.join(__dirname, 'output');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Path for the output file
const outputPath = path.join(outputDir, 'projects-seed-data.json');

// Demo projects data
const demoProjects = [
  {
    name: 'Smart Home Monitoring System',
    description: 'A comprehensive IoT system that monitors temperature, humidity, and motion in your home.',
    image: '/images/projects/smart-home.png',
    isPublic: true,
    componentsUsed: [],  // Will be populated with actual component IDs
    connections: [
      { sourceId: 'arduino-uno', sourcePin: 'D2', targetId: 'dht11', targetPin: 'DATA' },
      { sourceId: 'arduino-uno', sourcePin: 'D4', targetId: 'ultrasonic', targetPin: 'TRIG' },
      { sourceId: 'arduino-uno', sourcePin: 'D5', targetId: 'ultrasonic', targetPin: 'ECHO' },
      { sourceId: 'arduino-uno', sourcePin: 'D7', targetId: 'relay', targetPin: 'IN' },
    ],
    notes: 'This project demonstrates how to create a basic home monitoring system using Arduino and various sensors.',
    versionHistory: [
      {
        version: 1,
        changes: 'Initial setup with temperature and humidity monitoring',
        timestamp: new Date('2023-01-15')
      },
      {
        version: 2,
        changes: 'Added motion detection and relay control for appliances',
        timestamp: new Date('2023-02-10')
      }
    ],
    tags: ['home automation', 'monitoring', 'sensors']
  },
  {
    name: 'Automated Plant Watering System',
    description: 'An IoT solution that monitors soil moisture and automatically waters plants when needed.',
    image: '/images/projects/plant-watering.png',
    isPublic: true,
    componentsUsed: [],  // Will be populated with actual component IDs
    connections: [
      { sourceId: 'arduino-uno', sourcePin: 'A0', targetId: 'soil-moisture', targetPin: 'AO' },
      { sourceId: 'arduino-uno', sourcePin: 'D3', targetId: 'relay', targetPin: 'IN' },
      { sourceId: 'arduino-uno', sourcePin: 'I2C', targetId: 'oled-display', targetPin: 'I2C' },
    ],
    notes: 'Perfect for keeping your plants healthy while you're away. The system monitors soil moisture and activates a water pump when levels are too low.',
    versionHistory: [
      {
        version: 1,
        changes: 'Basic moisture sensing and pump control',
        timestamp: new Date('2023-03-05')
      },
      {
        version: 2,
        changes: 'Added OLED display for real-time moisture level monitoring',
        timestamp: new Date('2023-03-20')
      }
    ],
    tags: ['agriculture', 'automation', 'watering']
  },
  {
    name: 'IoT Weather Station',
    description: 'A connected weather station that measures temperature, humidity, pressure, and air quality.',
    image: '/images/projects/weather-station.png',
    isPublic: true,
    componentsUsed: [],  // Will be populated with actual component IDs
    connections: [
      { sourceId: 'esp8266', sourcePin: 'D1', targetId: 'dht11', targetPin: 'DATA' },
      { sourceId: 'esp8266', sourcePin: 'I2C', targetId: 'oled-display', targetPin: 'I2C' },
    ],
    notes: 'This weather station uploads data to a cloud service for remote monitoring and analysis.',
    versionHistory: [
      {
        version: 1,
        changes: 'Basic temperature and humidity monitoring with WiFi connectivity',
        timestamp: new Date('2023-04-10')
      }
    ],
    tags: ['weather', 'monitoring', 'wireless']
  }
];

// Function to generate project seed data
function generateProjectSeedData() {
  try {
    // Prepare projects with placeholder IDs
    const preparedProjects = demoProjects.map(project => {
      // Create a deep copy of the project
      const preparedProject = JSON.parse(JSON.stringify(project));
      
      // Add placeholder IDs for components
      // In a real MongoDB environment, these would be actual ObjectIds
      const usedComponentIds = new Set();
      
      project.connections.forEach(conn => {
        // Add placeholder IDs for source and target components
        if (conn.sourceId) usedComponentIds.add(conn.sourceId);
        if (conn.targetId) usedComponentIds.add(conn.targetId);
      });
      
      // Convert Set to Array for componentsUsed
      preparedProject.componentsUsed = Array.from(usedComponentIds).map(id => ({
        component: `ObjectId("component_${id}")`,
        quantity: 1
      }));
      
      // Add creator info with placeholder user ID
      preparedProject.createdBy = 'ObjectId("user_placeholder")';
      preparedProject.createdAt = new Date();
      
      return preparedProject;
    });
    
    // Create the final data structure
    const seedData = {
      projects: preparedProjects,
      instructions: {
        usage: 'This file contains seed data for projects. You can use it with the MongoDB shell or import it using mongoimport.',
        mongoShell: 'Load this in MongoDB shell after replacing placeholder IDs with actual ObjectIds',
        nodeJs: 'In Node.js, parse this file and replace placeholder IDs with actual ObjectIds from your database'
      }
    };
    
    // Write to file
    fs.writeFileSync(outputPath, JSON.stringify(seedData, null, 2));
    console.log(`Project seed data written to ${outputPath}`);
    console.log('You can use this data to seed your MongoDB database');
    
  } catch (error) {
    console.error('Error generating project seed data:', error);
  }
}

// Run the generation function
generateProjectSeedData();