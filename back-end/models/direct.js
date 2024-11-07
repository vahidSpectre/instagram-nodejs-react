const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dmSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    message: {
      type: String,
      required: true,
    },
    reciver: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Direct', dmSchema);
