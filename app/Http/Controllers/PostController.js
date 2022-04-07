const Post = require('../../Models/Post');
const Comment = require('../../Models/Comment');
const asyncHandler = require('../Middleware/async');
const errorResponse = require('../../Utils/errorResponse');

//@desc get all posts
//@route POST /api/v1/posts
//@access Public
exports.getPosts = asyncHandler(async(req, res, next) => {
	//get alll posts
	let query = Post.find();
	const page = parseInt(req.query.page, 10) || 1;
	const limit = parseInt(req.query.limit, 10) || 10;
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;
	const total = await Post.countDocuments();
	query = query.skip(startIndex).limit(limit);
	const posts = await query;
	const pagination = {};
	if (endIndex < total) {
		pagination.next = {
		page: page + 1,
		limit
		};
	}
	if (startIndex > 0) {
		pagination.prev = {
		page: page - 1,
		limit
		};
	}
	pagination.links = {
		current: `${req.protocol}://${req.get('host')}/api/v1/posts?page=${page}&limit=${limit}`,
		first: `${req.protocol}://${req.get('host')}/api/v1/posts?page=1&limit=${limit}`,
		next: pagination.next ? `${req.protocol}://${req.get('host')}/api/v1/posts?page=${pagination.next.page}&limit=${pagination.next.limit}` : null,
		last: `${req.protocol}://${req.get('host')}/api/v1/posts?page=${Math.ceil(total / limit)}&limit=${limit}`
	};
	return res.status(200).json({
		success: true,
		count: posts.length,
		data: posts,
		pagination
	});
});

//@desc get a single post by id
//@route POST /api/v1/posts/:id
//@access Public
exports.getPostById = asyncHandler(async(req, res, next) => {
	const post = await Post.findById(req.params.id);
	if (!post) {
		return next(new errorResponse(`Post not found with id of ${req.params.id}`, 404));
	}
	const comments = await Comment.find({
		postId: req.params.id,
		parentId: null
	});
	const data = {
		post: post,
		comments: comments
	}
	return res.status(200).json({
		success: true,
		data: data
	});
});