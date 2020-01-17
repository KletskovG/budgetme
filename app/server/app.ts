import bodyParser from 'body-parser';
import express from 'express';
import config from '../config';
import db from './core/dbconnection';
import Logger from './core/Logger';

const app = express();
const logger = Logger.getInstance();

import AuthModule from './modules/auth/authModule';
import healthCheck from './modules/health/heathModule';
import UserModule from './modules/user/userModule';

app.use(bodyParser.json());

const authModule = new AuthModule(app);
const userModule = new UserModule(app);
healthCheck(app);

db()
  .then(() => {
    app.listen(config.PORT, () => {
      console.log('Server is running on ' + config.PORT);
      logger.log('Server is running on ' + config.PORT);
    });
  })
  .catch(err => {
    console.log('An error occured while connecting to db ' + err);
  });
