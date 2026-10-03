const SDG = require('../models/SDG');
const Article = require('../models/Article');

// @desc    Get all SDGs
// @route   GET /api/content/sdgs
const getSDGs = async (req, res) => {
  try {
    // Added .sort({ goalNumber: 1 })
    const sdgs = await SDG.find({}).sort({ goalNumber: 1 });
    res.json(sdgs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single SDG
// @route   GET /api/content/sdgs/:id
const getSDGById = async (req, res) => {
  try {
    const sdg = await SDG.findById(req.params.id);
    if (sdg) {
      res.json(sdg);
    } else {
      res.status(404).json({ message: 'SDG not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all Articles
// @route   GET /api/content/articles
const getArticles = async (req, res) => {
  try {
    const articles = await Article.find({});
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single Article
// @route   GET /api/content/articles/:id
const getArticleById = async (req, res) => {
  try {
    // Find by ID first, but ideally you'd use slug for URLs
    const article = await Article.findById(req.params.id);
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getSDGs, getSDGById, getArticles, getArticleById };