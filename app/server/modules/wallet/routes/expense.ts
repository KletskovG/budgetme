import UserModel, { IUser } from '../../../../models/User/UserModel';
import Logger from '../../../core/Logger';
import { Express } from 'express';
const logger = Logger.getInstance();

function expense(app: Express) {
  app.post('/expense', async (req, res) => {
    const user = await UserModel.findOne({ id: req.body.id });
    const expenseAmount: number = Number(req.body.expense);
    const expenseCategory: string = req.body.category.trim();
    if (!!user && expenseAmount > 0 && !!expenseCategory) {
      const updatedUser: IUser = updateUserWallet(user, expenseAmount, expenseCategory);
      UserModel.findOneAndUpdate({ id: req.body.id }, updatedUser)
        .then((doc: IUser) => {
          res.status(200).send(JSON.stringify(user));
          logger.log(`Add expense to ${user.username} wallet: ${user.wallet.amount} amount: `);
        })
        .catch((err: Error) => {
          res.status(500).send(`${err}`);
          logger.log(`${err}`);
        });
    } else {
      const errorString = `Error: cant find user ${req.body.id}. Also check that transaction amount (${expenseAmount}) is positive and category (${expenseCategory}) is not empty`;
      res.status(500).send(errorString);
      logger.log(errorString);
      return;
    }
  });
}

function updateUserWallet(user: IUser, amount: number, category: string): IUser {
  const newUser: IUser = user;
  const { wallet } = newUser;
  wallet.amount -= amount;
  if (!!wallet.budget.expenses) {
    wallet.budget.expenses.push({ count: amount, name: category });
  } else {
    wallet.budget.expenses = [];
    wallet.budget.expenses.push({ count: amount, name: category });
  }
  newUser.wallet = wallet;
  return newUser;
}

export default expense;
