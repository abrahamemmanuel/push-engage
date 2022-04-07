const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    content: {
        type: String,
        required: [true, 'Please add some content'],
        maxlength: [500, 'Content cannot be more than 500 characters']
    },
	createdAt: {
		type: Date,
		default: Date.now
	},
});

//export 
module.exports = mongoose.model('Post', PostSchema);

