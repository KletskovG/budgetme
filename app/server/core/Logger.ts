import Log from '../../models/Log/Log';

class Logger {

  public logError(text: string) {
    const currentDate = new Date().toISOString();
    const message = `**!!Error!!** -- ${currentDate}  -- ${text}`;
    Log.create({ text: message, type: 'error' });
  }

  public logInfo() {

  }

  public logMessage() {

  }

  private clear() {

  }
}

export default Logger;
