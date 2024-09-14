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

  imageurl: [
    {
      type: String,
    },
  ],

  posts: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'posts',
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
