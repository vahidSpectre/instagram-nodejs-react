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

exports.getPosts = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 10;
  let totalItems;
  Post.find()
    .countDocuments()
    .then(count => {
      totalItems = count;
      return Post.find()
        .populate('creator', 'imageurl')
        .sort({ createdAt: -1 })
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then(posts => {
      let finallPosts = [];
      posts.map(post => {
        finallPosts.push({
          _id: post._id,
          creator: post.creator,
          cover: post.imageUrls.at(0),
        });
      });
      res
        .status(200)
        .json({ message: 'Posts fetched', finallPosts, totalItems });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
