import * as actions from './actions';
import {InferValueTypes} from '../typeFunctions';

export const SIGN_UP_PENDING = 'SIGN_UP_PENDING';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR';
export const SIGN_IN_PENDING = 'SIGN_IN_PENDING';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR';
export const RESET_PASSWORD_PENDING = 'RESET_PASSWORD_PENDING';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';
export type AuthAction = ReturnType<InferValueTypes<typeof actions>>; 