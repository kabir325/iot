const mongoose = require('mongoose');

const FlagsSchema = new mongoose.Schema({
  input: { type: Boolean, default: false },
  output: { type: Boolean, default: false },
  display: { type: Boolean, default: false },
  power: { type: Boolean, default: false },
  wireless: { type: Boolean, default: false },
  digital: { type: Boolean, default: false },
  analog: { type: Boolean, default: false }
}, { _id: false });

const TechnicalSpecsSchema = new mongoose.Schema({
  voltage: { type: String },
  interface: { type: String }, // e.g., I2C, SPI
  range: { type: String },
  size: { type: String },
  manufacturer: { type: String }
}, { _id: false });

const ComponentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String },

  creditCost: { type: Number, required: true, default: 10 },

  labels: [{ type: String }], // e.g., ['sensor', 'temperature']

  flags: { type: FlagsSchema, default: () => ({}) },
  technicalSpecs: { type: TechnicalSpecsSchema, default: () => ({}) },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Component', ComponentSchema);
