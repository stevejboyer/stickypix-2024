import { CodeType } from './enums/CodeType';

export default interface OrderTotals {
   regularSubtotal: number;
   saleSubtotal: number;
   codeDiscount: {
      amount: number | null;
      code: string | null;
      codeType: CodeType | null;
      referringCustomerId: string | null;
   };
   stickyPointsRedeemedValue: number | null;
   preTaxAmount: number;
   taxAmount: number;
   finalTotal: number;
   isEstimate: boolean;
}
