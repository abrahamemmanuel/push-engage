const request = require('supertest');
const fs = require('fs');
const app = require('../server');
const { expect } = require('chai');
const Post = require('../app/Models/Post');
const Comment = require('../app/Models/Comment');

beforeEach(async () => {
  await Post.deleteMany();
  await Comment.deleteMany();
});

describe('GET /api/v1/posts', () => {
  it('should get all posts', async () => {
	  	const posts = JSON.parse(fs.readFileSync(`C:\/Users\/Staff\/Desktop\/PushEngage/database/seeders/posts.json`, 'utf-8'));
		const post = await Post.create(posts);
		await request(app)
			.get('/api/v1/posts?page=1&limit=5')
			.then(res => {
			expect(res.statusCode).to.equal(200);
			expect(res.body.count).to.equal(5);
		});
	});
});

afterEach(async () => {
  await Post.deleteMany();
  await Comment.deleteMany();
});