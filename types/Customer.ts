import Address from './Address';
import Order from './Order';

export default interface Customer {
   uid: string;
   authUid: string;
   name: string | null;
   email: string | null;
   createdDate: number;
   currentOrder: Order | null;
   isAnonymous: boolean;
   stickyPointsAvailable: number;
   pastOrderCount: number;
   referralCode?: string;
}
