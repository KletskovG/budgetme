import IWallet from '../../../interfaces/IWallet';
import { Dispatch } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { config } from '../../../core/config';
import { deleteWallet } from '../actions';

export const deleteWalletAction = (wallet: IWallet) => {
  console.log('Should delelte wallet');
  console.log(wallet);
  return async (dispatch: Dispatch<any>) => {
    const email = await AsyncStorage.getItem('@email');
    return fetch(`${config.baseUrl}/wallet`, {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, id: wallet._id}),
    })
      .then(res => res.json())
      .then(deletedWallet => dispatch(deleteWallet(deletedWallet)))
      .catch((err: Error) => {
        console.table([err, err.message, err.name]);
      });
  }
}