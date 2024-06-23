import Address from './Address';
import OrderItem from './OrderItem';

export default interface Order {
	createdDate: number;
	shippingAddress: Address | null;
	items: OrderItem[];
}
