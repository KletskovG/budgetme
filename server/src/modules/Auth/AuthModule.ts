import { Express } from 'express';
import RegisterRoute from './RegisterRoute';

class AuthModule { 
  constructor(app: Express) {
    const register = new RegisterRoute(app);
  }
}

export default AuthModule;