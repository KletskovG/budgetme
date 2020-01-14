import User from 'app/server/models/User';
import { IUser } from 'app/server/models/IUser';

function authRouter(app: any) {
    app.post('/start', async (req, res) => {
        const user: IUser = {
            first_name: req.body.first_name,
            id: req.body.id,
            last_name: req.body.last_name,
            username: req.body.username,
            wallets: [],
        };

        res.status(200).send(JSON.stringify(user));
    });
}

export default authRouter;
