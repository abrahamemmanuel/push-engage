const request = require('supertest');
const fs = require('fs');
const app = require('../server');
const { expect } = require('chai');
const Post = require('../app/Models/Post');
const Comment = require('../app/Models/Comment');

const posts = JSON.parse(fs.readFileSync(`C:\/Users\/Staff\/Desktop\/PushEngage/database/seeders/posts.json`, 'utf-8'));
const comments = JSON.parse(fs.readFileSync(`C:\/Users\/Staff\/Desktop\/PushEngage/database/seeders/comments.json`, 'utf-8'));

beforeEach(async () => {
	await Post.deleteMany();
	await Comment.deleteMany();
	await Post.insertMany(posts);
	await Comment.insertMany(comments);
});
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
	
//should get a single post by id
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