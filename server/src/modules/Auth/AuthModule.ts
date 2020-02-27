import { Express } from 'express';
import RegisterRoute from './RegisterRoute';
import AuthRoute from './AuthRoute';

class AuthModule { 
  constructor(app: Express) {
    const register = new RegisterRoute(app);
    const auth = new AuthRoute(app);
  }
}

export default AuthModule;