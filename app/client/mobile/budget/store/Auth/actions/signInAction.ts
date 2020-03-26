import { Dispatch } from "react"
import { signInPending } from "../actions"
import { config } from "../../../core/config";

export const SignInAction = (email: string, password: string) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(signInPending());
    fetch(`${config.baseUrl}/auth`, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
      .then(res => {
        if (res.status === 200) {

        } else {
          throw Error(res.statusText);
        }
      })
  }
}