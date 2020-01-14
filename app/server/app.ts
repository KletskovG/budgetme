import bodyParser from 'body-parser';
import express from 'express';
import config from '../config';
import db from './core/dbconnection';

const app = express();

db()
  .then(() => {
    app.listen(config.PORT, () => {
      console.log('Server is running on ' + config.PORT);
    });
  })
  .catch(err => {
    console.log('An error occured while connecting to db ' + err);
  });
