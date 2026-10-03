const mongoose = require('mongoose');

const carbonRecordSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  transport: { type: Number, required: true }, // tons CO2
  electricity: { type: Number, required: true },
  food: { type: Number, required: true },
  waste: { type: Number, required: true },
  totalFootprint: { type: Number, required: true },
  inputs: {
    // Store what the user entered so they can see it later
    dailyDistance: Number,
    transportType: String,
    monthlyElectricity: Number,
    dietType: String,
    weeklyPlastic: Number
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CarbonRecord', carbonRecordSchema);