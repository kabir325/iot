require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Project = require('../models/project');
const User = require('../models/user');
const Component = require('../models/component');
const fs = require('fs');
const path = require('path');

// Use local MongoDB connection string with fallback to environment variable
const MONGO_URI = 'mongodb://localhost:27017/iot-platform';

// Create output directory for JSON data if MongoDB connection fails
const outputDir = path.join(__dirname, 'output');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Path for the output file
const outputPath = path.join(outputDir, 'projects-seed-data.json');

// Connect to MongoDB with timeout and retry options
mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 30
  retryWrites: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.log('Will generate JSON seed data instead of directly seeding the database');
    generateProjectSeedData();
  });

// Demo projects data
const demoProjects = [
  {
    name: 'Smart Home Automation',
    description: 'A comprehensive IoT system for home automation using ESP32 and various sensors.',
    image: '/project-thumbnails/smart-home.png',
    componentsUsed: [],
    connections: { /* Connection data would go here */ },
    notes: 'This project demonstrates a basic smart home setup with temperature monitoring and appliance control.',
    versionHistory: [
      { date: new Date('2023-05-15'), description: 'Project created' },
      { date: new Date('2023-05-20'), description: 'Added temperature sensors' },
      { date: new Date('2023-05-25'), description: 'Implemented relay control' }
    ],
    isPublic: true,
    views: 128,
    likes: 42,
    tags: ['home-automation', 'esp8266', 'sensors']
  },
  {
    name: 'Plant Monitoring System',
    description: 'Monitor soil moisture, light, and temperature for your plants with automatic watering system.',
    image: '/project-thumbnails/plant-monitor.png',
    componentsUsed: [],
    connections: { /* Connection data would go here */ },
    notes: 'This system helps monitor plant health and automate watering based on soil conditions.',
    versionHistory: [
      { date: new Date('2023-04-22'), description: 'Project created' },
      { date: new Date('2023-04-30'), description: 'Added soil moisture sensor' }
    ],
    isPublic: true,
    views: 95,
    likes: 36,
    tags: ['agriculture', 'arduino', 'automation']
  },
  {
    name: 'Air Quality Monitor',
    description: 'Track indoor air quality with this ESP8266-based system that measures PM2.5, CO2, temperature, and humidity.',
    image: '/project-thumbnails/air-quality.png',
    componentsUsed: [],
    connections: { /* Connection data would go here */ },
    notes: 'This project helps monitor indoor air quality to maintain a healthy living environment.',
    versionHistory: [
      { date: new Date('2023-06-03'), description: 'Project created' },
      { date: new Date('2023-06-10'), description: 'Added temperature and humidity monitoring' }
    ],
    isPublic: true,
    views: 76,
    likes: 28,
    tags: ['air-quality', 'esp8266', 'health']
  },
  {
    name: 'Smart Irrigation Controller',
    description: 'Automate your garden irrigation with weather forecast integration and soil moisture sensing.',
    image: '/project-thumbnails/irrigation.png',
    componentsUsed: [],
    connections: { /* Connection data would go here */ },
    notes: 'This system optimizes water usage by only irrigating when necessary based on soil conditions and weather forecasts.',
    versionHistory: [
      { date: new Date('2023-05-30'), description: 'Project created' },
      { date: new Date('2023-06-05'), description: 'Added weather API integration' }
    ],
    isPublic: true,
    views: 64,
    likes: 19,
    tags: ['irrigation', 'raspberry-pi', 'garden']
  },
  {
    name: 'Private Project Example',
    description: 'This is a private project that only the owner can see.',
    componentsUsed: [],
    notes: 'This is just a test project that is set to private.',
    versionHistory: [
      { date: new Date(), description: 'Project created' }
    ],
    isPublic: false,
    tags: ['test', 'private']
  }
];

// Function to generate project seed data as JSON
function generateProjectSeedData() {
  try {
    // Prepare projects with placeholder IDs
    const preparedProjects = demoProjects.map(project => {
      // Create a deep copy of the project
      const preparedProject = JSON.parse(JSON.stringify(project));
      
      // Add placeholder IDs for components
      // In a real MongoDB environment, these would be actual ObjectIds
      const usedComponentIds = new Set();
      
      // Check if connections exists and is an array before using forEach
      if (project.connections && Array.isArray(project.connections)) {
        project.connections.forEach(conn => {
          // Add placeholder IDs for source and target components
          if (conn.sourceId) usedComponentIds.add(conn.sourceId);
          if (conn.targetId) usedComponentIds.add(conn.targetId);
        });
      }
      
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
  } finally {
    mongoose.disconnect();
    console.log('MongoDB disconnected');
  }
}

// Function to seed projects directly to MongoDB
async function seedProjects() {
  try {
    // First, check if we have users and components in the database
    const users = await User.find();
    if (users.length === 0) {
      console.error('No users found in the database. Please create at least one user first.');
      mongoose.disconnect();
      generateProjectSeedData();
      return;
    }

    const components = await Component.find();
    if (components.length === 0) {
      console.error('No components found in the database. Please seed components first.');
      mongoose.disconnect();
      generateProjectSeedData();
      return;
    }

    // Clear existing projects
    await Project.deleteMany({});
    console.log('Cleared existing projects');
    
    // Reset users' projects arrays
    await User.updateMany({}, { $set: { projects: [] } });
    console.log('Reset users\'s project arrays');
      
      // Insert projects
      const insertedProjects = await Project.insertMany(demoProjects);
      console.log(`Added ${insertedProjects.length} projects to the database`);
      
      // Update user's projects array
      const projectIds = insertedProjects.map(project => project._id);
      await User.findByIdAndUpdate(users[0]._id, {
        $push: { projects: { $each: projectIds } }
      });
      console.log(`Updated user's projects array`);
      console.log('Project seeding completed successfully');
  } catch (error) {
    console.error('Error seeding projects:', error);
    // If there's an error with MongoDB operations, generate JSON instead
    generateProjectSeedData();
    return;
  } finally {
    // Always disconnect from MongoDB
    mongoose.disconnect();
    console.log('Database connection closed');
  }
}

// Run the seeding function
seedProjects();