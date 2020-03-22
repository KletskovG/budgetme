import IWallet from '../../interfaces/IWallet';
import { WalletAction, ADD_WALLET, GET_WALLET, CLEAR_WALLETS } from './types';

export type WalletState = {
  wallets: IWallet[];
}

const initialWalletState: WalletState = {
  wallets: []
}

export function WalletReducer (
  state = initialWalletState,
  action: WalletAction,
): WalletState {
  switch (action.type) {
    case ADD_WALLET:
      return {
        wallets: [...state.wallets, action.payload as IWallet],
      }
    case GET_WALLET: {
      return {
        wallets: [...action.payload as IWallet[]]
      }
    }
    case CLEAR_WALLETS: {
      return {
        wallets: [],
      }
    }
  
    default: {
      return state
    }
  }
}

