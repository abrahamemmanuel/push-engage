const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');
const readline = require('readline');
const asyncHandler = require('./app/Http/Middleware/async');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//load env vars
dotenv.config({ path: './config/config.env' });

//load models
const Post = require('./app/Models/Post');
const Comment = require('./app/Models/Comment');

//connect to db
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//read JSON files
const posts = JSON.parse(
  fs.readFileSync(`${__dirname}/database/seeders/posts.json`, 'utf-8')
);

const comments = JSON.parse(
  fs.readFileSync(`${__dirname}/database/seeders/comments.json`, 'utf-8')
);

//run node seeder -i in command line to import data
const importData = asyncHandler(async() => {
    await Post.create(posts);
	await Comment.create(comments);
    console.log('Data Imported...'.green.inverse);
    process.exit();
});

//delete data
//run node seeder -d in command line to delete data
const deleteData = asyncHandler(async() => {
    await Post.deleteMany();
    await Comment.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
});

//if you are not sure if all fake data has been imported or deleted, you can use this function to delete all data or import data
//to do so, simply "run node seeder -c" in command line to check if data is already imported or not
const checkForData = asyncHandler(async() => {
  const posts = await Post.find();
  const comments = await Comment.find();
  if (posts.length > 0 || comments.length > 0) {
    rl.question('This will delete all current data, are you sure? (y/n)', answer => {
      if (answer.toLowerCase() === 'y') {
        deleteData();
      } else {
        console.log('Data not Deleted...'.yellow.inverse);
        process.exit();
      }
    });
  } else if (posts.length === 0 && comments.length === 0) {
    rl.question('This will seed database with fake data, are you sure? (y/n)', answer => {
      if (answer.toLowerCase() === 'y') {
        importData();
      } else {
        console.log('Data not imported...'.yellow.inverse);
        process.exit();
      }
    });
  } 
});

//check if in import or delete mode
if (process.argv[2] === '-i') {
  importData();
}

//check if in import or delete mode
if (process.argv[2] === '-d') {
  deleteData();
}

//check if in import or delete mode
if (process.argv[2] === '-c') {
  checkForData();
}