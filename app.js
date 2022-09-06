const path = require('path');
const express = require('express');
const morgan = require('morgan');
// const ratelimit = require('express-rate-limit');
// const helmet = require('helmet');
// const monogSanitize = require('express-mongo-sanitize');
// const xss = require('xss-clean');
// const hpp = require('hpp');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewsRoutes');
const boardRouter = require('./routes/boardsRoutes');
const workspaceRouter = require('./routes/workspaceRoutes');
const cardRouter = require('./routes/cardRoutes');

//____________________________________________________________
const app = express();

app.set('view engine', 'pug');

app.set('views', path.join(__dirname, 'views'));

//____________________________________________________________MiddleWare:
app.use(express.static(path.join(__dirname, 'public')));

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use((req, res, next) => {
  console.log('Hello from the middleware..!!');
  next();
});

//____________________________________________________________Routes:
app.use('/api/v1/users', userRouter);
app.use('/api/v1/boards', boardRouter);
app.use('/api/v1/workspaces', workspaceRouter);
app.use('/api/v1/cards', cardRouter);
app.use('/', viewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

//____________________________________________________________Server on:
module.exports = app;
