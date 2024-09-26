const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { isAuth } = require('./middlewares/is-auth');

const authRoutes = require('./routes/auth');
const createPostRoutes = require('./routes/post');

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

app.use('/authentication', authRoutes);
app.use('/post', createPostRoutes);

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
