const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log('Uncaugh Exception, Shutting down...');
  console.log(err.name, err.message);
  console.log(err);
  // process.kill(1);
  process.exit(1);
});

process.on('SIGTERM', (err) => {
  console.log('SIGTERM ERROR');
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

// mongoose.connect(DB).then((con) => {
//   console.log('DB Connection Successful..');
// });

const localDB = process.env.DATABASE_LOCAL;

mongoose.connect(localDB).then((con) => {
  console.log('DB Connection Successful..');
});

port = process.env.port;
const server = app.listen(port, () => console.log('listening ...!!'));
process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection , Shutting down...');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
