const express = require('express');
const router = express.Router();
const {getPosts, getPostById} = require('../app/Http/Controllers/PostController');
const {addComment, getCommentReplies} = require('../app/Http/Controllers/PostController');
const paginator = require('../app/Http/Middleware/paginator');
const Post = require('../app/Models/Post');

router.route('/').get(paginator(Post, 'posts'), getPosts);
router.route('/:id').get(getPostById);
router.route('/:postId/comments').post(addComment);
router.route('/:postId/comments/:parentId').get(getCommentReplies);

module.exports = router;