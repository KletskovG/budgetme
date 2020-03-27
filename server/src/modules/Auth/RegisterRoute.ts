// import { User } from '@models/User/User';
import { User, IUser, IUserBase } from '../../../models/User/User';
import { Express } from 'express';
import Logger from '../../core/Logger';

// TODO: add user info validation

class RegisterRoute {
  private app: Express = null;
  private logger: Logger = new Logger();
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
        categories: [],
      };

      this.isUniqueUser(req.body.email)
        .then((isUnique: boolean) => {
          if (isUnique) {
            this.createUser(user)
              .then((createdUser) => {
                res.status(200).send(JSON.stringify(createdUser));
                this.logger.log(`User ${email} was created`, 'info');
              })
              .catch((err: Error) => {
                res.status(500).send(err);
                this.logger.log('Error while creating user', 'error');
              });
          } else {
            res.statusMessage = 'This email is exsist';
            res.status(500).send();
            this.logger.log(`Try to create exsisting user ${email}`, 'error');
          }
        })
        .catch((err: Error) => {
          res.status(500).send(err);
          this.logger.log('Error in UniqueUser /register', 'error');
        });
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
        .then((createdUser) => resolve(createdUser))
        .catch(err => reject(err));
    });
  }
}

export default  RegisterRoute;
