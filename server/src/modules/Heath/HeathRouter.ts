import { Express } from 'express';
import Log, { ILog } from '../../../../testserver/models/Log/Log';

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
      let logsString = '';
      logs.forEach((log: ILog) => {
        logsString += `<p> ${log.text} </p>`;
      });
      res.status(200).send(logsString);
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
