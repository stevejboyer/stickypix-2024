export default interface OurAlbum {
	album: MediaLibrary.Album;
	photos: CameraRollPhoto[];
	hasNextPage: boolean;
	endCursor: string | undefined;
}
