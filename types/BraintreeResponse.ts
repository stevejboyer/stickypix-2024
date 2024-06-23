export default interface BraintreeResponse {
   data?: any;
   errors?: any;
   extensions?: { requestId: string };
}
