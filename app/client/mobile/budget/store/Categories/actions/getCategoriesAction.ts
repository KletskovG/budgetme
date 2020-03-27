import { Dispatch } from "react"
import { config } from "../../../core/config"
import AsyncStorage from "@react-native-community/async-storage"
import { getCategoriesError, getCategoriesSuccess, getCategoriesPending } from "../actions"
import ICategory from "../../../interfaces/ICategory"

export const GetCategoriesAction = () => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(getCategoriesPending());
    const id = await AsyncStorage.getItem('@id');
    const requestString = `${config.baseUrl}/category/${id}`;
    console.log(requestString);
    fetch(`${config.baseUrl}/category/${id}`)
      .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          dispatch(getCategoriesError(new Error(res.statusText)));
        }
      })
      .then((categories: ICategory[]) => {
        console.log('LOGGING REQUEST')
        console.log(categories);
        dispatch(getCategoriesSuccess(categories))
      })
      .catch(err => {
        dispatch(getCategoriesError(err))
      })
  }
}