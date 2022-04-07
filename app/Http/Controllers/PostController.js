const Post = require('../../Models/Post');
const asyncHandler = require('../Middleware/async');

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