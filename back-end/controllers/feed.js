const User = require('../models/user');
const Post = require('../models/post');

exports.getFeed = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const userId = req.userId;
  let perPage = 5;

  const user = await User.findById(userId);
  const followers = user.following;
  followers.push(userId);

  const posts = await Post.find({
    creator: { $in: followers },
  })
    .populate('creator', 'imageUrl username bio story')
    .sort({ createdAt: -1 })
    .skip((currentPage - 1) * perPage)
    .limit(perPage);

  if (!posts) {
    return res.status(200).json({
      message: 'No posts',
    });
  }

  res.status(200).json({
    message: 'Posts fetched successfully',
    posts,
  });
};
