import { ResizeMode, Video } from 'expo-av';
import React, { useCallback } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import RoundedButton from './components/RoundedButton';

SplashScreen.preventAutoHideAsync();

export default function App() {
	const [fontsLoaded] = useFonts({
		'Nunito-Medium': require('./assets/fonts/Nunito-Medium.ttf'),
		'Nunito-SemiBold': require('./assets/fonts/Nunito-SemiBold.ttf'),
		'Nunito-ExtraBold': require('./assets/fonts/Nunito-ExtraBold.ttf'),
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<View style={styles.container} onLayout={onLayoutRootView}>
			<Video
				style={styles.video}
				source={{
					uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
				}}
				useNativeControls={true}
				resizeMode={ResizeMode.COVER}
				isLooping
				shouldPlay
				isMuted
			/>
			<View style={styles.cta}>
				<View style={styles.text}>
					<Text style={styles.headline}>Stickypix Magnets</Text>
					{/* <Text style={styles.headline2}>Magnets</Text> */}
					<Text style={styles.subHeadline}> Photo prints you'll actually see</Text>
				</View>
				<RoundedButton text="Get Started" onPress={() => console.log('order now pressed')} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	video: {
		flex: 1,
		height: '100%',
		width: '100%',
	},
	cta: {
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		alignItems: 'center',
		justifyContent: 'flex-end',
		paddingBottom: 50,
	},
	text: {
		alignItems: 'flex-start',
		width: '100%',
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 100,
	},
	headline: {
		fontFamily: 'Nunito-ExtraBold',
		fontSize: 40,
		color: '#DE34FF',
		alignSelf: 'flex-start',
	},
	// headline2: {
	// 	fontFamily: 'Nunito-ExtraBold',
	// 	fontSize: 45,
	// 	color: '#DE34FF',
	// 	alignSelf: 'flex-start',
	// 	marginTop: -30,
	// },
	subHeadline: {
		fontFamily: 'Nunito-SemiBold',
		fontSize: 20,
		color: '#333',
		paddingTop: 0,
	},
});
