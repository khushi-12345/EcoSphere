const express = require('express');
const router = express.Router();
const { getSDGs, getSDGById, getArticles, getArticleById } = require('../controllers/contentController');

router.route('/sdgs').get(getSDGs);
router.route('/sdgs/:id').get(getSDGById);

router.route('/articles').get(getArticles);
router.route('/articles/:id').get(getArticleById);

module.exports = router;