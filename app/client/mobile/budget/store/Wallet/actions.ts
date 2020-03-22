import { WalletState } from "./walletReducer";
import IWallet from "interfaces/IWallet";
import { ADD_WALLET, GET_WALLET, GET_WALLETS_PENDING, GET_WALLETS_SUCESS, GET_WALLETS_FAILURE, CLEAR_WALLETS } from "./types";


function inferLiteral<U, T extends U>(arg: T): T {
  return arg;
}

function inferStringLiteral<T extends string>(arg: T): T {
    return inferLiteral<string, T>(arg);
}


export function AddWallet (wallet: IWallet) {
  return {
    type: inferStringLiteral(ADD_WALLET),
    payload: wallet,
  };
}

export function GetWallets(wallets: IWallet[]) {
  return {
    type: inferStringLiteral(GET_WALLET),
    payload: wallets,
  };
}


export const getWalletsPending = () => ({
  type: inferStringLiteral(GET_WALLETS_PENDING),
});

export const getWalletsSuccess = (wallets: IWallet[]) => ({
  type: inferStringLiteral(GET_WALLETS_SUCESS),
  payload: wallets,
});

export const getWalletsError = (error: Error) => ({
  type: inferStringLiteral(GET_WALLETS_FAILURE),
  payload: error,
});

export function ClearWallets() {
  return {
    type: inferStringLiteral(CLEAR_WALLETS),
    payload: [],
  };
}


// export type WalletAction = ReturnType<typeof AddWallet | typeof GetWallets | typeof ClearWallets | typeof getWalletsPending | typeof get>;
