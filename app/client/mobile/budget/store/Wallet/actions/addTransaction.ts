import ITransaction from "../../../interfaces/ITransaction";
import { config } from "../../../core/config";
import { Dispatch } from "react";
import {addTransaction} from '../actions';
import IWallet from "../../../interfaces/IWallet";
import { updateSummary } from "../../../store/Home/actions";

export const addTransactionAction = (id: string, transaction: ITransaction, isExpense: boolean) => {
  const apiString = `${config.baseUrl}/wallet/${isExpense? 'expense/': 'income/'}`;
  return async (dispatch: Dispatch<any>) => {
    return fetch(apiString, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id, ...transaction})
    })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw Error(res.statusText);
      }
    })
    .then((updatedWallet: IWallet) => {
      dispatch(addTransaction(updatedWallet));
      dispatch(updateSummary({...transaction, isExpense}));
    })
    .catch((err: Error) => {
      console.table(err, err.name, err.message);
    })
  }
}