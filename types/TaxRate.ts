export default interface TaxRate {
   stateCode: string;
   zipCode: number;
   taxRegionName: string;
   stateRate: number;
   estimatedCombinedRate: number;
   estimatedCountyRate: number;
   estimatedCityRate: number;
   estimatedSpecialRate: number;
   riskLevel: number;
}
