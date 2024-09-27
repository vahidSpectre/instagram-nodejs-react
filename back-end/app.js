const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { isAuth } = require('./middlewares/is-auth');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user')
const commentRoutes = require('./routes/comment')

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));

app.use(
  cors({
    origin: '*',
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
  }),
);

app.use('/postImages', express.static(path.join(__dirname, '/postImages')));
app.use('/profileImages', express.static(path.join(__dirname, '/profileImages')));

app.use('/authentication', authRoutes);
app.use('/post', postRoutes);
app.use('/user', userRoutes);
app.use('/comment', commentRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/instagram').then(() => {
  app.listen(8080, () => {
    console.log('server is running!');
  });
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to the instagram database');
});
