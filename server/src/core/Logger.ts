import Log, { ILog } from '../../models/Log/Log';
import FrontLog from '../../models/Log/FrontLog';

class Logger {
  private loggerMap = new Map();
  constructor() {
    this.loggerMap.set('error', '**!!ERROR**!!');
    this.loggerMap.set('info', '--INFO--');
    this.loggerMap.set('message', '----');
  }
  
  private async clear(): Promise<any> {
  // Dont do anything
  // clear old errors
  // clear all logs and infos older then one week
  const logs = await Log.find({});
  const frontLogs = await FrontLog.find({});
  const currentDate = new Date().toISOString();
  const errors = logs.filter(
    (log: ILog) => log.type === 'error'
  );

  // const oldLogs = logs.filter(
  // )

  
}

  public log(text: string, type: 'error' | 'info' | 'message') {
    const currentDate = new Date().toISOString();
    let message = `${text} /// ${currentDate}`;
    this.loggerMap.forEach((key, value) => {
      if (key === type) {
        message = `${value} ${text} /// ${currentDate}`;
      }
    });
    Log.create({ text: message, type })
      .then(() => this.clear())
      .catch((err: Error) => {
        console.log(err);
        this.clear();
      });
  }

  public frontLog(message: object, type: 'error' | 'info' | 'message') {
    const currentDate = new Date().toISOString();
    console.log(message);
    let text = `${message} /// ${currentDate}`;
    this.loggerMap.forEach((key, value) => {
      if (key === type) {
        text = `${value} ${message} /// ${currentDate}`;
      }
    });
    FrontLog.create({ text, type })
      .then(() => this.clear())
      .catch((err: Error) => {
        console.log(err);
        this.clear();
      });
  }
}

export default Logger;
