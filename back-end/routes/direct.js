const express = require('express');

const isAuth = require('../middlewares/is-auth');

const directController = require('../controllers/direct');

const router = express.Router();

router.get('/get', isAuth, directController.fetchDirectMessages);

router.post('/create', isAuth, directController.createDirect);

module.exports = router;
