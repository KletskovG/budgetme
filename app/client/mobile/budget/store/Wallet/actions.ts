import IWallet from "interfaces/IWallet";
import { GET_WALLETS_PENDING, GET_WALLETS_SUCCESS, GET_WALLETS_FAILURE, ADD_WALLET_PENDING, ADD_WALLET_SUCCESS, ADD_WALLET_ERROR, DELETE_WALLET, ADD_INCOME, ADD_EXPENSE, ADD_TRANSACTION } from "./types";
import { inferStringLiteral } from "../typeFunctions";

export const addWalletPending = () => ({
  type: inferStringLiteral(ADD_WALLET_PENDING),
  payload: null,
});

export const addWalletSuccess = (wallet: IWallet) => ({
  type: inferStringLiteral(ADD_WALLET_SUCCESS),
  payload: wallet,
})

export const addWalletFailure = (error: Error) => ({
  type: inferStringLiteral(ADD_WALLET_ERROR),
  payload: error,
})

export const getWalletsPending = () => ({
  type: inferStringLiteral(GET_WALLETS_PENDING),
  payload: null
});

export const getWalletsSuccess = (wallets: IWallet[]) => ({
  type: inferStringLiteral(GET_WALLETS_SUCCESS),
  payload: wallets,
});

export const getWalletsError = (error: Error) => ({
  type: inferStringLiteral(GET_WALLETS_FAILURE),
  payload: error,
});

export const deleteWallet = (wallet: IWallet) => ({
  type: inferStringLiteral(DELETE_WALLET),
  payload: wallet,
});

export const addTransaction = (wallet: IWallet) => ({
  type: inferStringLiteral(ADD_TRANSACTION),
  payload: wallet,
})

