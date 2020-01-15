import income from './routes/income';

class WalletModule {
  private app: Express.Application = null;
  
  constructor(app: Express.Application) {
    this.app = app;

    income(app);
  }
}

export default WalletModule;