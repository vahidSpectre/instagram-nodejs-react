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

router.get('/getall', isAuth, postController.getPosts);
router.get('/find', isAuth,postController.getPost )

module.exports = router;
