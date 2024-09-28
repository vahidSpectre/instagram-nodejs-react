const User = require('../models/user');

exports.getUsers = async (req, res, next) => {
  const searchParam = req.query.param;

  User.find({
    username: {
      $regex: `${searchParam}`,
      $options: 'i',
    },
  })
    .select({ username: 1, imageUrl: 1, bio: 1 })
    .then(users => {
      if (users.length === 0) {
        return res.status(404).json({
          message: 'No users found',
        });
      }
      res.status(200).json({ users });
    });
};

exports.getUser = async (req, res, next) => {
  const id = req.query.id;

  User.findById(id)
    .select({ username: 1, bio: 1, imageUrl: 1, posts: 1 })
    .populate('posts')
    .then(user => {
      if (!user) {
        return res.status(404).json({
          message: 'User not found',
        });
      }
      res.status(200).json({
        user: user,
      });
    });
};
