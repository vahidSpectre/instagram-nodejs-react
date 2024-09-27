const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const storySchema = new Schema(
  {
    creator: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },

  { timestamps: true },
);

module.exports = mongoose.model('Story', storySchema);
