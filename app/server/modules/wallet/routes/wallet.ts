import UserModel, { IUser } from '../../../../models/User/UserModel';
import Logger from '../../../core/Logger';
import { Express } from 'express';

const logger = Logger.getInstance();

function wallet(app: Express): void {
  app.get('/wallet/:id', async (req, res) => {
    const user: IUser = await UserModel.findOne({ id: req.params.id });
    if (!!user) {
      const userWallet = user.wallet;
      res.send(JSON.stringify(userWallet));
      logger.log(`Sucessfully send ${user.username} wallet`);
      return;
    } else {
      const errorString = `Cant find user ${req.params.id}`;
      res.status(500).send(errorString);
      logger.log(errorString);
      return;
    }
  });
}

export default wallet;
