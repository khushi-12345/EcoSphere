const CarbonRecord = require('../models/CarbonRecord');

// @desc    Calculate footprint and save result
// @route   POST /api/carbon/calculate
const calculateCarbon = async (req, res) => {
  try {
    const { 
      dailyDistance, transportType, 
      monthlyElectricity, dietType, 
      weeklyPlastic 
    } = req.body;

    // 1. Get User ID
    // Sometimes req.user might be undefined if middleware fails
    if (!req.user || !req.user.id) {
        return res.status(401).json({ message: 'User not authenticated' });
    }
    const userId = req.user.id; 

    // 2. Safe Math (Prevent crashes if inputs are weird)
    const dist = Number(dailyDistance) || 0;
    const elec = Number(monthlyElectricity) || 0;
    const plastic = Number(weeklyPlastic) || 0;

    // Transport Logic
    let transportEmission = 0;
    if (transportType === 'car') transportEmission = dist * 365 * 0.000192; 
    else if (transportType === 'bus') transportEmission = dist * 365 * 0.000105;
    else if (transportType === 'bike') transportEmission = 0;
    
    // Electricity Logic
    const electricityEmission = elec * 12 * 0.5; 

    // Food Logic
    let foodEmission = 0;
    if (dietType === 'meat') foodEmission = 3.3; 
    else if (dietType === 'vegetarian') foodEmission = 1.7;
    else if (dietType === 'vegan') foodEmission = 1.5;
    else foodEmission = 2.0; // Default for mixed

    // Waste Logic
    const wasteEmission = plastic * 52 * 0.006;

    // 3. Save Result
    const record = await CarbonRecord.create({
      user: userId,
      transport: Number((transportEmission / 1000).toFixed(2)),
      electricity: Number((electricityEmission / 1000).toFixed(2)),
      food: Number(foodEmission.toFixed(2)),
      waste: Number((wasteEmission / 1000).toFixed(2)),
      totalFootprint: Number(((transportEmission + electricityEmission + (foodEmission * 1000) + wasteEmission) / 1000).toFixed(2)),
      inputs: { dailyDistance: dist, transportType, monthlyElectricity: elec, dietType, weeklyPlastic: plastic }
    });

    res.status(201).json(record);

  } catch (error) {
    console.error('Carbon Calc Error:', error.message); // Check your SERVER terminal for this log
    res.status(500).json({ message: 'Server calculation error' });
  }
};

// @desc    Get user history
// @route   GET /api/carbon/my
const getMyHistory = async (req, res) => {
  try {
    const records = await CarbonRecord.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { calculateCarbon, getMyHistory };