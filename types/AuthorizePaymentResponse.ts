import { BraintreeTransactionStatus } from '../types/enums/BraintreeTransactionStatus';

export default interface AuthorizePaymentResponse {
   success: boolean;
   status?: BraintreeTransactionStatus;
   transactionId?: string;
   legacyId?: string;
   error?: string;
}
