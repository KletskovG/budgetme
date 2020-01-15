import User from 'app/models/User/User';
import IUser from 'app/models/User/IUser';
import AuthController from './authContoller';

function authRouter(app: any) {
    const controller = new AuthController();
    
    app.post('/start', async (req, res) => {
        const user: IUser = {
            firstName: req.body.first_name,
            id: req.body.id,
            lastName: req.body.last_name,
            username: req.body.username,
            wallet: req.body.wallet,
        };

        controller
          .start(user)
          .then((result: IUser) => {
            res.status(200).send(JSON.stringify(result));
          })
          .catch(err => {
            const data = {
              message: err,
            };
            res.status(500).send(JSON.stringify(data));
          });
    });
}

export default authRouter;
