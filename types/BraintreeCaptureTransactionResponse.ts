import BraintreeResponse from './BraintreeResponse';
import { BraintreeTransactionStatus } from '../types/enums/BraintreeTransactionStatus';

export default interface BraintreeCaptureTransactionResponse
   extends BraintreeResponse {
   data: {
      captureTransaction: {
         transaction?: {
            id: string;
            legacyId: string;
            orderId: string;
            status: BraintreeTransactionStatus;
         };
      };
   } | null;
   errors?: any;
}
