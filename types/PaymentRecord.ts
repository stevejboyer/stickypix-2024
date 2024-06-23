import Address from './Address';

export default interface PaymentRecord {
   transactionId: string | null;
   paymentMethod: string;
   providerPaymentId: string;
   paidDate: number;
   amountPaid: number;
   orderId: string;
   billingAddressSameAsShipping: boolean;
   billingAddress: Address;
}
