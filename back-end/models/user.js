const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
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
      default: 'New User',
    },
    imageUrl: {
      type: String,
      default: 'profileImages/noimage.webp',
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
    story: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Story',
      },
    ],
    following: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
    followers: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
    blocked: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
