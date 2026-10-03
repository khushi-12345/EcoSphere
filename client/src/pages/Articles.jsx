import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/content/articles').then(res => setArticles(res.data));
  }, []);

  return (
    <div className="pt-24 pb-12 px-4 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-eco-600 dark:text-eco-500 mb-10">Learn & Discover</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map(article => (
            <div key={article._id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow flex flex-col">
              {article.coverImage && <img src={article.coverImage} alt={article.title} className="w-full h-48 object-cover" />}
              <div className="p-6 flex-1 flex flex-col">
                <span className="text-xs font-bold text-eco-500 uppercase tracking-wider mb-2">{article.category}</span>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{article.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1">{article.summary}</p>
                <Link to={`/article/${article._id}`} className="text-eco-600 font-bold hover:text-eco-800 mt-auto">Read Article →</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Articles;