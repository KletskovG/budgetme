import bodyParser from 'body-parser';
import express from 'express';
import config from '../config';
import db from './core/dbconnection';

const app = express();

import Heath from './modules/Heath/HeathRouter';
import Log from '../models/Log/Log';
import FrontLog from '../models/Log/FrontLog';
import { AdminModule, UserModule, WalletModule, AuthModule  } from './modules';
import Logger from './core/Logger';

app.use(bodyParser.json());

const auth = new AuthModule(app);
const wallet = new WalletModule(app);
const heath = new Heath(app);
const user = new UserModule(app);
const admin = new AdminModule(app);
const logger = new Logger();
db()
  .then(() => {
    app.listen(config.PORT, () => {
      console.log('Server is running on ' + config.PORT);
      console.log('DB is connected');
    });
    FrontLog.deleteMany({}).then(() => console.log('Front logs was cleared'));
    // Log.deleteMany({}).then(() => console.log('Logs was cleared'));
    logger.log('', 'info');
  })
  .catch(err => {
    console.log('An error occured while connecting to db ' + err);
  });

export default app;