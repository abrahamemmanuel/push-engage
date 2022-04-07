const express = require('express');
const router = express.Router();
const {getPosts} = require('../app/Http/Controllers/PostController');

router.route('/').get(getPosts);

module.exports = router;