export interface ICreateTransaction {
  id: string; // Id of the wallet
  isCreateTransaction: boolean;
  close(isCreated: boolean): void;
}