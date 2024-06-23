import BraintreeResponse from './BraintreeResponse';
import { BraintreeTransactionStatus } from '../types/enums/BraintreeTransactionStatus';

export default interface BraintreeAuthorizePaymentResponse
   extends BraintreeResponse {
   data: {
      authorizePaymentMethod?: {
         transaction?: {
            id: string;
            status: BraintreeTransactionStatus;
         };
      };
   } | null;
   errors?: any;
}
