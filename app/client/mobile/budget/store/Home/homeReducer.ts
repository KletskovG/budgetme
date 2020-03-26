import ISummary from "../../interfaces/ISummary";
import { HomeAction, GET_SUMMARY_PENDING, GET_SUMMARY_SUCCESS, GET_SUMMARY_ERROR, UPDATE_SUMMARY } from "./types";

export type HomeState = {
  summary: ISummary;
  loading: boolean;
  error: Error | null;
};

const initialHomeState: HomeState = {
  summary: {balanse: 0, expenses: 0, incomes: 0},
  loading: false,
  error: null,
}

export const HomeReducer = (state = initialHomeState, action: HomeAction): HomeState => {
  switch (action.type) {
    case GET_SUMMARY_PENDING: {
      return {
        ...state,
        loading: true,
        error: null,
      }
    }
    case GET_SUMMARY_SUCCESS: {
      return {
        loading: false,
        error: null,
        summary: action.payload,
      }
    }
    case GET_SUMMARY_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }
    case UPDATE_SUMMARY: {
      const updatedSummary = {...state.summary};
      if (action.payload.isExpense) {
        updatedSummary.balanse -= action.payload.count;
        updatedSummary.expenses -= action.payload.count;
      } else {
        updatedSummary.balanse += action.payload.count;
        updatedSummary.incomes += action.payload.count;
      }
      return {
        ...state,
        summary: updatedSummary,
      }
    }
    default:
      return state;
  }
}
