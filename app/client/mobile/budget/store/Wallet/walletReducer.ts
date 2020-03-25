import IWallet from '../../interfaces/IWallet';
import { 
  WalletAction,
  GET_WALLETS_PENDING,
  GET_WALLETS_SUCCESS,
  GET_WALLETS_FAILURE,
  ADD_WALLET_PENDING,
  ADD_WALLET_ERROR,
  ADD_WALLET_SUCCESS,
  DELETE_WALLET,
  ADD_INCOME,
  ADD_EXPENSE,
  ADD_TRANSACTION
} from './types';

export type WalletState = {
  wallets: IWallet[];
  loading: boolean;
  error: Error | null;
}

export const initialWalletState: WalletState = {
  wallets: [],
  loading: false,
  error: null,
}

export function WalletReducer (
  state = initialWalletState,
  action: WalletAction,
): WalletState {
  switch (action.type) {
    case GET_WALLETS_PENDING: {
      return {
        wallets: [...state.wallets],
        loading: true,
        error: null,
      }
    }
    case GET_WALLETS_SUCCESS: {
      return {
        wallets: [...action.payload as IWallet[]],
        loading: false,
        error: null,
      }
    }
    case GET_WALLETS_FAILURE: {
      return {
        wallets: [...state.wallets],
        loading: false,
        error: null,
      }
    }  
    case ADD_WALLET_PENDING: {
      return {
        ...state,
        loading: true,
        error: null,
      }
    }
    case ADD_WALLET_SUCCESS: {
      return {
        wallets: [...state.wallets, action.payload],
        loading: false,
        error: null,
      }
    }
    case ADD_WALLET_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }
    case DELETE_WALLET: {
      return {
        ...state,
        wallets: state.wallets.filter((wallet: IWallet) => wallet._id !== action.payload._id),
      }
    }
    case ADD_TRANSACTION: {
      const requiredWallet = state.wallets.find((wallet: IWallet) => wallet._id === action.payload._id);
      const walletIndex = state.wallets.indexOf(requiredWallet as IWallet);
      const wallets = [...state.wallets];
      wallets[walletIndex] = action.payload;
      return {
        ...state,
        wallets,
      }
    }
    default: {
      return state
    }
  }
}

