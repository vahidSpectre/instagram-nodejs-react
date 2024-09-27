const Comment = require('../models/comment');

exports.newComment = (req, res, next) => {
  const comment = new Comment({
    creator: req.userId,
    message: 'test100000000000',
  });
  comment.save();
};
