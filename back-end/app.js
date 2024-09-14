const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { isAuth } = require('./middlewares/isAuth');

const authRoutes = require('./routes/auth');

const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: '*',
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
  }),
);

app.use('/authentication', authRoutes);

app.get('/', isAuth, (req, res, next) => {
  res.status(200).json({
    message: 'server is up and running successfully!',
  });
  next();
});

mongoose
  .connect('mongodb://127.0.0.1:27017/instagram')
  .then(() => {
    app.listen(8080, () => {
      console.log('server is running!');
    });
  });

const db = mongoose.connection;

db.on(
  'error',
  console.error.bind(console, 'connection error:'),
);
db.once('open', function () {
  console.log('Connected to the instagram database');
});
