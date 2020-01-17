import { Express } from 'express'
import userRouter from './userRouter';

class UserModule {
  constructor(app: Express) {
    userRouter(app);
  }
}

export default UserModule;
