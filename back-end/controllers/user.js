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
      if (!users) {
        return res.status(404).json({
          message: 'No users found',
        });
      }
      res.status(200).json({ users });
    });
};

exports.getUser = (req, res, next) => {};
