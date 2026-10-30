import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const user = JSON.parse(localStorage.getItem('userInfo'));

  if (!user || user.role !== 'admin') return <div className="p-10 text-center font-bold text-red-500">Access Denied</div>;

  return (
    <div className="min-h-screen pt-24 flex bg-gray-100 dark:bg-gray-900">
      <aside className="w-64 bg-eco-800 text-white fixed h-full p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-8">Admin</h2>
        <nav className="space-y-2">
          <TabBtn name="Overview" active={activeTab} onClick={setActiveTab} tab="overview" />
          <TabBtn name="Add Article" active={activeTab} onClick={setActiveTab} tab="articles" />
        </nav>
      </aside>

      <main className="ml-0 md:ml-64 flex-1 p-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
              <h3 className="font-bold text-xl text-gray-800 dark:text-white">System Status</h3>
              <p className="text-green-500 mt-2">● Operational</p>
            </div>
          </div>
        )}
        {activeTab === 'articles' && <ArticleForm />}
      </main>
    </div>
  );
};

const TabBtn = ({ name, active, onClick, tab }) => (
  <button onClick={() => onClick(tab)} className={`w-full text-left px-4 py-2 rounded hover:bg-green-700 ${active === tab ? 'bg-green-700' : ''}`}>{name}</button>
);

const ArticleForm = () => {
  const [form, setForm] = useState({ title: '', slug: '', content: '', category: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('userInfo'));
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/articles`, form, { headers: { Authorization: `Bearer ${user.token}` } });
      alert('Article Created!');
      setForm({ title: '', slug: '', content: '', category: '' });
    } catch (err) { alert('Error'); }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-2xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Create Article</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input placeholder="Title" className="w-full p-3 border rounded dark:bg-gray-700 dark:border-gray-600" value={form.title} onChange={e=>setForm({...form, title: e.target.value})} required />
        <input placeholder="Slug (e.g. save-earth)" className="w-full p-3 border rounded dark:bg-gray-700 dark:border-gray-600" value={form.slug} onChange={e=>setForm({...form, slug: e.target.value})} required />
        <input placeholder="Category" className="w-full p-3 border rounded dark:bg-gray-700 dark:border-gray-600" value={form.category} onChange={e=>setForm({...form, category: e.target.value})} required />
        <textarea placeholder="Content" className="w-full p-3 border rounded h-40 dark:bg-gray-700 dark:border-gray-600" value={form.content} onChange={e=>setForm({...form, content: e.target.value})} required></textarea>
        <button className="bg-eco-600 text-white px-6 py-2 rounded hover:bg-eco-700">Publish</button>
      </form>
    </div>
  );
};

export default AdminPanel;