import config from '../../../config';
import Logger from '../../core/Logger';

function healthCheck(app: any) {
  const logger = Logger.getInstance();
  
  app.get('/health', (req, res) => {
    const data = {
      message: 'Server is up and running',
      port: config.PORT,
      uri: `kletskovg.tech:${config.PORT}/check`,
    };
    console.log('Health check on server was passed');
    logger.log('Health check on server was passed');
    res.status(200).send(JSON.stringify(data));
  });

  app.get('/logs', (req, res) => {
    const logs = logger.getLogs();
    let result = '';
    logs.forEach(str => {
      result += `<p> ${str}</p>`;
    });
    console.log(result);
    res.status(200).send(result);
  });
}

export default healthCheck;
