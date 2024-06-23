export default interface CameraRollPhoto {
   id: string;
   selectedCount: number;
   uri: string;
   width: number;
   height: number;
   creationTime: number;
   isFavorite?: boolean;
   orientation?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
   cropData: {
      x: number;
      y: number;
      side: number;
   };
   downloadUrl: string | null;
   indexInAlbum?: number;
}
