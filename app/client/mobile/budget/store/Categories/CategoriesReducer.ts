import ICategory from "../../interfaces/ICategory";
import {CategoryAction, GET_CATEGORIES_PENDING, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_ERROR, DELETE_CATEGORY, UPDATE_CATEGORY_PENDING, UPDATE_CATEGORY_SUCCESS, UPDATE_CATEGORY_ERROR, CREATE_CATEGORY_PENDING, CREATE_CATEGORY_SUCCESS, CREATE_CATEGORY_ERROR} from './types';

export type CategoriesState = {
  incomes: ICategory[];
  expenses: ICategory[];
  loading: boolean;
  error: Error | null;
}

const initialCategoriesState: CategoriesState = {
  incomes: [],
  expenses: [],
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
        incomes: action.payload.filter(
          category => category.isExpense === false
          ),
        expenses: action.payload.filter(category => category.isExpense),
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
        incomes: [...state.incomes.filter(
          income => `${income._id}` !==  `${action.payload}`
        )],
        expenses: [...state.expenses.filter(
          expense => `${expense._id}` !== `${action.payload}`
        )],
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
      const expenses = [...state.expenses];
      const incomes = [...state.incomes];
      if (action.payload.category.isExpense) {
        const index = expenses.findIndex(
          element => `${element._id}` === `${action.payload.id}`,
        );
        expenses[index] = {...action.payload.category};
      } else {
        const index = incomes.findIndex(
          element => `${element._id}` === `${action.payload.id}`
        );
        incomes[index] = {...action.payload.category};
      }
      
      return {
        loading: false,
        error: null,
        expenses,
        incomes,
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
      const expenses = [...state.expenses];
      const incomes = [...state.incomes];
      if (action.payload.isExpense) {
        expenses.push(action.payload);
      } else {
        incomes.push(action.payload);
      }
      return {
        loading: false,
        error: null,
        expenses,
        incomes,
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