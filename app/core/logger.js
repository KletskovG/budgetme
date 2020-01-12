const path = require('path');
const fs = require('fs');

class Logger {
  constructor( file) {
    this.file = path.join(__dirname, `../logs/${file}`);
  };

  log(message) {
    message += '\b';
    fs.appendFile(this.file, message, function(err) {
      if (err) throw err;
      console.log('Saved!');
    });
  }
}

module.exports = Logger;