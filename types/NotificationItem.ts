import { NotificationType } from '../types/enums/NotificationType';

export default interface NotificationItem {
   itemType: NotificationType;
   read: boolean;
}
