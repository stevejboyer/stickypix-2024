import React, { useState } from 'react';
import {
	StyleSheet,
	FlatList,
	LayoutChangeEvent,
	Alert,
	Linking,
	TouchableWithoutFeedback,
	Animated,
	Easing,
} from 'react-native';
import { Text, View } from '@/components/Themed';
import Headline from '@/components/Headline';
import * as MediaLibrary from 'expo-media-library';
import { BlurView } from 'expo-blur';
import CameraRollPhoto from '@/types/CameraRollPhoto';
import SelectablePhoto from '@/components/SelectablePhoto';
import Product from '@/types/Product';
import ProductVariant from '@/types/ProductVariant';
import Spinner from '@/components/Spinner';
import Spacer from '@/components/Spacer';
import BoldText from '@/components/BoldText';
import LinkButton from '@/components/LinkButton';
// import AwesomeAlert from '@/AwesomeAlert';
import Selections from '@/components/Selections';

const CAMERA_ROLL = 'Camera Roll';

type AccessPrivilege = 'all' | 'limited' | 'none' | undefined;

const PhotoSelectionScreen = () => {
	product: Product;
	productVariant: ProductVariant;
	fanOutAnim: Animated.Value = new Animated.Value(0);
	productSetMinimumAlreadyMetInCart: boolean;


		this.product = props.navigation.getParam('product');
		this.productVariant = props.navigation.getParam('productVariant');
		this.productSetMinimumAlreadyMetInCart = props.navigation.getParam('productSetMinimumAlreadyMetInCart');
		if (!this.productVariant) {
			this.productVariant = this.product.variants[0];
		}

	const [albums, setAlbums] = useState<OurAlbum>([]);
	const [selectedPhotos, setSelectedPhotos] = useState<CameraRollPhoto>([]);
	const [selectedPhotosCount, setSelectedPhotosCount] = useState(0);
	const [scrollViewY, setScrollViewY] = useState(200);
	const [bottomY, setBottomY] = useState(400);
	const [loadingPhotos, setLoadingPhotos] = useState(true);
	const [activeAlbumIndex, setActiveAlbumIndex] = useState(0);
	const [photosFlatListKey, setPhotosFlatListKey] = useState(0);
	const [accessPrivileges, setAccessPrivileges] = useState<AccessPrivilege>(undefined);
	const [status, setStatus] = useState<'undetermined' | string>('undetermined');
	const [showInstructionsAlert, setShowInstructionsAlert] = useState(true);
	const [fannedOut, setFannedOut] = useState(false);

	useEffect(() => {
		async function getPermissions() {
			const permissionsResponse = await MediaLibrary.getPermissionsAsync();
			setAccessPrivileges(permissionsResponse.accessPrivileges);
			setStatus(permissionsResponse.status);
			setShowInstructionsAlert(true);
		}
		getPermissions();
	}, []);

	const getPhotoPermissions = async () => {
		let permissionsResponse = await MediaLibrary.getPermissionsAsync();
		if (permissionsResponse.accessPrivileges !== 'all') {
			permissionsResponse = await MediaLibrary.requestPermissionsAsync();
		}

		return permissionsResponse;
	};

	const retrieveAlbumsList = () => {
		return new Promise(async resolve => {
			const permissionsResponse = await getPhotoPermissions();
			const { accessPrivileges, status } = permissionsResponse;
			const cameraRoll = {
				album: {
					id: 'camera_roll',
					title: accessPrivileges === 'limited' ? `Photos You've Granted Access To` : 'Camera Roll',
					assetCount: -1,
					startTime: 1,
					endTime: 2,
				},
				photos: [],
				hasNextPage: true,
				endCursor: undefined,
			};

			let albums = [cameraRoll];
			if (accessPrivileges === 'all' || accessPrivileges === 'limited') {
				if (accessPrivileges === 'all') {
					const AlbumOptions = await MediaLibrary.getAlbumsAsync();
					albums = albums.concat(
						AlbumOptions.map((album: MediaLibrary.Album) => ({
							album,
							photos: [],
							hasNextPage: true,
							endCursor: undefined,
						}))
					);
				}

				setAlbums(albums);
				setLoadingPhotos(false);
				setAccessPrivileges(accessPrivileges);
				setStatus(status);
				resolve();
			} else {
				setLoadingPhotos(false);
				setAccessPrivileges(accessPrivileges);
				setStatus(status);
			}
		});
	}

	maybeGetPhotos() {
		const { hasNextPage, album, endCursor } = albums[activeAlbumIndex];
		if (loadingPhotos || !hasNextPage) {
			return;
		}

		let options: MediaLibrary.AssetsOptions = {
			first: 25,
			after: undefined,
		};

		if (album.id !== 'camera_roll') {
			options.album = album.id;
		}
		if (endCursor) {
			options.after = endCursor;
		}

		this.setState(
			{
				loadingPhotos: true,
			},
			async () => {
				const assets: MediaLibrary.PagedInfo<MediaLibrary.Asset> = await MediaLibrary.getAssetsAsync(options);
				this.assimilatePhotos(assets, activeAlbumIndex);
			}
		);
	}

	assimilatePhotos(assetsPage: MediaLibrary.PagedInfo<MediaLibrary.Asset>, albumIndex: number) {
		const { assets, endCursor, hasNextPage } = assetsPage;
		const newPhotos = assets.map(this.convertAssetToCameraRollPhoto);

		const { albums } = this.state;
		const album = albums[albumIndex];
		album.photos.push(...newPhotos);
		album.hasNextPage = hasNextPage;
		album.endCursor = endCursor;
		albums[albumIndex] = album;

		this.setState({
			albums,
			loadingPhotos: false,
		});
	}

	convertAssetToCameraRollPhoto(asset: MediaLibrary.Asset): CameraRollPhoto {
		const { creationTime, uri, width, height, id } = asset;
		if (width >= height) {
			var cropData = {
				x: (width - height) / 2,
				y: 0,
				side: height,
			};
		} else {
			var cropData = {
				x: 0,
				y: (height - width) / 2,
				side: width,
			};
		}

		return {
			id,
			selectedCount: 0,
			cropData,
			uri,
			width,
			height,
			creationTime,
			downloadUrl: null,
		};
	}

	_updateSelectedPhotoCount(photoIndex: number, incrementing: boolean) {
		const { albums, activeAlbumIndex, selectedPhotos, selectedPhotosCount, fannedOut } = this.state;
		const { productVariant } = this;
		if (incrementing && selectedPhotosCount === 5 * productVariant.quantityPerSet) {
			return;
		}

		const { photos } = albums[activeAlbumIndex];
		const selectedPhoto = photos[photoIndex];
		selectedPhoto.indexInAlbum = photoIndex;
		let newSelectedPhotosCount = selectedPhotosCount;

		selectedPhoto.selectedCount += incrementing ? 1 : -1;
		newSelectedPhotosCount += incrementing ? 1 : -1;

		const selectedPhotoIndex = selectedPhotos.findIndex(p => p.uri === selectedPhoto.uri);

		if (selectedPhotoIndex > -1) {
			// photo is in selected list
			selectedPhotos[selectedPhotoIndex].selectedCount = selectedPhoto.selectedCount;
			if (selectedPhoto.selectedCount === 0) {
				selectedPhotos.splice(selectedPhotoIndex, 1);
			}
		} else if (selectedPhoto.selectedCount > 0) {
			selectedPhotos.push(selectedPhoto);
		}

		photos[photoIndex] = selectedPhoto;
		albums[activeAlbumIndex].photos = photos;

		this.setState(
			{
				albums,
				selectedPhotos,
				selectedPhotosCount: newSelectedPhotosCount,
			},
			() => {
				if (newSelectedPhotosCount <= productVariant.quantityPerSet && fannedOut) {
					this._startSelectionsFanIn();
				}
			}
		);
	}

	_renderPhoto({ item, index }: { item: CameraRollPhoto; index: number }) {
		return (
			<SelectablePhoto
				key={index}
				index={index}
				data={item}
				count={item.selectedCount}
				onUpdatePhotoCount={this._updateSelectedPhotoCount}
			/>
		);
	}

	_renderAlbumName({ item, index }: { item: OurAlbum; index: number }) {
		const { activeAlbumIndex } = this.state;
		return (
			<TouchableWithoutFeedback onPress={() => this._onAlbumNamePress(index)}>
				<View style={[styles.albumName, activeAlbumIndex === index ? styles.activeAlbumName : null]}>
					<Text style={activeAlbumIndex === index ? styles.activeAlbumNameText : styles.inactiveAlbumNameText}>
						{item.album.title}
					</Text>
				</View>
			</TouchableWithoutFeedback>
		);
	}

	_onBottomLayout(nativeEvent: LayoutChangeEvent) {
		this.setState({
			bottomY: nativeEvent.nativeEvent.layout.y,
		});
	}

	_onScrollViewLayout(nativeEvent: LayoutChangeEvent) {
		this.setState({
			scrollViewY: nativeEvent.nativeEvent.layout.y,
		});
	}

	_calculateScrollViewHeight(bottomY: number, scrollViewY: number) {
		return bottomY && scrollViewY
			? {
					height: bottomY - scrollViewY - 10,
			  }
			: {};
	}

	_onNextButtonClicked() {
		const { state, product, productVariant } = this;
		const { selectedPhotos } = state;
		this.props.navigation.navigate('CroppingNavigator', {
			selectedPhotos,
			product,
			productVariant,
		});
	}

	_onAlbumNamePress(albumIndex: number) {
		const { maybeGetPhotos } = this;
		const { albums, photosFlatListKey } = this.state;
		this.setState(
			{
				activeAlbumIndex: albumIndex,
				photosFlatListKey: photosFlatListKey + 1,
			},
			() => {
				if (albums[albumIndex].photos.length === 0) {
					maybeGetPhotos();
				} else {
					console.log('not going to get photos for this album since we already have some stored in state');
				}
			}
		);
	}

	acknowledgeInstructions = () => {
		this.setState(
			{
				showInstructionsAlert: false,
			},
			async () => {
				await this.retrieveAlbumsList();
				this.maybeGetPhotos();
			}
		);
	};

	_onAddMorePress = () => {
		const { accessPrivileges } = this.state;
		if (accessPrivileges === 'limited') {
			Alert.alert(
				'Limited Photos Access',
				'Enable All Photos access or select additional photos in Settings. Then come back here.',
				[
					{
						text: 'Open Settings',
						onPress: Linking.openSettings,
					},
					// {
					//    text: 'Select Photos...',
					//    onPress: async () => {
					//       await this.retrieveAlbumsList();
					//       this.maybeGetPhotos();
					//    }
					// },
					{
						text: 'Cancel',
						onPress: () => console.log('Cancel Pressed'),
						style: 'cancel',
					},
				],
				{ cancelable: true }
			);
		} else if (accessPrivileges === 'none') {
			this.retrieveAlbumsList();
		}
	};

	_startSelectionsFanOut = () => {
		this.setState(
			{
				fannedOut: true,
			},
			() => {
				Animated.timing(this.fanOutAnim, {
					toValue: 1,
					duration: 300,
					easing: Easing.bezier(0.22, 1, 0.36, 1),
					useNativeDriver: false,
				}).start();
			}
		);
	};
	_startSelectionsFanIn = () => {
		Animated.timing(this.fanOutAnim, {
			toValue: 0,
			duration: 300,
			easing: Easing.bezier(0.22, 1, 0.36, 1),
			useNativeDriver: false,
		}).start(() => {
			this.setState({
				fannedOut: false,
			});
		});
	};

		const {
			activeAlbumIndex,
			albums,
			selectedPhotosCount,
			bottomY,
			scrollViewY,
			loadingPhotos,
			photosFlatListKey,
			showInstructionsAlert,
			accessPrivileges,
			status,
			selectedPhotos,
			fannedOut,
		} = state;
		const album = albums[activeAlbumIndex];

		const metMinimums =
			selectedPhotosCount >=
			(this.productSetMinimumAlreadyMetInCart ? 1 : productVariant.minimumSetsToStartOrder) *
				productVariant.quantityPerSet;
		const selectionCountIsGood =
			selectedPhotosCount > 0 && metMinimums && selectedPhotosCount % productVariant.quantityPerSet === 0;
		const buttonTitle = selectionCountIsGood
			? 'Done Selecting!'
			: '{0} more to finish this set'.replace(
					'{0}',
					(this.productSetMinimumAlreadyMetInCart || metMinimums
						? productVariant.quantityPerSet - (selectedPhotosCount % productVariant.quantityPerSet)
						: productVariant.minimumSetsToStartOrder * productVariant.quantityPerSet - selectedPhotosCount
					).toString()
			  );

		const nextGoodCount =
			productVariant.quantityPerSet *
			(Math.floor(selectedPhotosCount / productVariant.quantityPerSet) + (selectionCountIsGood ? 0 : 1));
		const setsCounts = Math.max(Math.ceil(selectedPhotosCount / productVariant.quantityPerSet), 1);
		const maxSelectionCountReached = setsCounts === 5;

		const flattenedPhotos: CameraRollPhoto[] = selectedPhotos
			.map(photo => Array(photo.selectedCount).fill(photo))
			.flat();

		const getNumberth = (count: number) => {
			return count === 1 ? '1st' : count === 2 ? '2nd' : count === 3 ? '3rd' : count === 4 ? '4th' : '5th';
		};
		const theme = ThemeProvider();
		const darkMode = Appearance.getColorScheme() === 'dark';
		return (
			<View style={styles.wrapper}>
				<>
					<View>
						<>
							<Spacer height={ifIphoneX(20, 30)} />
							{accessPrivileges === 'limited' && (
								<View style={styles.addMoreButtonWrapper}>
									<LinkButton
										text="+ Grant Access to More Photos"
										onPress={this._onAddMorePress}
									/>
								</View>
							)}
							<Headline
								text={`Select Your Photos`}
								center={true}
								fontName="dmsans"
								onBackPress={() => this.props.navigation.goBack()}
							/>
							{accessPrivileges === 'all' ? (
								<FlatList
									showsHorizontalScrollIndicator={false}
									horizontal={true}
									data={albums}
									renderItem={this._renderAlbumName}
									keyExtractor={(_, index) => index.toString()}
									style={styles.albumNames}
								/>
							) : accessPrivileges === 'limited' ? (
								<View style={styles.centeredText}>
									<Text>These are the photos you've granted access to.</Text>
									<Text>Now select which ones to print:</Text>
								</View>
							) : null}
							{(accessPrivileges === 'all' || accessPrivileges === 'limited') &&
							!!album &&
							album.photos.length > 0 ? (
								<FlatList
									data={album.photos}
									style={[styles.scrollView, this._calculateScrollViewHeight(bottomY, scrollViewY)]}
									numColumns={3}
									onLayout={_onScrollViewLayout}
									onEndReachedThreshold={0.5}
									onEndReached={maybeGetPhotos}
									scrollEventThrottle={250}
									renderItem={_renderPhoto}
									keyExtractor={(_, index) => index.toString()}
									key={photosFlatListKey}
								/>
							) : accessPrivileges === 'none' && status !== 'undetermined' ? (
								<View style={styles.noAccessInfoPanel}>
									<Spacer height={50} />
									<Headline
										text="Oh no! Access to Photos not granted."
										center={true}
									/>

									<Spacer height={20} />
									<MyButton
										text=" Grant Access In Settings "
										onPress={Linking.openSettings}
									/>
									<Spacer height={40} />
									<BoldText
										text="Note: Please provide access to ALL photos for best experience."
										center={true}
									/>
								</View>
							) : (
								<View style={styles.centered}>{loadingPhotos ? <Spinner /> : <Text>No photos here</Text>}</View>
							)}
							{fannedOut && (
								<TouchableWithoutFeedback onPress={this._startSelectionsFanIn}>
									<Animated.View
										style={{
											...StyleSheet.absoluteFillObject,
											opacity: this.fanOutAnim.interpolate({
												inputRange: [0, 1],
												outputRange: [0, 0.8],
											}),
										}}
									>
										<BlurView
											tint="dark"
											intensity={10}
											style={StyleSheet.absoluteFill}
										/>
									</Animated.View>
								</TouchableWithoutFeedback>
							)}
						</>
					</View>
					{/* <View onLayout={_onBottomLayout}>
						<>
							<Animated.View
								style={{
									opacity: this.fanOutAnim.interpolate({
										inputRange: [0, 1],
										outputRange: [1, 0],
									}),
								}}
							>
								<Text style={[styles.productName, { color: theme.black }]}>{`${product.name} Selections`}</Text>
							</Animated.View>

							<Spacer height={setsCounts * 13} />
							<Selections
								fanOutAnim={this.fanOutAnim}
								fannedOut={fannedOut}
								toBeginFanningOut={this._startSelectionsFanOut}
								selections={flattenedPhotos}
								onDelete={(indexInAlbum: number) => this._updateSelectedPhotoCount(indexInAlbum, false)}
								setsCounts={setsCounts}
								quantityPerSet={this.productVariant.quantityPerSet}
							/>
							<Spacer height={5} /> */}
							{/* {nextGoodCount - flattenedPhotos.length > 0 && (
                        <View style={styles.setCountInstructions}>
                           <Text
                              style={{
                                 color: theme.darkGray,
                                 fontWeight: 'bold',
                                 fontSize: 12,
                              }}>
                              {`Set ${setsCounts}:`}
                           </Text>
                           <Spacer width={5} />
                           <Text
                              style={{
                                 fontWeight: 'bold',
                              }}>
                              {`Select ${
                                 nextGoodCount - flattenedPhotos.length
                              }${!!flattenedPhotos.length ? ' more' : ''}`}
                           </Text>
                        </View>
                     )} */}
							{/* <View style={styles.instructionsRow}>
                        <BoldText
                           text={`${this.productVariant.name} sets: ${setsCounts}`}
                        />
                        <BoldText
                           text={`Selected Count: ${selectedPhotosCount}/${nextGoodCount}`}
                        />
                     </View> */}
							{/* <View style={{ alignItems: 'center' }}>
								<MyButton
									text={buttonTitle}
									disabled={!selectionCountIsGood}
									onPress={_onNextButtonClicked}
									arrow={selectionCountIsGood}
								/>
								<Spacer height={4} />
								<Text style={{ color: theme.darkGray }}>
									{selectedPhotosCount === 0
										? `get started with ${
												(this.productSetMinimumAlreadyMetInCart
													? 1
													: productVariant.minimumSetsToStartOrder) * productVariant.quantityPerSet
										  } photos`
										: ''}
									{selectedPhotosCount > 0 && metMinimums && !selectionCountIsGood
										? ``
										: selectedPhotosCount > 0 && !metMinimums
										? `minimum for first set is ${
												productVariant.minimumSetsToStartOrder * productVariant.quantityPerSet
										  }`
										: ''}
									{selectionCountIsGood && !maxSelectionCountReached
										? `keep adding to start a new set of ${product.name.toLowerCase()}!`
										: ' '}
									{selectionCountIsGood && maxSelectionCountReached
										? `you've reached the max you can select at a time`
										: ' '}
								</Text>
							</View>
						</>
					</View> */}
					{/* {showInstructionsAlert && (
						<AwesomeAlert
							acknowledgeText="Let's do this!"
							center={true}
							title="Instructions"
							// messages={[
							//    `Select photos for your ${productVariant.name} in sets of ${productVariant.quantityPerSet}.`,
							//    `(only those you select will be uploaded to our servers so we can print them)`,
							//    accessPrivileges !== 'all'
							//       ? 'For the best experience, please grant access to ALL photos.'
							//       : '',
							// ]}
							messages={[
								accessPrivileges !== 'all' ? 'For the best experience, please grant access to ALL photos.' : '',
								`Select the photos you want turned into Stickypix ${productVariant.name}!`,
								productVariant.minimumSetsToStartOrder > 1
									? `First ${
											productVariant.minimumSetsToStartOrder * productVariant.quantityPerSet
									  } are just $${productVariant.regularPrice.forStartingSets} with free shipping.`
									: '',
								productVariant.minimumSetsToStartOrder > 1
									? `Just $${productVariant.regularPrice.forAdditionalSets} for each additional set of ${productVariant.quantityPerSet}.`
									: `Select which photos you would like turned into Stickypix ${productVariant.name}, in sets of ${productVariant.quantityPerSet}`,
								// '(Privacy Note: only those you select will be uploaded to our servers so we can print them, and will then be deleted)',
							]}
							onDismiss={this.acknowledgeInstructions}
						/>
					)} */}
				</>
			</View>
		);
	}

	export default PhotoSelectionScreen;

