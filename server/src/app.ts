import bodyParser from 'body-parser';
import express from 'express';
import config from '../config';
import db from './core/dbconnection';

const app = express();

import AuthModule from './modules/Auth/AuthModule';
import WalletModule from './modules/Wallet/WalletModule';
import Heath from './modules/Heath/HeathRouter';

app.use(bodyParser.json());

const auth = new AuthModule(app);
const wallet = new WalletModule(app);
const heath = new Heath(app);

db()
  .then(() => {
    app.listen(config.PORT, () => {
      console.log('Server is running on ' + config.PORT);
      console.log('DB is connected');
    });
  })
  .catch(err => {
    console.log('An error occured while connecting to db ' + err);
  });
