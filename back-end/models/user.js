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
      default:'profileImages/noimage.webp'
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
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
