import { StickyPointsEventType } from './enums/StickyPointsType';

export default interface StickyPointsRecord {
   points: number;
   eventDate: number;
   pointsType: StickyPointsEventType;
}
