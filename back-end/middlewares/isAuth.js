const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.isAuth = async (req, res, next) => {
  const users = await User.find();
  console.log(users);
  next();
};
