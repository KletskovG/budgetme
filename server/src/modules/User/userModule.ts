import {Express} from 'express';
import UserWallet from './userWallet';
import userSummary from './userSummary';
import { userCategories } from './userCategories';


class UserModule {
  private app: Express = null;
  constructor(app: Express) {
    this.app = app;
    const userWallet: UserWallet = new UserWallet(app);
    const summary: userSummary = new userSummary(app);
    const categories: userCategories = new userCategories(app);
  }


}

export default UserModule;
