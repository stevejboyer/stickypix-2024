declare module BraintreeDropIn {
   type ShowOptions = {
      clientToken: string;
      threeDSecure?: {
         amount: number;
      };
   };

   type ShowResult = {
      nonce: string;
      description: string;
      type: string;
      isDefault: boolean;
   };

   function show(options: ShowOptions): Promise<ShowResult>;
}

export default BraintreeDropIn;
