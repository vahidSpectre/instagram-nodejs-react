const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comment');
const feedRoutes = require('./routes/feed');
const directRoutes = require('./routes/direct')

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json({ limit: '50mb' }));

app.use(cors());

app.use('/postImages', express.static(path.join(__dirname, '/postImages')));
app.use(
  '/profileImages',
  express.static(path.join(__dirname, '/profileImages')),
);

app.use('/authentication', authRoutes);
app.use('/post', postRoutes);
app.use('/user', userRoutes);
app.use('/comment', commentRoutes);
app.use('/feed', feedRoutes);
app.use('/direct',directRoutes)

mongoose.connect('mongodb://127.0.0.1:27017/instagram').then(async() => {
  server.listen(8080, () => {
    console.log('Connected to Server');
  });

  const io = require('./socket').init(server);
  const r = require('./socket');

  io.on('connection', socket => {

    socket.on('join', userId => {
      socket.join(userId);
    });
  });
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to the instagram database');
});
