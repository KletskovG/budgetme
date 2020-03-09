import IWallet from "../../../../interfaces/IWallet";

export interface IWalletList {
  wallets: IWallet[],
  onNavigateToWallet(isToggle: boolean): void,
  addWallet(name: string): void; 
};
