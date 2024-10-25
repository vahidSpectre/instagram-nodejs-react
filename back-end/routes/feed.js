const express = require('express');
const isAuth = require('../middlewares/is-auth');

const feedController = require('../controllers/feed');

const router = express.Router();

router.get('/home', isAuth, feedController.getFeed);

module.exports = router;
