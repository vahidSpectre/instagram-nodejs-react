const express = require('express');

const router = express.Router();

const isAuth = require('../middlewares/is-auth');
const userController = require('../controllers/user');

router.get('/search', isAuth, userController.getUsers);

router.get('/find', isAuth, userController.getUser);

router.post('/follow', isAuth, userController.followUser);

router.get('/follow', isAuth, userController.isFollowingUser);

module.exports = router;
