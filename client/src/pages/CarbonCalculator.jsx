import React, { useState } from 'react';
import axios from 'axios';

const CarbonCalculator = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const [formData, setFormData] = useState({ dailyDistance: 10, transportType: 'car', monthlyElectricity: 200, dietType: 'mixed' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false); 

 const handleCalculate = async (e) => {
e.preventDefault();

// 1. Check Login
if (!user) {
alert('Please Login first to save your results!');
return;
}

setLoading(true); // Show loading

try {
const config = { headers: { Authorization: `Bearer ${user.token}` } };

// Use a slight timeout to simulate "thinking" so user sees something happened
await new Promise(r => setTimeout(r, 500));

const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/carbon/calculate`, formData, config);
setResult(data);
setLoading(false);
} catch (err) {
console.error(err);
setLoading(false);
alert('Error calculating footprint. Check console.');
}
};

  return (
    <div className="pt-24 pb-12 px-4 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-eco-600 mb-8">Carbon Footprint Calculator</h1>
        
        {!result ? (
          <form onSubmit={handleCalculate} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">Daily Travel (km)</label>
                <input type="number" className="w-full p-3 border rounded dark:bg-gray-700" value={formData.dailyDistance} onChange={e => setFormData({...formData, dailyDistance: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">Transport</label>
                <select className="w-full p-3 border rounded dark:bg-gray-700" value={formData.transportType} onChange={e => setFormData({...formData, transportType: e.target.value})}>
                  <option value="car">Car</option>
                  <option value="bus">Bus</option>
                  <option value="bike">Bike</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">Electricity (kWh/mo)</label>
                <input type="number" className="w-full p-3 border rounded dark:bg-gray-700" value={formData.monthlyElectricity} onChange={e => setFormData({...formData, monthlyElectricity: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">Diet</label>
                <select className="w-full p-3 border rounded dark:bg-gray-700" value={formData.dietType} onChange={e => setFormData({...formData, dietType: e.target.value})}>
                  <option value="meat">Heavy Meat</option>
                  <option value="mixed">Mixed</option>
                  <option value="vegetarian">Vegetarian</option>
                </select>
              </div>
            </div>
            <button type="submit" className="w-full bg-eco-600 text-white font-bold py-4 rounded-xl hover:bg-eco-700 transition-all shadow-lg" disabled={loading}>
  {loading ? 'Calculating...' : 'Calculate Footprint'}
</button>
          </form>
        ) : (
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl text-center animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Your Result</h2>
            <div className="text-6xl font-extrabold text-eco-600 mb-6">{result.totalFootprint} <span className="text-2xl">tons</span></div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatBox label="Transport" val={result.transport} />
              <StatBox label="Electricity" val={result.electricity} />
              <StatBox label="Food" val={result.food} />
              <StatBox label="Waste" val={result.waste} />
            </div>
            
            <button onClick={() => setResult(null)} className="text-gray-500 hover:text-gray-700 underline">Calculate Again</button>
          </div>
        )}
      </div>
    </div>
  );
};

const StatBox = ({ label, val }) => (
  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
    <div className="text-xs text-gray-500 uppercase">{label}</div>
    <div className="text-xl font-bold text-gray-800 dark:text-white">{val}</div>
  </div>
);

export default CarbonCalculator;