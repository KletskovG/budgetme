import { Express, Request } from 'express';
import Logger from '../../core/Logger';
import UserModel, { IUserBase, IUser } from '../../../models/User/UserModel';
import User from '../../..//models/User/User';
import IStorage from '../../../models/BotModels/IStorage';

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

  // Create user in DB
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
    logger.log(`User was deleted: ${baseUser.username}`);
  });

  app.post('/user/store', async (req, res) => {
    const user = await UserModel.findOne({ id: req.body.id });
    if (!!user) {
      const store: IStorage = {
        chatId: req.body.chatId,
        message: req.body.message,
        field: req.body.field,
        isFieldEnabled: req.body.isFieldEnabled,
      };
      if (user.store.field === undefined) {
        user.store[`${store.field}`] = false;
      }
      for (const key in user.store) {
        if (key === store.field) {
          user.store[key] = store.isFieldEnabled;
          UserModel.findOneAndUpdate({ id: req.body.id }, user)
            .then((doc: IUser) => res.status(200).send(user))
            .catch((err: Error) => {
              res.status(500).send(`Cant save store of ${req.body.id}`);
              logger.logError(`Cant save store of ${req.body.id} ${err}`, '(server: /income/store)');
            });
        }
      }
    } else {
      logger.logError(`Cant find user ${req.body.id}`, 'server');
      res.status(500).send(`Cant find user ${req.body.id}`)
    }
  });

}

export default userRouter;
