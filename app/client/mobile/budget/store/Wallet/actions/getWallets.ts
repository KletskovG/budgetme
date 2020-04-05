import { getWalletsPending, getWalletsSuccess, getWalletsError } from "../actions"
import AsyncStorage from "@react-native-community/async-storage";
import {config} from '../../../core/config';
import IWallet from "../../../interfaces/IWallet";
import { Dispatch } from "react";


export function getWalletsAction() {
  return async (dispatch: Dispatch<any>) => {
    const email = await AsyncStorage.getItem('@email');
    dispatch(getWalletsPending());
    console.log(`${config.baseUrl}/user/${email}/wallet`);
    return fetch(`${config.baseUrl}/user/${email}/wallet`)
      .then(res => res.json())
      .then(json =>  {
        console.log(json)
        console.log('SUCCESS;')
        dispatch(getWalletsSuccess(json));
        return json
      })
      .catch((error: Error) => {
        console.log('ERROr');
        console.log(error)
        dispatch(getWalletsError(error));
      });
  }
}

function handleErrors(response: Response) {
  if (response.status !== 200) {
    throw Error(response.statusText);
  }
  return response;
}