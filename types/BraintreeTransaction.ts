import { BraintreeTransactionStatus } from './enums/BraintreeTransactionStatus';

export default interface BraintreeTransaction {
   id: string;
   transaction: BraintreeTransactionStatus;
}
