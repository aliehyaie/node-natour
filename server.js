const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  process.exit(1);
});

dotenv.config();
const DB = process.env.DATABASE_LOCAL;
const app = require('./app');

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(con => {
  console.log('DB connections successful!');
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log('app running on port 3000');
});

process.on('unhandledRejection', err => {
  console.log(err.name,'gg');
  server.close(() => {
    process.exit(1);
  });
  process.exit(1);
});