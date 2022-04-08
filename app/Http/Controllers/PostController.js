const Post = require('../../Models/Post');
const Comment = require('../../Models/Comment');
const asyncHandler = require('../Middleware/async');

//@desc get all posts
//@route POST /api/v1/posts
//@access Public
exports.getPosts = asyncHandler(async(req, res, next) => {
	return res.status(200).json(res.payload);
});

//@desc get a single post by id
//@route POST /api/v1/posts/:id
//@access Public
exports.getPostById = asyncHandler(async(req, res, next) => {
	const post = await Post.findById(req.params.id);
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
		message: "Post retrieved successfully",
		data: data
	});
});

//@desc Add comment to post
//@route POST /api/v1/posts/:postId/comments
//@access Public
exports.addComment = asyncHandler(async(req, res, next) => {
	let message = "";
	let data = null;
	const post = await Post.findById(req.params.postId);
	if(req.body.parentId != null){
		const parentComment = await Comment.findById(req.body.parentId);
		const reply = await Comment.create({
			postId: req.params.postId,
			comment: req.body.comment,
			parentId: req.body.parentId,
			children: [],
		})
		await reply.save();
		parentComment.children.push(reply._id);
		await parentComment.save();
		message = "Reply added successfully";
		data = reply;
	}else{
		const comment = await Comment.create({
			postId: req.params.postId,
			comment: req.body.comment,
			parentId: null,
			children: []
		});
		await comment.save();
		message = "Comment added successfully";
		data = comment;
	}
	return res.status(200).json({
		success: true,
		message: message,
		data: data
	});
});

//@desc Get comment replies
//@route GET /api/v1/posts/:postId/comments/:parentId
//@access Public
exports.getCommentReplies = asyncHandler(async(req, res, next) => {
	const post = await Post.findById(req.params.postId);
	const replies = await Comment.find({
		postId: post._id,
		parentId: req.params.parentId
	});
	return res.status(200).json({
		success: true,
		message: "Replies retrieved successfully",
		data: replies
	});
});