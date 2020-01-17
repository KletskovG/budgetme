class Logger {
  private static instance: Logger;
  public logs: string[] = [];

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }

    return Logger.instance;
  }

  public log(message: string): void {
    const currentDate = new Date().toISOString();
    this.logs.push(`${currentDate}: ${message} \b`);

    if (this.logs.length >= 500) {
      this.logs = [];
    }
  }

  public getLogs(): string[] {
    return this.logs;
  }
  
}

export default Logger;
