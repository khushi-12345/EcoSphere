import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/content/articles/${id}`).then(res => setArticle(res.data));
  }, [id]);

  if (!article) return <div className="p-10">Loading...</div>;

  return (
    <div className="pt-24 pb-12 px-4 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        {article.coverImage && <img src={article.coverImage} alt={article.title} className="w-full h-64 object-cover" />}
        <div className="p-8 md:p-12">
          <span className="text-eco-600 font-bold text-sm uppercase">{article.category}</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mt-2 mb-6">{article.title}</h1>
          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
            {article.content}
          </div>
          <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Link to="/learn" className="inline-block bg-gray-200 dark:bg-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">← Back to Articles</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;