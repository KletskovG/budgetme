import { Express, Request } from 'express';
import Logger from '../../core/Logger';
import UserModel, { IUserBase, IUser } from '../../../models/User/UserModel';
import User from '../../..//models/User/User';

function getBaseUser(req: Request): IUserBase {
  const baseUser: IUserBase = {
    id: req.body.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    wallet: null,
    store: {},
  };

  return baseUser;
}

function userRouter(app: Express) {
  const logger = Logger.getInstance();
  // read
  app.get('/user/:id', async (req, res) => {
    UserModel.findOne({ id: req.params.id })
      .then((findedUser: Partial<IUser>) => {
        res.send(findedUser.username);
      })
      .catch((err: Error) => res.status(500).send(err));
  });

  // Create
  app.post('/user', (req, res) => {
    const baseUser: IUserBase = getBaseUser(req);
    const user = new User();
    user.create(baseUser);
    console.log('Builded user');
    console.log(user);

    UserModel.create(user)
      .then((createdUser: IUser) => {
        const data = {
          username: createdUser.username,
          id: createdUser.id,
        };
        res.status(200).send(JSON.stringify(data));
        logger.log(`User was created ${createdUser.id}`);
      })
      .catch((err: Error) => {
        logger.log(`${err}`);
        console.log(err);
        res.status(500).send(`${err}`);
      });
  });

  // Update
  app.put('/user');

  app.post('/user/delete', async (req, res) => {
    const baseUser = getBaseUser(req);
    const numberOfDeletedUsers = await UserModel.remove({ id: baseUser.id });
    res.status(200).send(numberOfDeletedUsers);
  });

}

export default userRouter;
