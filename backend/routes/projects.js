const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const User = require('../models/user');

// Get all projects (public ones or user's own)
router.get('/', async (req, res) => {
  try {
    // If user is authenticated, include their projects
    // Otherwise just return public projects
    const userId = req.user ? req.user.id : null;
    
    let query = {};
    if (userId) {
      // Return public projects and user's own projects
      query = { $or: [{ isPublic: true }, { createdBy: userId }] };
    } else {
      // Only return public projects
      query = { isPublic: true };
    }
    
    const projects = await Project.find(query)
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 });
      
    res.json(projects);
  } catch (err) {
    console.error('Fetch Projects Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user's projects
router.get('/user', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  try {
    const projects = await Project.find({ createdBy: req.user.id })
      .sort({ updatedAt: -1 });
      
    res.json(projects);
  } catch (err) {
    console.error('Fetch User Projects Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('createdBy', 'name')
      .populate('componentsUsed.component');
      
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    // Check if project is public or belongs to the user
    const userId = req.user ? req.user.id : null;
    if (!project.isPublic && (!userId || project.createdBy._id.toString() !== userId)) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    res.json(project);
  } catch (err) {
    console.error('Fetch Project Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new project
router.post('/', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const { name, description, image, componentsUsed, connections, notes } = req.body;
  
  try {
    const newProject = new Project({
      name,
      description,
      createdBy: req.user.id,
      image,
      componentsUsed: componentsUsed || [],
      connections: connections || {},
      notes,
      versionHistory: [{
        date: new Date(),
        description: 'Project created'
      }]
    });
    
    await newProject.save();
    
    // Add project to user's projects array
    await User.findByIdAndUpdate(req.user.id, {
      $push: { projects: newProject._id }
    });
    
    res.status(201).json(newProject);
  } catch (err) {
    console.error('Create Project Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update project
router.put('/:id', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    // Check if user owns the project
    if (project.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    const { name, description, image, componentsUsed, connections, notes, isPublic } = req.body;
    
    // Update fields
    if (name) project.name = name;
    if (description !== undefined) project.description = description;
    if (image) project.image = image;
    if (componentsUsed) project.componentsUsed = componentsUsed;
    if (connections) project.connections = connections;
    if (notes !== undefined) project.notes = notes;
    if (isPublic !== undefined) project.isPublic = isPublic;
    
    // Add version history entry
    project.versionHistory.push({
      date: new Date(),
      description: 'Project updated'
    });
    
    await project.save();
    res.json(project);
  } catch (err) {
    console.error('Update Project Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete project
router.delete('/:id', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    // Check if user owns the project
    if (project.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    await Project.findByIdAndDelete(req.params.id);
    
    // Remove project from user's projects array
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { projects: req.params.id }
    });
    
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error('Delete Project Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;