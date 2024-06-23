import React from 'react';
import {
	TouchableOpacity,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
	Dimensions,
	Image,
	Text,
	Alert,
} from 'react-native';
import CameraRollPhoto from '../types/CameraRollPhoto';

const SCREEN_WIDTH = Dimensions.get('window').width;
const MINIMUM_DIMENSIONS_TO_PRINT = 500;

interface Props {
	data: CameraRollPhoto;
	count: number;
	index: number;
	updatePhotoCount: (photoIndex: number, incrementing: boolean) => void;
}

const SelectablePhoto = (props: Props) => {
	const { data, count, index, updatePhotoCount } = props;
	const { width, height } = data;
	const incrementCount = () => {
		if (width < MINIMUM_DIMENSIONS_TO_PRINT || height < MINIMUM_DIMENSIONS_TO_PRINT) {
			Alert.alert('Photo resolution too low', "Unfortunately we can't print this photo.", [{ text: 'Okay' }]);
			return;
		}
		updatePhotoCount(index, true);
	};

	const decrementCount = () => {
		updatePhotoCount(index, false);
	};

	const cannotPrint = width < MINIMUM_DIMENSIONS_TO_PRINT || height < MINIMUM_DIMENSIONS_TO_PRINT;

	return (
		<TouchableWithoutFeedback onPress={incrementCount}>
			<View style={styles.wrapper}>
				<>
					<Image
						style={styles.image}
						source={{ uri: data.uri }}
						resizeMode="cover"
					/>
					{!!count && (
						<View style={styles.selectedBox}>
							<View style={styles.buttonsWrapper}>
								<TouchableOpacity
									style={styles.buttonsBox}
									onPress={decrementCount}
								>
									<Text style={styles.selectedCountButton}>-</Text>
								</TouchableOpacity>
								<View style={styles.buttonsBox}>
									<Text style={styles.selectedCountText}>{count}</Text>
								</View>
								<TouchableOpacity
									style={styles.buttonsBox}
									onPress={incrementCount}
								>
									<Text style={styles.selectedCountButton}>+</Text>
								</TouchableOpacity>
							</View>
						</View>
					)}
					{cannotPrint && <View style={[styles.selectedBox, styles.cannotSelect]} />}
				</>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default SelectablePhoto;

const picSize = SCREEN_WIDTH / 3;
const styles = StyleSheet.create({
	wrapper: {
		width: picSize,
		height: picSize,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
		overflow: 'hidden',
	},
	image: {
		width: picSize,
		height: picSize,
	},
	selectedBox: {
		justifyContent: 'center',
		position: 'absolute',
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(27,255,198, 0.50)',
	},
	cannotSelect: {
		backgroundColor: 'rgba(255, 0, 0, 0.45)',
	},
	selectedCountText: {
		fontSize: 35,
		color: '#ffffff',
		textShadowColor: '#000000',
		textShadowOffset: { width: 0, height: 1 },
		textShadowRadius: 3,
	},
	selectedCountButton: {
		fontSize: 32,
		color: '#ffffff',
		textShadowColor: '#000000',
		textShadowOffset: { width: 0, height: 1 },
		textShadowRadius: 3,
	},
	buttonsWrapper: {
		width: '100%',
		height: picSize / 3,
		justifyContent: 'space-evenly',
		flexDirection: 'row',
	},
	buttonsBox: {
		alignItems: 'center',
		justifyContent: 'center',
		width: picSize / 3,
		height: picSize / 3,
	},
});
