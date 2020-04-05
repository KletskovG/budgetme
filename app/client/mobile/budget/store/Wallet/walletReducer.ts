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
  ADD_TRANSACTION,
  SET_EXPENSE_TRANSACTION,
  SET_AMOUNT_TRANSACTION,
  SET_TIME_TRANSACTION,
  SET_CATEGORY_TRANSACTION,
  SET_ACTIVE_WALLET,
  TOGGLE_CREATING
} from './types';
import ICategory from '../../interfaces/ICategory';

export type WalletState = {
  wallets: IWallet[];
  loading: boolean;
  error: Error | null;
  createTransaction: {
    isExpense: boolean;
    timestamp: string;
    category: ICategory | null;
    amount: number;
    isCreating: boolean
  };
}

export const initialWalletState: WalletState = {
  wallets: [],
  loading: false,
  error: null,
  createTransaction: {
    isExpense: false,
    timestamp: new Date().toISOString(),
    amount: 0,
    category: null,
    isCreating: false,
  }
}

export function WalletReducer (
  state = initialWalletState,
  action: WalletAction,
): WalletState {
  switch (action.type) {
    case GET_WALLETS_PENDING: {
      return {
        ...state,
        wallets: [...state.wallets],
        loading: true,
        error: null,
      }
    }
    case GET_WALLETS_SUCCESS: {
      return {
        ...state,
        wallets: [...action.payload as IWallet[]],
        loading: false,
        error: null,
      }
    }
    case GET_WALLETS_FAILURE: {
      return {
        ...state,
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
        ...state,
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
        createTransaction: {
          ...initialWalletState.createTransaction
        },
        wallets,
      }
    }
    case SET_EXPENSE_TRANSACTION: {
      return {
        ...state,
        createTransaction: {
          ...state.createTransaction,
          isExpense: !state.createTransaction.isExpense,
        }
      }
    }
    case SET_AMOUNT_TRANSACTION: {
      return {
        ...state,
        createTransaction: {
          ...state.createTransaction,
          amount: action.payload,
        }
      }
    }
    case SET_TIME_TRANSACTION: {
      console.log(action.payload);
      const date = new Date(action.payload).toISOString();
      console.log(date)
      return {
        ...state,
        createTransaction: {
          ...state.createTransaction,
          timestamp: date,
        }
      }
    }
    case SET_CATEGORY_TRANSACTION: {
      return {
        ...state,
        createTransaction: {
          ...state.createTransaction,
          category: action.payload,
        }
      }
    }
    case TOGGLE_CREATING: {
      return {
        ...state,
        createTransaction: {
          ...state.createTransaction,
          isCreating: !state.createTransaction.isCreating,
        }
      }
    }
    default: {
      return state
    }
  }
}

