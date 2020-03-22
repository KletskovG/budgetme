export const ADD_WALLET = 'ADD_WALLET';
export const GET_WALLET = 'GET_WALLET';
export const CLEAR_WALLETS = 'CLEAR_WALLETS';
export const GET_WALLETS_PENDING = 'GET_WALLETS_PENDING';
export const GET_WALLETS_SUCESS = 'GET_WALLETS_PENDING';
export const GET_WALLETS_FAILURE = 'GET_WALLETS_PENDING';

import * as actions from './actions';


type InferValueTypes<T> = T extends { [key in string]: infer U } ? U : never;

export type WalletAction = ReturnType<InferValueTypes<typeof actions>>;
