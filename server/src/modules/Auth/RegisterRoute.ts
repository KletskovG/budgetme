// import { User } from '@models/User/User';
import { User, IUser, IUserBase } from '../../../models/User/User';
import { Express } from 'express';

// TODO: add user info validation

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
      const user: IUserBase = {
        email,
        password,
      };

      this.isUniqueUser(req.body.email)
        .then((isUnique: boolean) => {
          if (isUnique) {
            this.createUser(user)
              .then((message) => res.status(200).send(message))
              .catch((err: Error) => res.status(500).send(err));
          } else {
            res.status(500).send('This is email is declared');
          }
        })
        .catch((err: Error) => res.status(500).send(err));
    });
  }

  private isUniqueUser(email: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      User.findOne({ email })
        .then((findedDoc) => {
          if (!!findedDoc) {
            resolve(false);
          } else {
            resolve(true);
          }
        })
        .catch((err: Error) => reject(err));
    })
  }

  private createUser(user: IUserBase): Promise<any> {
    return new Promise((resolve, reject) => {
      User.create({...user})
        .then(() => resolve(`User ${user.email} was created`))
        .catch(err => reject(err));
    });
  }
}

export default  RegisterRoute;
