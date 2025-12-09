// app_api/models/Project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    es: { type: String, required: true, trim: true },
    en: { type: String, required: true, trim: true },
  },

  shortLabel: {
    type: String,
    trim: true,
    required: false,
  },

  description: {
    es: { type: String, required: true },
    en: { type: String, required: true },
  },
  image: { type: String },
  github: { type: String },
  demo: { type: String },
  technologies: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

// "proyectos" será la colección
module.exports = mongoose.model('Project', projectSchema, 'proyectos');
