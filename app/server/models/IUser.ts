import { IWallet } from './IWallet';

export interface IUser {
  first_name: string;
  id: number;
  last_name: string;
  username: string;
  wallets: IWallet[];
}