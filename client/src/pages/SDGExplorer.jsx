import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SDGExplorer = () => {
  const [sdgs, setSdgs] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/content/sdgs`).then(res => setSdgs(res.data));
  }, []);

  const filteredSdgs = sdgs.filter((sdg) =>
    sdg.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-24 pb-12 px-4 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Sustainable <span className="text-eco-600">Development Goals</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover the 17 global goals designed to achieve a better and more sustainable future for all.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12 relative">
          <input
            type="text"
            placeholder="Search goals (e.g. Water, Climate)..."
            className="w-full px-6 py-4 rounded-full border-2 border-gray-200 dark:border-gray-700 focus:border-eco-500 outline-none shadow-sm dark:bg-gray-800 dark:text-white pl-12"
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl">🔍</span>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSdgs.map((sdg) => (
            <Link 
              key={sdg._id} 
              to={`/sdg/${sdg._id}`}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-t-4"
              style={{ borderColor: sdg.color }}
            >
              <div className="flex flex-col items-center text-center h-full">
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-4 bg-gray-50 dark:bg-gray-700 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${sdg.color}20` }} // 20 is opacity
                >
                  {sdg.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1 leading-tight">Goal {sdg.goalNumber}</h3>
                <h4 className="text-xl font-extrabold text-gray-900 dark:text-white mb-3">{sdg.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 flex-1">{sdg.shortDescription}</p>
                
                <span className="text-eco-600 font-bold text-sm uppercase tracking-wide mt-auto group-hover:underline">View Details →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SDGExplorer;