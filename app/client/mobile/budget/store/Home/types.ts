export const GET_SUMMARY_PENDING = 'GET_SUMMARY_PENDING';
export const GET_SUMMARY_SUCCESS = 'GET_SUMMARY_SUCCESS';
export const GET_SUMMARY_ERROR = 'GET_SUMMARY_ERROR';


import * as actions from './actions';
import {InferValueTypes} from '../typeFunctions';

export type HomeAction = ReturnType<InferValueTypes<typeof actions>>;
