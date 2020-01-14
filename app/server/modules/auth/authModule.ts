import express from 'express';
import authRouter from './authRouter';

class AuthModule {
  private app: Express.Application = null;

  constructor(app: Express.Application) {
    console.log('Create new instance of Auth module');
    
    this.app = app;
    authRouter(app);
  }
}

export default AuthModule;
