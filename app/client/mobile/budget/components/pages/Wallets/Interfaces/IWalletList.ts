import IWallet from "../../../../interfaces/IWallet";

export interface IWalletList {
  wallets: IWallet[],
  addWallet(name: string): void; 
};
