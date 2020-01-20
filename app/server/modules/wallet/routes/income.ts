import UserModel, { IUser } from '../../../../models/User/UserModel';
import Logger from '../../../core/Logger';
const logger = Logger.getInstance();

function income(app: any): void {
  app.post('/income', async (req, res) => {
    const user = await UserModel.findOne({ id: req.body.id });
    const incomeAmount = Number(req.body.income);
    if (!!user && !isNaN(incomeAmount) && incomeAmount > 0) {
      const walletUpdatedValue = user.wallet;
      try {
        walletUpdatedValue.amount += Number(req.body.income);
      } catch (error) {
        res.status(500).send('Error while adding income');
        logger.log('Error while adding income');
        logger.log(`${user.username} ---- income: ${req.body.income}`);
      }
      UserModel.findOneAndUpdate({ id: req.body.id }, { wallet: walletUpdatedValue })
        .then((doc: IUser) => {
          res.status(200).send(JSON.stringify(doc));
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
}

export default income;
