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
    .select({
      username: 1,
      bio: 1,
      imageUrl: 1,
      posts: 1,
      followers: 1,
      following: 1,
    })
    .populate({ path: 'posts', options: { sort: { createdAt: -1 } } })
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

exports.followUser = async (req, res, next) => {
  const reqUserId = req.userId;
  const targetId = req.body.targetId;

  const reqUser = await User.findById(reqUserId);
  const targetUser = await User.findById(targetId);
  try {
    if (!reqUser || !targetUser) {
      return res.status(200).json({ message: 'User not found' });
    }

    const isFollowing = await reqUser.following.includes(targetId.toString());
    const isFollowedBy = await targetUser.followers.includes(
      reqUserId.toString(),
    );

    if (isFollowing && isFollowedBy) {
      await unFollow();
    } else if (!isFollowing && !isFollowedBy) {
      await follow();
    }

    return res.status(200).json({ isFollowingUser: !isFollowing });
  } catch (error) {
    console.error(error);
    return next(error);
  }

  async function follow() {
    reqUser.following.push(targetId.toString());
    await reqUser.save();

    targetUser.followers.push(reqUserId.toString());
    await targetUser.save();

    return;
  }

  async function unFollow() {
    reqUser.following = reqUser.following.filter(
      elem => elem.toString() !== targetId.toString(),
    );
    await reqUser.save();

    targetUser.followers = targetUser.followers.filter(
      elem => elem.toString() !== reqUserId.toString(),
    );
    await targetUser.save();

    return;
  }
};

exports.isFollowingUser = async (req, res, next) => {
  const reqUserId = req.userId;
  const targetId = req.query.id;

  const reqUser = await User.findById(reqUserId);
  const targetUser = await User.findById(targetId);

  if (!reqUser || !targetUser) {
    return res.status(200).json({
      message: 'User not found',
    });
  }

  if (
    reqUser.following.includes(targetId) &&
    targetUser.followers.includes(reqUserId)
  ) {
    return res.status(200).json({
      isFollowingUser: true,
    });
  } else if (
    !reqUser.following.includes(targetId) &&
    !targetUser.followers.includes(reqUserId)
  ) {
    return res.status(200).json({
      isFollowingUser: false,
    });
  }
};
