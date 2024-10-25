const io = require('../socket');
const Post = require('../models/post');
const User = require('../models/user');

exports.createPost = async (req, res, next) => {
  const caption = req.body.caption;
  const imageUrls = req.files;
  const userId = req.userId;

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
    .then(async result => {
      const populatedPost =await post.populate(
        'creator',
        'imageUrl username bio story',
      );
      creator.followers.forEach(async followerId => {
        io.getIo().to(followerId.toString()).emit('posts', {
          action: 'create',
          post: populatedPost,
        });
      });
      io.getIo().to(userId).emit('posts', {
        action: 'create',
        post: populatedPost,
      });
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
  const perPage = 15;
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

exports.getPost = async (req, res, next) => {
  const id = req.query.id;

  const post = await Post.findById(id);
  if (!post) {
    return res.status(404).json({
      message: 'Post not found',
    });
  }
  res.status(200).json({
    message: 'Post found',
    post,
  });
};
