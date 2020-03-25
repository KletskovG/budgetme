import { AuthAction, SIGN_IN_ERROR, SIGN_IN_PENDING, SIGN_IN_SUCCESS, SIGN_UP_ERROR, SIGN_UP_PENDING, SIGN_UP_SUCCESS, RESET_PASSWORD_PENDING, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_ERROR } from "./types";
import { inferStringLiteral } from "store/typeFunctions";
import { SafeAreaContext } from "react-native-safe-area-context";

export type AuthState = {
  isAuthed: boolean;
  email: string;
  isPremium: boolean;
  id: string;
  loading: boolean;
  error: Error | null;
}

export const initialAuthState: AuthState = {
  isAuthed: false,
  email: '',
  isPremium: false,
  id: '',
  loading: false,
  error: null,
};

export function AuthReducer (
  state: AuthState = initialAuthState,
  action: AuthAction,
): AuthState {
  switch (action.type) {
    case SIGN_IN_PENDING: {
      return {
        ...state,
        loading: true,
        error: null,
      }
    }
    case SIGN_IN_SUCCESS: {
      return {
        isAuthed: true,
        loading: false,
        error: null,
        isPremium: action.payload.isPremium,
        email: action.payload.email,
        id: action.payload.id,
      }
    }
    case SIGN_IN_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }
    case SIGN_UP_PENDING: {
      return {
        ...state,
        loading: true,
        error: null,
      }
    }
    case SIGN_UP_SUCCESS: {
      return {
        loading: false,
        error: null,
        isPremium: false,
        email: action.payload.email,
        id: action.payload.id,
        isAuthed: true,
      }
    }
    case SIGN_UP_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthed: false,
      }
    }
    case RESET_PASSWORD_PENDING: {
      return {
        ...state,
        loading: true,
        error: null,
      }
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        isAuthed: true,
        loading: false,
        error: null,
      }
    }
    case RESET_PASSWORD_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    }
    default:
      return state;
  }
}
