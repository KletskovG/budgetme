import IWallet from '../../../interfaces/IWallet';
import { Dispatch } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { config } from '../../../core/config';
import { addWalletPending, addWalletSuccess, addWalletFailure } from '../actions';

export const addWalletAction = (name: string) => {
  return async (dispatch: Dispatch<any>) => {
    const email = await AsyncStorage.getItem('@email');
    dispatch(addWalletPending());
    return fetch(`${config.baseUrl}/wallet`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        name,
      }),
    })
      .then(res => res.json())
      .then((createdWallet: IWallet) =>
        dispatch(addWalletSuccess(createdWallet)),
      )
      .catch((err: Error) => dispatch(addWalletFailure(err)));
  }
}