const styles = StyleSheet.create({
	wrapper: {
		justifyContent: 'space-between',
		...StyleSheet.absoluteFillObject,
		paddingBottom: 50,
		),
		backgroundColor: theme.white,
	},
	scrollView: {
		height: 250, // gets over-ruled once calcuated
	},
	browser: {
		width: '100%',
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	instructionsRow: {
		width: '100%',
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	instructions: {
		textAlign: 'center',
	},
	albumNames: {
		paddingLeft: 5,
		paddingRight: 5,
		paddingBottom: 5,
	},
	albumName: {
		height: 25,
		paddingLeft: 12,
		paddingRight: 12,
		marginBottom: 5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	activeAlbumName: {
		backgroundColor: theme.blue,
		borderRadius: 20,
	},
	activeAlbumNameText: {
		color: theme.white,
	},
	inactiveAlbumNameText: {
		color: theme.black,
	},
	centered: {
		height: 300,
		justifyContent: 'center',
		alignItems: 'center',
	},
	centeredText: {
		alignItems: 'center',
		marginBottom: 15,
	},
	addMoreButtonWrapper: {
		alignSelf: 'center',
		alignItems: 'center',
		marginBottom: 20,
		width: '100%',
	},
	noAccessInfoPanel: {
		alignSelf: 'center',
		alignItems: 'center',
		width: '85%',
	},
	setCountInstructions: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	productName: {
		textAlign: 'center',
		fontSize: 15,
		fontFamily: 'DMSans-Bold',
	},
});
