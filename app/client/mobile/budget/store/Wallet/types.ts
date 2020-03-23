export const ADD_WALLET_PENDING = 'ADD_WALLET_PENDING';
export const ADD_WALLET_SUCCESS = 'ADD_WALLET_SUCCESS';
export const ADD_WALLET_ERROR = 'ADD_WALLET_ERROR';
export const GET_WALLETS_PENDING = 'GET_WALLETS_PENDING';
export const GET_WALLETS_SUCCESS = 'GET_WALLETS_SUCCESS';
export const GET_WALLETS_FAILURE = 'GET_WALLETS_FAILURE';
export const DELETE_WALLET = 'DELETE_WALLET';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const ADD_INCOME = 'ADD_INCOME';
export const ADD_TRANSACTION = 'ADD_TRANSACTION';

import * as actions from './actions';
import { InferValueTypes } from '../typeFunctions';

export type WalletAction = ReturnType<InferValueTypes<typeof actions>>;
