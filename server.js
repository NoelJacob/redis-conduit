import 'dotenv/config'

import express from 'express'
import cookieParser from 'cookie-parser';


const app = new express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


import articles from './routes/articles'
import profiles from './routes/profiles'
import tags from './routes/tags'
import user from './routes/user'
import users from './routes/users'

/*
 * Routes
 */
app.use('/articles', articles);
app.use('/profiles', profiles);
app.use('/tags', tags);
app.use('/user', user);
app.use('/users', users);

// catch 404
app.use((req, res, next) => {
  console.error(`Error 404 on ${req.url}.`);
  res.status(404).send({ status: 404, error: 'Not found' });
});

// catch errors
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const msg = err.error || err.message;
  console.error(`Error ${status} (${msg}) on ${req.method} ${req.url} with payload ${req.body}.`);
  res.status(status).send({ status, error: msg });
});

app.listen(8080)
