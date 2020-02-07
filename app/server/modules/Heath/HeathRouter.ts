import { Express } from 'express';
import Log, { ILog } from '../../../models/Log/Log';

class Health {
  private app: Express = null;
  constructor(app: Express) {
    this.app = app;
    this.logsRoute();
    this.heathRoute();
  }

  private logsRoute(): void {
    this.app.get('/logs', async (req, res) => {
      const logs = await Log.find({});
      res.status(200).send(logs.map((log: ILog) => `<p> ${log.text} </p>`).toString());
    });
  }

  private heathRoute(): void {
    this.app.get('/heath', (req, res) => {
      const data = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now(),
      };

      res.status(200).send(JSON.stringify(data));
    });
  }
}

export default Health;
