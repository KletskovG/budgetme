import User from '../../../models/User/User';
import { IUser } from 'app/models/User/UserModel';
import AuthController from './authContoller';

function authRouter(app: any) {
    const controller = new AuthController();
    
    app.post('/start', async (req, res) => {
        // TODO: handle user here
        console.log('Handling start request');
        console.log(req.body);
        const user: User = new User();
        user.create(req.body);
        console.log(user.data);
        controller
          .start(user.data)
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
