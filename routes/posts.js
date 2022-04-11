const express = require('express');
const router = express.Router();
const {getPosts, getPostById, createPost} = require('../app/Http/Controllers/PostController');
const {addComment, getCommentReplies} = require('../app/Http/Controllers/PostController');
const paginator = require('../app/Http/Middleware/paginator');
const Post = require('../app/Models/Post');

router.route('/').post(createPost);
router.route('/').get(paginator(Post, 'posts'), getPosts);
router.route('/:id').get(getPostById);
router.route('/:postId/comments').post(addComment);
router.route('/:postId/comments/:commentId').get(getCommentReplies);

module.exports = router;