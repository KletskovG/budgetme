import UserModel, { IUser } from '../../../../models/User/UserModel';
import Logger from '../../../core/Logger';
import { Express } from 'express';

const logger = Logger.getInstance();

function income(app: Express): void {
  app.post('/income', async (req, res) => {
    const user = await UserModel.findOne({ id: req.body.id });
    const incomeAmount = Number(req.body.income);
    if (!!user && !isNaN(incomeAmount) && incomeAmount > 0) {
      user.wallet.amount += incomeAmount;
      UserModel.findOneAndUpdate({ id: req.body.id }, user)
        .then((doc: IUser) => {
          res.status(200).send(JSON.stringify(user));
          logger.log(`Successfully update income of ${doc.username} --- walletAmount: ${doc.wallet.amount + Number(req.body.income)}`);
          return;
        })
        .catch((err: Error) => {
          logger.log(`${err}`);
          res.status(500).send(`${err}`);
        });
    } else {
      const errorString = `Oops, error: I cant find user ${req.body.id}. Also check that income  (${req.body.income}) must positive number`;
      res.status(500).send(errorString);
      logger.log(errorString);
      return;
    }
  });

  app.post('/income/store', async (req, res) => {
    const user = await UserModel.findOne({ id: req.body.id });
    if (!!user) {
      user.store.isIncomeEnabled = req.body.isIncomeEnabled;
      UserModel.findOneAndUpdate({ id: req.body.id }, user)
        .then((doc: IUser) => res.status(200).send(user))
        .catch((err: Error) => {
          res.status(500).send(`Cant save store of ${req.body.id}`);
          logger.log(`Cant save store of ${req.body.id} (server: /income/store) ${err}`);
        });
    } else {
      res.status(500).send(`Cant find User ${req.body.id}`);
      logger.log(`Cant find User ${req.body.id} (server: /income/store)`);
    }
  });
}

export default income;
