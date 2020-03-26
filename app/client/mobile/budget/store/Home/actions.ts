import { inferStringLiteral } from "../typeFunctions";
import { GET_SUMMARY_PENDING, GET_SUMMARY_SUCCESS, GET_SUMMARY_ERROR, UPDATE_SUMMARY } from "./types";
import ISummary from "../../interfaces/ISummary";
import ITransaction from "../../interfaces/ITransaction";

export const getSummaryPending = () => ({
  type: inferStringLiteral(GET_SUMMARY_PENDING),
  payload: null,
});

export const getSummarySuccess = (summary: ISummary) =>({
  type: inferStringLiteral(GET_SUMMARY_SUCCESS),
  payload: summary,
});

export const getSummaryError = (err: Error) => ({
  type: inferStringLiteral(GET_SUMMARY_ERROR),
  payload: err,
});

export const updateSummary = (transaction: ITransaction) => ({
  type: inferStringLiteral(UPDATE_SUMMARY),
  payload: transaction,
});
