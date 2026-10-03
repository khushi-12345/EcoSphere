const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  coverImage: { type: String }, // URL to an image
  author: { type: String, default: 'EcoSphere Team' },
}, {
  timestamps: true
});

module.exports = mongoose.model('Article', articleSchema);