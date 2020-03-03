import {Express} from 'express';
import UserWallet from './userWallet';

class UserModule {
  private app: Express = null;
  constructor(app: Express) {
    this.app = app;

    const userWallet: UserWallet = new UserWallet(app);
  }


}

export default UserModule;
