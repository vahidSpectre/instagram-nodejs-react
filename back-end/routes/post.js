const express = require('express');

const router = express.Router();

const postController = require('../controllers/post');

const isAuth = require('../middlewares/is-auth');
const upload = require('../middlewares/multerConfig');

router.post(
  '/create',
  isAuth,
  upload.array('files', 5),
  postController.createPost,
);

router.get('/get', isAuth, postController.getPosts);

module.exports = router;
