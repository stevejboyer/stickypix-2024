import PlacedOrder from './PlacedOrder';
import Customer from './Customer';

export default interface PlaceOrderResult {
   error?: string;
   placedOrder: PlacedOrder;
   customer: Customer;
   pointsEarned: number;
}
