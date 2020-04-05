export interface ICreateTransaction {
  id: string; // Id of the wallet
  close(isCreated: boolean): void;
  navigation: any;
}