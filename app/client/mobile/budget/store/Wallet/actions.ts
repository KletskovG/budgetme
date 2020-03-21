import { WalletState } from "./walletReducer";
import IWallet from "interfaces/IWallet";

export const ADD_WALLET = 'ADD_WALLET';
export const GET_WALLET = 'GET_WALLET';


function inferLiteralFromString<T extends string>(arg: T): T {
  return arg;
}


export function addWallet (wallet: IWallet) {
  return {
    type: ADD_WALLET,
    payload: wallet
  }
}

export function GetWallets(wallets: IWallet[]) {
  return {
    type: GET_WALLET,
    payload: wallets
  }
}

export type WalletAction = ReturnType<typeof addWallet | typeof GetWallets>;