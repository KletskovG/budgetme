import config from '../../../server/config';
import fetch from 'node-fetch';

async function healthCheck(): Promise<boolean> {
  let result: boolean = await fetch<boolean>(`http://localhost:${config.PORT}/health`)
    .then(res => {
      result = true;
      return true;
    })
    .catch((err: Error) => {
      console.log(err);
      result = false;
      return false;
    });

  return result;
}


export default healthCheck;
