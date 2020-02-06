import User  from '@models/User/User';
import { Express } from 'express';

class RegisterRoute {
  private app: Express = null;
  constructor(app: Express) {
    this.app = app;

    this.registerUser();
  }

  private registerUser(): void {
    this.app.post('/register', (req, res) => {
      const email = req.body.email;
      const password = req.body.password;
      User.create({ email, password })
        .then((doc) => {
          res.send('User was created');
        })
        .catch((err: Error) => {
          res.status(500).send(err.message);
        });
    });
  }
}

export default  RegisterRoute;
