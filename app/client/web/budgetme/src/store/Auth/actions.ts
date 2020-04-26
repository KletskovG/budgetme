import {inferStringLiteral} from '../typeFunctions';
import { SIGN_IN_PENDING, SIGN_IN_SUCCESS, SIGN_IN_ERROR, SIGN_UP_PENDING, SIGN_UP_ERROR, SIGN_UP_SUCCESS, RESET_PASSWORD_PENDING, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_ERROR } from './types';

export const signInPending = () => ({
  type: inferStringLiteral(SIGN_IN_PENDING),
  payload: null,
});

export const signInSuccess = (id: string, email: string, isPremium: boolean) =>({
  type: inferStringLiteral(SIGN_IN_SUCCESS),
  payload: {
    id,
    email,
    isPremium,
  }
});

export const signInError = (err: Error) => ({
  type: inferStringLiteral(SIGN_IN_ERROR),
  payload: err,
});

export const signUpPending = () => ({
  type: inferStringLiteral(SIGN_UP_PENDING),
  payload: null,
});

export const signUpSuccess = (id: string, email: string) => ({
  type: inferStringLiteral(SIGN_UP_SUCCESS),
  payload: {
    id,
    email,
  }
});

export const signUpError = (err: Error) => ({
  type: inferStringLiteral(SIGN_UP_ERROR),
  payload: err,
});

export const resetPasswordPending = () => ({
  type: inferStringLiteral(RESET_PASSWORD_PENDING),
  payload: null,
});

export const resetPasswordSuccess = (password: string) => ({
  type: inferStringLiteral(RESET_PASSWORD_SUCCESS),
  payload: password,
});

export const resetPasswordError = (err: Error) => ({
  type: inferStringLiteral(RESET_PASSWORD_ERROR),
  payload: err,
});

