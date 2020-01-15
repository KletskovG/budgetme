import IWallet from '../Wallet/IWallet';

export default interface IUser {
  firstName: string;
  id: number;
  lastName: string;
  username: string;
  wallet: IWallet;
  store: object;
}