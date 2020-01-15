import UserModel from '../../../../models/User/UserModel';
import IUser from 'app/models/User/IUser';
import IWallet from 'app/models/Wallet/IWallet';

function income(app: any) {
  app.post('/income', async (req, res) => {
    // const transaction = req.body.transaction;
    // const user = req.body.user;

    const { user, transaction } = req.body;

    UserModel.findOne({ id: user.id, username: user.username})
      .then((findedUser) => {
        // const wallet: IWallet = findedUser.wallet;
        // wallet.amount = wallet.amount + transaction.number;
      })
      .catch(err => {
        console.log(err);
      });

  });
}

function saveWallet() {

}

export default income;
