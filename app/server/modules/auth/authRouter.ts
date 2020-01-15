import User from '../../../models/User/User';
import IUser from 'app/models/User/IUser';
import AuthController from './authContoller';

function authRouter(app: any) {
    const controller = new AuthController();
    
    app.post('/start', async (req, res) => {
        // TODO: handle user here
        console.log('Handling start request');
        // const user: IUser = {
        //     first_name: req.body.first_name,
        //     id: req.body.id,
        //     last_name: req.body.last_name,
        //     username: req.body.username,
        //     wallet: null,
        //     store: {},
        // };
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
