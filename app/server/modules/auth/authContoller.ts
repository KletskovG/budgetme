import IUser from '../../../models/User/IUser';
import UserModel from '../../../models/User/UserModel';

class AuthController {
  // TODO: refactor
  public start(user: IUser): Promise<IUser> {
    return new Promise((resolve, reject) => {
      UserModel.findOne({ id: user.id, username: user.username })
        .then(findedUser => {
          if (!!findedUser) {
            reject('This user is already exsists');
          } else {
            UserModel.create(user)
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
