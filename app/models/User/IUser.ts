import IWallet from '../Wallet/IWallet';

export default interface IUser {
  first_name: string;
  id: number;
  last_name: string;
  username: string;
  wallet: IWallet;
  store: object;
}