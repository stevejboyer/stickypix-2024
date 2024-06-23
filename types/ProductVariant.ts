import ProductDimensions from '../types/ProductDimensions';
import Price from './Price';

export default interface ProductVariant {
   name: string;
   variantKey: string;
   description?: string[];
   quantityPerSet: number;
   minimumSetsToStartOrder: number;
   regularPrice: Price;
   salePrice: Price;
   dimensions: ProductDimensions;
   images?: string[];
}
