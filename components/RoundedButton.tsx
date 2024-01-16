import { useFonts } from 'expo-font';
import React, { useRef } from 'react';
import {
	ActivityIndicator,
	TouchableWithoutFeedback,
	StyleSheet,
	Text,
	View,
	ViewStyle,
	StyleProp,
} from 'react-native';
import Animated, {
	useSharedValue,
	withTiming,
	useAnimatedStyle,
	Easing,
	withSpring,
	AnimateStyle,
} from 'react-native-reanimated';
// import Arrow from './Arrow';
// import ThemeProvider from '../classes/ThemeProvider';

interface Props {
	working?: boolean;
	disabled?: boolean;
	arrow?: boolean;
	small?: boolean;
	text: string;
	onPress: () => void;
	color?: string;
}

export default function RoundedButton(props: Props) {
	const [fontsLoaded] = useFonts({
		'Nunito-SemiBold': require('../assets/fonts/Nunito-SemiBold.ttf'),
	});

	const scaleValue = useSharedValue(1);
	if (!fontsLoaded) {
		return null;
	}

	function handlePressIn() {
		scaleValue.value = withTiming(0.9, {
			duration: 100,
		});
	}

	function handlePressOut() {
		scaleValue.value = withTiming(1, {
			duration: 100,
		});
	}

	const { working, arrow, text, onPress, disabled, small, color } = props;

	const animatedStyle = {
		transform: [
			{
				scale: scaleValue,
			},
		],
	};

	const disabledViewStyle = disabled ? { backgroundColor: '#ddd' } : { backgroundColor: color || 'skyblue' };
	const disabledTextStyle = disabled ? { color: 'darkGray' } : {};

	return (
		<Animated.View style={animatedStyle}>
			<TouchableWithoutFeedback
				disabled={working || disabled}
				onPress={onPress}
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}
			>
				<View style={[styles.button, disabledViewStyle]}>
					{working ? (
						<ActivityIndicator color="white" />
					) : (
						<View style={styles.inner}>
							<Text style={[styles.buttonText, disabledTextStyle]}>{text}</Text>
						</View>
					)}
				</View>
			</TouchableWithoutFeedback>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 30,
		paddingTop: 13,
		paddingRight: 30,
		paddingBottom: 13,
		paddingLeft: 30,
	},
	inner: {
		width: '100%',
		alignItems: 'center',
	},
	buttonText: {
		fontSize: 19,
		color: '#fff',
		fontFamily: 'Nunito-Bold',
	},
	arrowWrapper: {
		position: 'absolute',
		right: 20,
		height: '100%',
		width: 50,
		alignItems: 'center',
		justifyContent: 'center',
	},
	gradientBackground: {
		position: 'absolute',
		top: 0,
	},
});
