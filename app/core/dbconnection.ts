import mongoose from 'mongoose';
import path from 'path';
import config from '../serverConfig';

export default () =>
  new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    mongoose.set('debug', true);

    mongoose.connection
      .on('error', err => reject(err))
      .on('close', () => console.log('Database connection closed'))
      .once('open', () => resolve(mongoose.connections[0]));

    mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true });
});
