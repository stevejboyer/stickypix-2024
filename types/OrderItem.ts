import ProductVariant from './ProductVariant';
import CameraRollPhoto from './CameraRollPhoto';
import { ProductType } from './enums/ProductType';

export default interface OrderItem {
   productName: string;
   productType: ProductType;
   productVariant: ProductVariant;
   photos: CameraRollPhoto[];
   quantity: number;
   overallIndex?: number;
}
