import Product from './Product';

export default interface AppConfiguration {
   configurationDate: number;
   configurationType: string;
   pointsEarnedForSigningUp: number;
   pointsEarnedPerReferral: number;
   referralDiscountAmount: number;
   products: Product[];
}
