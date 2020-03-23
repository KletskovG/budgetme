import { Dispatch } from "react"
import IExpense from "../../../interfaces/IExpense"
import { config } from "../../../core/config"

export const addExpenseAction = (id: string, expense: IExpense) => {
  return async (dispatch: Dispatch<any>) => {
    return fetch(`${config.baseUrl}/expense`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id, ...expense}),
    })
    .then(res => res.json())
    .catch((err: Error) => {
      console.table([err, err.message, err.name]);
    })
  }
}