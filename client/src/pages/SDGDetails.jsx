import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const SDGDetails = () => {
  const { id } = useParams();
  const [sdg, setSdg] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/content/sdgs/${id}`).then(res => setSdg(res.data));
  }, [id]);

  if (!sdg) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="pt-24 pb-12 px-4 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-eco-600 p-8 text-center">
          <span className="text-6xl block mb-4">{sdg.icon}</span>
          <h1 className="text-3xl font-bold text-white">Goal {sdg.goalNumber}: {sdg.title}</h1>
        </div>
        <div className="p-8">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Why it matters</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">{sdg.description}</p>
          <div className="mt-8 flex justify-center">
            <Link to="/explore" className="text-eco-600 font-bold hover:underline">← Back to SDGs</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SDGDetails;