const express = require('express');
const cors = require('cors');

const app = express();

app.use(
  cors({
    origin: '*',
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
  }),
);

app.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'server is up and running successfully!',
  });
  next();
});

app.listen(8080, () => {
  console.log('server is running!');
});
