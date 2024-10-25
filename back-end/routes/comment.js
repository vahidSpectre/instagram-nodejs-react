const express = require('express');

const router = express.Router();

const commentControllers = require('../controllers/comment');
const isAuth = require('../middlewares/is-auth');

router.post('/new', isAuth, commentControllers.newComment);

module.exports = router;
