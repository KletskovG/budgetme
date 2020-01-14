import config from '../../../config';

function healthCheck(app: any) {

  app.get('/health', (req, res) => {
    const data = {
      message: 'Server is up and running',
      port: config.PORT,
      uri: `kletskovg.tech:${config.PORT}/check`,
    };
    console.log('Health check on server was passed');
    res.status(200).send(JSON.stringify(data));
  });
}

export default healthCheck;
