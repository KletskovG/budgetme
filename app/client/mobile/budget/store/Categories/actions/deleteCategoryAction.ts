import { Dispatch } from "react"
import { config } from "../../../core/config"
import AsyncStorage from "@react-native-community/async-storage"
import { deleteCategory } from "../actions"
import ICategory from "../../../interfaces/ICategory"

export const DeleteCategoryAction = (categoryId: string) => {
  return async (dispatch: Dispatch<any>) => {
    const id = await AsyncStorage.getItem('@id');
    console.log('DISPATCHING DELETE');
    return fetch(`${config.baseUrl}/category`, {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, categoryId })
    })
    .then(res => {
      if (res.status === 200) {
        console.log(res);
        try {
          return res.json();
        } catch (error) {
          return res;
        }
      } else {
        throw new Error (res.statusText);
      }
    })
    .then((categories: ICategory[]) => {
      console.log(categories);
      dispatch(deleteCategory(categories));
    })
    .catch(err => {
      console.log(err)
    });
  }
}