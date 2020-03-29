import ICategory from "../../interfaces/ICategory";
import {CategoryAction, GET_CATEGORIES_PENDING, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_ERROR, DELETE_CATEGORY, UPDATE_CATEGORY_PENDING, UPDATE_CATEGORY_SUCCESS, UPDATE_CATEGORY_ERROR, CREATE_CATEGORY_PENDING, CREATE_CATEGORY_SUCCESS, CREATE_CATEGORY_ERROR} from './types';

export type CategoriesState = {
  categories: ICategory[],
  loading: boolean;
  error: Error | null;
}

const initialCategoriesState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

export const CategoriesReducer = (
  state = initialCategoriesState,
  action: CategoryAction
): CategoriesState => {
  switch (action.type) {
    case GET_CATEGORIES_PENDING: {
      return {
        ...state,
        loading: true,
        error: null,
      }
    }
    case GET_CATEGORIES_SUCCESS: {
      return {
        categories: [...action.payload],
        loading: false,
        error: null
      }
    }
    case GET_CATEGORIES_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }
    case DELETE_CATEGORY: {
      return {
        categories: [...action.payload],
        loading: false,
        error: null,
      }
    }
    case UPDATE_CATEGORY_PENDING: {
      return {
        ...state,
        loading: true,
        error: null,
      }
    }
    case UPDATE_CATEGORY_SUCCESS: {
      const stateCategories = [...state.categories];
      const index = stateCategories.findIndex(element => `${element._id}` === `${action.payload.id}`);
      stateCategories[index] = action.payload.category;
      return {
        loading: false,
        error: null,
        categories: [...stateCategories],
      }
    }
    case UPDATE_CATEGORY_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }
    case CREATE_CATEGORY_PENDING: {
      return {
        ...state,
        loading: true,
        error: null
      }
    }
    case CREATE_CATEGORY_SUCCESS: {
      return {
        loading: false,
        error: null,
        categories: [...action.payload],
      }
    }
    case CREATE_CATEGORY_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    }
    default: {
      return state
    }
  }
}