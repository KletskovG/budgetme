import fs from 'fs';
import path from 'path';

class Logger {
  public file: string;

  constructor( file) {
  }

  public log(message) {
    message += '\b';
    fs.appendFile(this.file, message, (err) => {
      if (err) {
        throw err;
      }
      console.log(message);
    });
  }
}

export default Logger;
