import { GET_CATEGORIES_PENDING, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_ERROR, DELETE_CATEGORY, UPDATE_CATEGORY_PENDING, UPDATE_CATEGORY_SUCCESS, UPDATE_CATEGORY_ERROR, CREATE_CATEGORY_PENDING, CREATE_CATEGORY_SUCCESS, CREATE_CATEGORY_ERROR, GET_EMOJIS } from "./types";
import {inferStringLiteral} from '../typeFunctions';
import ICategory from "../../interfaces/ICategory";
import IEmoji from "../../interfaces/IEmoji";

export const getCategoriesPending = () => ({
  type: inferStringLiteral(GET_CATEGORIES_PENDING),
  payload: null,
});

export const getCategoriesSuccess = (categories: ICategory[]) => ({
  type: inferStringLiteral(GET_CATEGORIES_SUCCESS),
  payload: categories,
});

export const getCategoriesError = (err: Error) => ({
  type: inferStringLiteral(GET_CATEGORIES_ERROR),
  payload: err,
});

export const deleteCategory = (categories: ICategory[]) => ({
  type: inferStringLiteral(DELETE_CATEGORY),
  payload: categories,
});

export const updateCategoryPending = () => ({
  type: inferStringLiteral(UPDATE_CATEGORY_PENDING),
  payload: null,
});

export const updateCategorySuccess = (id: string, category: ICategory) => ({
  type: inferStringLiteral(UPDATE_CATEGORY_SUCCESS),
  payload: {
    id,
    category
  }
});

export const updateCategoryError = (err: Error) => ({
  type: inferStringLiteral(UPDATE_CATEGORY_ERROR),
  payload: err
});

export const createCategoryPending = () => ({
  type: inferStringLiteral(CREATE_CATEGORY_PENDING),
  payload: null,
});

export const createCategorySuccess = (categories: ICategory[]) => ({
  type: inferStringLiteral(CREATE_CATEGORY_SUCCESS),
  payload: categories,
});

export const createCategoryError = (err: Error) => ({
  type: inferStringLiteral(CREATE_CATEGORY_ERROR),
  payload: err
});

export const getEmojis = (emoji: IEmoji) => ({
  type: inferStringLiteral(GET_EMOJIS),
  payload: emoji,
});
