// MongoDB shell script to add project entries
// Run this in MongoDB shell with: load("mongodb-add-projects.js")

// Connect to the database
use("iot-platform");

// Get a reference to the first user
const user = db.users.findOne();
if (!user) {
  print("No users found in the database. Please add users first.");
  quit();
}

// Get component references
const components = db.components.find().toArray();
if (components.length === 0) {
  print("No components found in the database. Please add components first.");
  quit();
}

// Create a mapping from component name to ID
const componentMap = {};
components.forEach(comp => {
  const simpleName = comp.name.toLowerCase().replace(/\s+/g, '-');
  componentMap[simpleName] = comp._id;
});

// Demo projects data
const demoProjects = [
  {
    name: 'Smart Home Monitoring System',
    description: 'A comprehensive IoT system that monitors temperature, humidity, and motion in your home.',
    image: '/images/projects/smart-home.png',
    isPublic: true,
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
    tags: ['home automation', 'monitoring', 'sensors'],
    views: 120,
    likes: 15
  },
  {
    name: 'Automated Plant Watering System',
    description: 'An IoT solution that monitors soil moisture and automatically waters plants when needed.',
    image: '/images/projects/plant-watering.png',
    isPublic: true,
    connections: [
      { sourceId: 'arduino-uno', sourcePin: 'A0', targetId: 'soil-moisture', targetPin: 'AO' },
      { sourceId: 'arduino-uno', sourcePin: 'D3', targetId: 'relay', targetPin: 'IN' },
      { sourceId: 'arduino-uno', sourcePin: 'i2c', targetId: 'oled-display', targetPin: 'I2C' },
    ],
    notes: 'Perfect for keeping your plants healthy while youre away. The system monitors soil moisture and activates a water pump when levels are too low.',
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
    tags: ['agriculture', 'automation', 'watering'],
    views: 85,
    likes: 12
  },
  {
    name: 'IoT Weather Station',
    description: 'A connected weather station that measures temperature, humidity, pressure, and air quality.',
    image: '/images/projects/weather-station.png',
    isPublic: true,
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
    tags: ['weather', 'monitoring', 'wireless'],
    views: 65,
    likes: 8
  }
];

// Clear existing projects
db.projects.deleteMany({});
print("Cleared existing projects");

// Reset user's projects array
db.users.updateOne({ _id: user._id }, { $set: { projects: [] } });

// Insert projects and update user
for (const project of demoProjects) {
  // Assign component IDs based on connections
  const usedComponentIds = new Set();
  
  project.connections.forEach(conn => {
    if (componentMap[conn.sourceId]) usedComponentIds.add(componentMap[conn.sourceId]);
    if (componentMap[conn.targetId]) usedComponentIds.add(componentMap[conn.targetId]);
  });
  
  project.componentsUsed = Array.from(usedComponentIds);
  
  // Add creator info
  project.createdBy = user._id;
  project.createdAt = new Date();
  
  // Insert the project
  const result = db.projects.insertOne(project);
  
  // Add project to user's projects array
  db.users.updateOne(
    { _id: user._id },
    { $push: { projects: result.insertedId } }
  );
  
  print(`Created project: ${project.name}`);
}

print("Project seeding completed successfully");

// Display the projects that were added
print("\nProjects in the database:");
db.projects.find().forEach(p => {
  print(`- ${p.name} (created by: ${p.createdBy})`);
});

// Display the updated user with projects
print("\nUpdated user with projects:");
const updatedUser = db.users.findOne({ _id: user._id });
print(`User ${updatedUser.name} now has ${updatedUser.projects.length} projects`);