const mongoose = require('mongoose');

const sdgSchema = new mongoose.Schema({
  goalNumber: { type: Number, required: true },
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, default: 'Environment' }, // Environment, Society, Economy
  icon: { type: String }, // Name of the icon or URL
  color: { type: String, default: '#4CAF50' } // Color for the card
});

module.exports = mongoose.model('SDG', sdgSchema);