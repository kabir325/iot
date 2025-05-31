require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/users');
const componentRoutes = require('./routes/components');
const projectRoutes = require('./routes/projects');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/users', userRoutes);
app.use('/api/components', componentRoutes);
app.use('/api/projects', projectRoutes);

app.listen(4000, () => console.log('Server running on port 4000'));
