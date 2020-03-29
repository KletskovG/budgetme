import ICategory from "../../../interfaces/ICategory";
import { Dispatch } from "react";
import { createCategoryPending, createCategoryError, createCategorySuccess } from "../actions";
import { config } from "../../../core/config";
import AsyncStorage from "@react-native-community/async-storage";

export const CreateCategoryAction = (category: ICategory) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(createCategoryPending());
    const id = await AsyncStorage.getItem('@id');
    return fetch(`${config.baseUrl}/category`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, category })
    })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        dispatch(createCategoryError(new Error(res.statusText)));
      }
    })
    .then((createdCategory: ICategory) => {
      dispatch(createCategorySuccess(createdCategory));
    })
    .catch(err => {
      dispatch(createCategoryError(err));
    })
  }
}