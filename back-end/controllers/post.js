const Post = require('../models/post');
const User = require('../models/user');

exports.createPost = async (req, res, next) => {
  const caption = req.body.caption;
  const imageUrls = req.files;

  let creator;

  const imagePath = [];
  imageUrls.map(file => {
    imagePath.push(file.path);
  });

  const post = new Post({
    caption,
    imageUrls: imagePath,
    creator: req.userId,
  });

  await post
    .save()
    .then(async result => {
      return User.findById(req.userId);
    })
    .then(user => {
      creator = user;
      user.posts.push(post);
      return user.save();
    })
    .then(result => {
      return res.status(201).json({
        message: 'Post created successfully!',
        post: result,
        creator: {
          _id: creator._id,
          name: creator.name,
        },
      });
    });
};
