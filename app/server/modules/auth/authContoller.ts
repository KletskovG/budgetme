import { IUser } from '../../models/IUser';
import User from '../../models/User';

class AuthController {
  
  // TODO: refactor
  public start(user: IUser): Promise<IUser> {
    return new Promise((resolve, reject) => {
      User.findOne({ id: user.id, username: user.username })
        .then(findedUser => {
          if (!!findedUser) {
            reject('This user is already exsists');
          } else {
            User.create(user)
              .then(createdUser => {
                resolve(user);
              })
              .catch(err => {
                console.log(err);
                reject(err);
              })
          }
        })
        .catch(err => {
          console.log(err);

          reject(err);
        });
    });
  }
}

export default AuthController;
