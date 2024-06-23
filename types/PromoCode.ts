import { firestore } from 'firebase';

export default interface PromoCode {
   code: string;
   discountAmount: number;
   discountPercent: number;
   description?: string;
   maxNumUsesPerCustomer?: number;
   maxTotalNumUses?: number;
   totalUsesCount: number;
   startDate?: firestore.Timestamp;
   endDate?: firestore.Timestamp;
}
