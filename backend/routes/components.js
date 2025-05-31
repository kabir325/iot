const express = require('express');
const router = express.Router();
const Component = require('../models/component');

// Get all components
router.get('/', async (req, res) => {
  try {
    const components = await Component.find();
    res.json(components);
  } catch (err) {
    console.error('Fetch Components Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get component by ID
router.get('/:id', async (req, res) => {
  try {
    const component = await Component.findById(req.params.id);
    if (!component) return res.status(404).json({ error: 'Component not found' });

    res.json(component);
  } catch (err) {
    console.error('Fetch Component Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new component (admin/dev tool)
router.post('/', async (req, res) => {
  const { name, description, image, creditCost, labels, flags, technicalSpecs } = req.body;

  try {
    const newComponent = new Component({
      name,
      description,
      image,
      creditCost,
      labels,
      flags,
      technicalSpecs,
    });

    await newComponent.save();
    res.status(201).json(newComponent);
  } catch (err) {
    console.error('Create Component Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
