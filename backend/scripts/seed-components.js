require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Component = require('../models/component');

// Use a MongoDB Atlas connection string for demo purposes
const MONGO_URI = 'mongodb+srv://demo:demo123@cluster0.mongodb.net/iot-platform?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Demo components data
const demoComponents = [
  {
    name: 'Arduino Uno',
    description: 'The Arduino Uno is a microcontroller board based on the ATmega328P. It has 14 digital input/output pins, 6 analog inputs, a 16 MHz ceramic resonator, a USB connection, a power jack, an ICSP header, and a reset button.',
    image: '/components/arduino-uno.svg',
    creditCost: 20,
    labels: ['microcontroller', 'development board', 'arduino'],
    flags: {
      input: true,
      output: true,
      digital: true,
      analog: true
    },
    technicalSpecs: {
      voltage: '5V',
      interface: 'USB',
      manufacturer: 'Arduino'
    }
  },
  {
    name: 'Raspberry Pi 4',
    description: 'The Raspberry Pi 4 Model B is the latest product in the Raspberry Pi range, offering ground-breaking increases in processor speed, multimedia performance, memory, and connectivity.',
    image: '/components/raspberry-pi.svg',
    creditCost: 40,
    labels: ['microcomputer', 'development board', 'raspberry pi'],
    flags: {
      input: true,
      output: true,
      digital: true,
      wireless: true
    },
    technicalSpecs: {
      voltage: '5V',
      interface: 'USB-C, HDMI, GPIO',
      manufacturer: 'Raspberry Pi Foundation'
    }
  },
  {
    name: 'DHT11 Temperature & Humidity Sensor',
    description: 'The DHT11 is a basic, ultra low-cost digital temperature and humidity sensor. It uses a capacitive humidity sensor and a thermistor to measure the surrounding air.',
    image: '/components/dht11.svg',
    creditCost: 5,
    labels: ['sensor', 'temperature', 'humidity'],
    flags: {
      input: true,
      digital: true
    },
    technicalSpecs: {
      voltage: '3.3-5V',
      interface: 'Digital',
      range: '0-50°C, 20-90% RH',
      manufacturer: 'Various'
    }
  },
  {
    name: 'HC-SR04 Ultrasonic Sensor',
    description: 'The HC-SR04 ultrasonic sensor uses sonar to determine distance to an object like bats do. It offers excellent non-contact range detection with high accuracy and stable readings.',
    image: '/components/ultrasonic.svg',
    creditCost: 5,
    labels: ['sensor', 'distance', 'ultrasonic'],
    flags: {
      input: true,
      digital: true
    },
    technicalSpecs: {
      voltage: '5V',
      interface: 'Digital',
      range: '2-400cm',
      manufacturer: 'Various'
    }
  },
  {
    name: 'OLED Display 128x64',
    description: 'This is a small OLED monochrome display with 128x64 resolution that communicates via I2C. It\'s perfect for projects where you need to display text, small icons, or simple graphics.',
    image: '/components/oled-display.svg',
    creditCost: 10,
    labels: ['display', 'output', 'i2c'],
    flags: {
      output: true,
      display: true,
      digital: true
    },
    technicalSpecs: {
      voltage: '3.3-5V',
      interface: 'I2C',
      size: '0.96 inch',
      manufacturer: 'Various'
    }
  },
  {
    name: 'Relay Module',
    description: 'This relay module allows you to control high voltage devices from your microcontroller. It provides isolation between the control circuit and the load circuit.',
    image: '/components/relay.svg',
    creditCost: 8,
    labels: ['actuator', 'power', 'control'],
    flags: {
      output: true,
      power: true,
      digital: true
    },
    technicalSpecs: {
      voltage: '5V (control), up to 250V AC (load)',
      interface: 'Digital',
      manufacturer: 'Various'
    }
  },
  {
    name: 'Servo Motor SG90',
    description: 'The SG90 is a small and lightweight servo motor with high output power. It can rotate approximately 180 degrees (90 in each direction).',
    image: '/components/servo.svg',
    creditCost: 7,
    labels: ['actuator', 'motor', 'motion'],
    flags: {
      output: true,
      digital: true
    },
    technicalSpecs: {
      voltage: '4.8-6V',
      interface: 'PWM',
      manufacturer: 'Tower Pro'
    }
  },
  {
    name: 'ESP8266 WiFi Module',
    description: 'The ESP8266 WiFi Module is a self-contained SOC with integrated TCP/IP protocol stack that can give any microcontroller access to your WiFi network.',
    image: '/components/esp8266.svg',
    creditCost: 12,
    labels: ['wifi', 'communication', 'wireless'],
    flags: {
      input: true,
      output: true,
      wireless: true,
      digital: true
    },
    technicalSpecs: {
      voltage: '3.3V',
      interface: 'UART',
      manufacturer: 'Espressif'
    }
  },
  {
    name: 'LED RGB',
    description: 'RGB LED that can display almost any color by combining red, green and blue light in various intensities.',
    image: '/components/rgb-led.svg',
    creditCost: 3,
    labels: ['output', 'light', 'display'],
    flags: {
      output: true,
      display: true,
      digital: true
    },
    technicalSpecs: {
      voltage: '3.3-5V',
      interface: 'Digital/PWM',
      manufacturer: 'Various'
    }
  },
  {
    name: 'Soil Moisture Sensor',
    description: 'This sensor measures the volumetric content of water in soil, giving you the ability to monitor your plants\'s water needs.',
    image: '/components/soil-moisture.svg',
    creditCost: 6,
    labels: ['sensor', 'moisture', 'agriculture'],
    flags: {
      input: true,
      analog: true
    },
    technicalSpecs: {
      voltage: '3.3-5V',
      interface: 'Analog',
      manufacturer: 'Various'
    }
  }
];

// Function to seed components
async function seedComponents() {
  try {
    // Clear existing components
    await Component.deleteMany({});
    console.log('Cleared existing components');
    
    // Insert new components
    const result = await Component.insertMany(demoComponents);
    console.log(`Added ${result.length} components to the database`);
    
    mongoose.disconnect();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding components:', error);
    mongoose.disconnect();
  }
}

// Run the seeding function
seedComponents();