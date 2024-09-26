const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    defualt: 'New account',
  },
  imageUrl: {
    type: String,
  },
  posts: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Post',
    },
  ],
  bookmarked: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Post',
    },
  ],
  liked: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Post',
    },
  ],
});

module.exports = mongoose.model(
  'User',
  userSchema,
);
