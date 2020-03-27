import { Express } from 'express';
export class AdminModule {
  private app: Express = null;

  constructor(app: Express) {
    this.app = app;
    
  }
}
