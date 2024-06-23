export default interface Address {
   id: number;
   name: string;
   company?: string;
   line1: string;
   line2?: string;
   countryCode: string;
   city: string;
   stateCode: string;
   zip: string;
   isDefault: boolean;
   [key: string]: string | boolean | number | undefined;
}
