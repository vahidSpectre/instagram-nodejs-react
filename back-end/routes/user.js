const express = require('express');

const router = express.Router();

const isAuth = require('../middlewares/is-auth');
const userController = require('../controllers/user');

router.get('/search', isAuth, userController.getUsers);

module.exports = router;
