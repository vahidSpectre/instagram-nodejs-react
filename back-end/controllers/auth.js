const express = require('express');
const jwt = require('jsonwebtoken');
const bycript = require('bcryptjs');

const User = require('../models/user');

exports.signup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  const bio = req.body.username;

  const foundEmail = await User.findOne({ email: email });
  if (foundEmail) {
    return res.status(401).json({ message: 'email exits' });
  }
  const hashedPw = await bycript.hash(password, 12);
  const user = new User({
    email,
    password: hashedPw,
    username,
    bio,
  });
  user.save().then(user => {
    const token = jwt.sign(
      { userId: user._id.toString() },
      'thisisaverysafesult',
      { expiresIn: '100h' },
    );
    res.status(200).json({
      user: { email: user.email, username: user.username },
      token,
    });
  });
};

exports.login = (req, res, next) => {};
