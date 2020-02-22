import Log, { ILog } from '../../models/Log/Log';

class Logger {
  private loggerMap = new Map();
  constructor() {
    this.loggerMap.set('error', '**!!ERROR**!!');
    this.loggerMap.set('info', '--INFO--');
    this.loggerMap.set('message', '----');
  }
  public log(text: string, type: 'error' | 'info' | 'message') {
    const currentDate = new Date().toISOString();
    let message = `${text} /// ${currentDate}`;
    this.loggerMap.forEach((key, value) => {
      if (key === type) {
        message = `${value} ${text} /// ${currentDate}`;
      }
    });
    Log.create({ text: message, type})
      .then(() => this.clear())
      .catch((err: Error) => {
        console.log(err)
        this.clear();
      });
  }

  private async clear(): Promise<any> {
    // clear old errors
    // clear all logs and infos older then one week
    const logs = await Log.find({});
    console.log(logs);
    const errors = logs.filter((log: ILog) => log.type === 'error');
    
  }
}

export default Logger;
