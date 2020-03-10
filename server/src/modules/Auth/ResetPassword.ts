import {Express} from 'express';

class ResetPassword {
  private app: Express = null;

  constructor(app: Express) {
    this.app = app;
  }

  private requestResetPassword(app: Express) {
    this.app.post('')
  }

  private resetPassword() {

  }

  
}

export default ResetPassword;