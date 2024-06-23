import Order from './Order';
import OrderTotals from '../types/OrderTotals';
import PaymentRecord from './PaymentRecord';

interface PdfDetails {
   fileUrl: string;
   sheetCount: number;
   printedDate: string | null;
}

export default interface PlacedOrder extends Order {
   orderId: string;
   placedDate: number;
   printedDate: number | null;
   shippedDate: number | null;
   totals: OrderTotals;
   email: string;
   customerUid: string;
   paymentRecord: PaymentRecord | null;
   pointsEarned: number;
   PDFs?: {
      cover: PdfDetails;
      envelope: PdfDetails;
      magnet?: PdfDetails;
      sticker?: PdfDetails;
   };
}
