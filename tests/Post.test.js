const request = require('supertest');
const fs = require('fs');
const app = require('../server');
const { expect } = require('chai');
const Post = require('../app/Models/Post');
const Comment = require('../app/Models/Comment');

const path = 'C:\/Users\/Staff\/Desktop\/PushEngage';//replace this with the path on your machine
const posts = JSON.parse(fs.readFileSync(`${path}/database/seeders/posts.json`, 'utf-8'));
const comments = JSON.parse(fs.readFileSync(`${path}/database/seeders/comments.json`, 'utf-8'));

beforeEach(async () => {
	await Post.deleteMany();
	await Comment.deleteMany();
	await Post.insertMany(posts);
	await Comment.insertMany(comments);
});

//@desc Create a post
describe('POST /api/v1/posts', () => {
	it('should create a post', async () => {
		const res = await request(app)
			.post('/api/v1/posts')
			.send({
				title: 'Test Post',
				content: 'This is a test post',
			});
		expect(res.status).to.equal(201);
		expect(res.body.success).to.equal(true);
		expect(res.body.data.title).to.equal('Test Post');
		expect(res.body.data.content).to.equal('This is a test post');
	});
});

// @desc Get all posts
describe('GET /api/v1/posts', () => {
	it('should get all posts', async () => {
		await request(app)
		.get('/api/v1/posts?page=1&limit=5')
		.then(res => {
			expect(res.statusCode).to.equal(200);
			expect(res.body.count).to.equal(5);
		});
		});
	});
	
//@desc Get a single post by id
describe('GET /api/v1/posts/:id', () => {
	it('should get a single post by id', async () => {
		await request(app)
		.get('/api/v1/posts/5d713995b721c3bb38c1f5d0')
		.then(res => {
			expect(res.statusCode).to.equal(200);
			expect(res.body.data.post._id).to.equal('5d713995b721c3bb38c1f5d0');
			expect(res.body.data.comments.length).to.equal(2);
		});
	});
});

//@desc Add comment to a post
describe('POST /api/v1/posts/:postId/comments', () => {
	it('should add comment to a post', async () => {
		await request(app)
		.post('/api/v1/posts/5d713995b721c3bb38c1f5d0/comments')
		.send({
			comment: 'This is a test comment',
			parentId: null
		})
		.then(res => {
			expect(res.statusCode).to.equal(200);
			expect(res.body.data.comment).to.equal('This is a test comment');
			expect(res.body.data.parentId).to.equal(null);
			expect(res.body.data.children.length).to.equal(0);
			expect(res.body.data.postId).to.equal('5d713995b721c3bb38c1f5d0');
		});
	});
});

//@desc Add reply to a comment
describe('POST /api/v1/posts/:postId/comments', () => {
	it('should add reply to a comment', async () => {
		await request(app)
		.post('/api/v1/posts/5d713995b721c3bb38c1f5d0/comments')
		.send({
			comment: 'This is a test reply',
			parentId: '5b9f4f6b9f4f6a9f4f6a9fc1'
		})
		.then(res => {
			expect(res.statusCode).to.equal(200);
			expect(res.body.data.comment).to.equal('This is a test reply');
			expect(res.body.data.parentId).to.equal('5b9f4f6b9f4f6a9f4f6a9fc1');
			expect(res.body.data.children.length).to.equal(0);
			expect(res.body.data.postId).to.equal('5d713995b721c3bb38c1f5d0');
		});
	});
});

//@desc Get comment replies
describe('GET /api/v1/posts/:postId/comments/:commentId', () => {
	it('should get comment replies', async () => {
		await request(app)
		.get('/api/v1/posts/5d713995b721c3bb38c1f5d0/comments/5b9f4f6b9f4f6a9f4f6a9fc0?item=replies')
		.then(res => {
			expect(res.statusCode).to.equal(200);
			expect(res.body.data[0].parentId).to.equal('5b9f4f6b9f4f6a9f4f6a9fc0');
			expect(res.body.data.length).to.equal(2);
			expect(res.body.data[0].postId).to.equal('5d713995b721c3bb38c1f5d0');
		});
	});
});

//@desc Get comment by id
describe('GET /api/v1/posts/:postId/comments/:commentId', () => {
	it('should get comment replies', async () => {
		await request(app)
		.get('/api/v1/posts/5d713995b721c3bb38c1f5d0/comments/5b9f4f6b9f4f6a9f4f6a9fc0')
		.then(res => {
			expect(res.statusCode).to.equal(200);
			expect(res.body.data.children.length).to.equal(2);
			expect(res.body.data._id).to.equal('5b9f4f6b9f4f6a9f4f6a9fc0');
		});
	});
});