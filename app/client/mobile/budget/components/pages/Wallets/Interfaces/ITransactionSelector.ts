export default interface ITransactionSelector {
  buttons: { title: string, isActive: boolean }[];
  change(item: string): void;
}