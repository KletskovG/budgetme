import IWallet from "interfaces/IWallet";
import AsyncStorage from "@react-native-community/async-storage";
import { config } from "../../../core/config";

class WalletsService {
  public async getWallets(): Promise<IWallet[]> {
    const email = await AsyncStorage.getItem('@email');
    return new Promise((resolve, reject) => {
      fetch(`${config.baseUrl}/user/${email}/wallets`)
        .then(res => {
          if (res.status === 200) {
            return res.json();
          } else {
            reject('Server error');
          }
        })
        .then(res => resolve(res))
        .catch((err: Error) => {
          reject('Promise error');
        });
    })
  }

  public async addWallet(name: string): Promise<IWallet> {
    const email = await AsyncStorage.getItem('@email');
    // TODO: validate data here
    return new Promise((resolve, reject) => {
      if (name.trim().length > 0) {
        fetch(`${config.baseUrl}/wallet/create`, {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            name,
          }),
        })
          .then((res) => {
            if (res.status === 200) {
              return res.json();
            } else {
              reject('Server error');
            }
          })
          .then((createdWallet: IWallet) => {
            resolve(createdWallet);
          })
          .catch((err: Error) => {
            console.log(err);
            reject('Promise error');
          });
      } else {
        reject('Data is invalid');
      }
    })
  }
}

export default WalletsService;
