import { Express } from 'express';
import Logger from '../../core/Logger';
import { IUserBase, User } from '../../../models/User/User';

class AuthRoute {
  private app: Express = null;
  private logger: Logger = new Logger();
  constructor(app: Express) {
    this.app = app;
    this.authUser();
  }

  private authUser() {
    this.app.post('/auth', async (req, res) => {
      const email = req.body.email;
      const password = req.body.password;
      const user: IUserBase = {
        email,
        password,
      };

      const DBuser = await User.findOne(user);
      if (!!DBuser) {
        res.status(200).send('User was authed');
        this.logger.log(`User was authed --- ${user.email}`, 'info');
      } else {
        res.status(500).send('Cant find this user');
        this.logger.log(`Cant find user -- email: ${user.email}`, 'error');
      }
    });
  }
}

export default AuthRoute;
