import bodyParser from 'body-parser';
import express from 'express';
import config from '../config';
import db from './core/dbconnection';
import Logger from './core/Logger';

const app = express();
const logger = Logger.getInstance();

import AuthModule from './modules/Auth/AuthModule';
import WalletModule from './modules/Wallet/WalletModule';

app.use(bodyParser.json());

const auth = new AuthModule(app);
const wallet = new WalletModule(app);

db()
  .then(() => {
    app.listen(config.PORT, () => {
      console.log('Server is running on ' + config.PORT);
      console.log('DB is connected');
      logger.log('Server is running on ' + config.PORT);
    });
  })
  .catch(err => {
    console.log('An error occured while connecting to db ' + err);
  });
