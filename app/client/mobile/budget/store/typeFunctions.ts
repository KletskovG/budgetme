import { WalletState } from "./Wallet";
import { HomeState } from "./Home/homeReducer";

export type InferValueTypes<T> = T extends { [key in string]: infer U } ? U : never;

export function inferLiteral<U, T extends U>(arg: T): T {
  return arg;
}

export function inferStringLiteral<T extends string>(arg: T): T {
  return inferLiteral<string, T>(arg);
}

export type RootState = {
  walletState: WalletState,
  homeState: HomeState,
}
