import { Dispatch } from "react"
import { config } from "../../../core/config"
import { getSummarySuccess, getSummaryError, getSummaryPending } from "../actions"

export const getSummaryAction = (id: string) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(getSummaryPending());
    console.log('GET SUMMARY PENDING')
    return fetch(`${config.baseUrl}/user/${id}/summary`)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error(res.statusText);
        }
      })
      .then((summary) => {
        console.log('SUCCESS');
        dispatch(getSummarySuccess(summary));
      })
      .catch((err: Error) => {
        console.table([err, err.message, err.name]);
        console.log('ERROR');
        dispatch(getSummaryError(err));
      })
  }
}