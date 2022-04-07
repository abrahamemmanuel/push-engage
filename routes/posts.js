const express = require('express');
const router = express.Router();
const {getPosts, getPostById} = require('../app/Http/Controllers/PostController');

router.route('/').get(getPosts);
router.route('/:id').get(getPostById);

module.exports = router;