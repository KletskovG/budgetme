import {Express} from 'express';
import UserWallet from './userWallet';
import userSummary from './userSummary';


class UserModule {
  private app: Express = null;
  constructor(app: Express) {
    this.app = app;
    const userWallet: UserWallet = new UserWallet(app);
    const summary: userSummary = new userSummary(app);
  }


}

export default UserModule;
