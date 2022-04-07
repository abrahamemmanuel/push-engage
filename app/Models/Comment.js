const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
	postId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post',
		required: [true, 'PostId is required']
	},
	comment: {
		type: String,
		required: [true, 'Comment is required']
	},
	parentId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment'
	},
	children: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment'
	}],
});

module.exports = mongoose.model('Comment', CommentSchema);