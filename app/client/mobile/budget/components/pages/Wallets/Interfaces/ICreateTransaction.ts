export interface ICreateTransaction {
  isCreateTransaction: boolean;
  close(isCreated: boolean): void;
}