import { ProductType } from './enums/ProductType';
import ProductVariant from './ProductVariant';
import ProductDescription from './ProductDescription';

export default interface Product {
   productType: ProductType;
   name: string;
   description: ProductDescription[];
   priceDescription: string[];
   images: string[];
   callToAction: string;
   isNew?: boolean;
   comingSoon?: boolean;
   variants: ProductVariant[];
}
