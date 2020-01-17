import UserModel from '../../../../models/User/UserModel';

function income(app: any) {
  app.post('/income', async (req, res) => {

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
