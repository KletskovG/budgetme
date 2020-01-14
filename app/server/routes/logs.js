const path = require('path');
const fs = require('fs');

function logs(app) {
  app.get('/logs/:file', (req ,res) => {
    const logs = fs.readFileSync(path.join(__dirname, `..logs/${req.params.file}`), 'utf8');
    res.send(logs);
  });
}

module.exports = logs;