import { Dispatch } from "react"
import { config } from "../../../core/config"
import { getSummarySuccess, getSummaryError, getSummaryPending } from "../actions"

export const getSummaryAction = (id: string) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(getSummaryPending());
    return fetch(`${config.baseUrl}/user/${id}/summary`)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error(res.statusText);
        }
      })
      .then((summary) => {
        console.log(summary);
        dispatch(getSummarySuccess(summary));
      })
      .catch((err: Error) => {
        console.table([err, err.message, err.name]);
        dispatch(getSummaryError(err));
      })
  }
}