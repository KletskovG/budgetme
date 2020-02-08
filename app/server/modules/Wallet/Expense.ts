import { Express } from 'express';

class Expense {
  private app: Express = null;
  constructor(app: Express) {
    this.app = app;
  }

  private expense(): void {
    this.app.post('/wallet/expense', async (req, res) => {
      
    });
  }
}

export default Expense;
