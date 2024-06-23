import React, { useEffect } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { interpolate, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

interface Props {
	iconColor: string;
	size: number;
	spinning: boolean;
}

const LogoIcon = (props: Props) => {
	const spinAnim = useSharedValue(0);

	const { iconColor, size, spinning } = props;

	useEffect(() => {
		if (spinning) {
			spinAnim.value = withRepeat(withTiming(1, { duration: 1200 }), -1);
		}
	});

	const innerAnimStyles = useAnimatedStyle(() => ({
		transform: [
			{
				rotate: `${interpolate(spinAnim.value, [0, 0.1, 0.8, 1], [0, 0, 270, 270])}deg`,
			},
		],
	}));
	const middleAnimStyles = useAnimatedStyle(() => ({
		transform: [
			{
				rotate: `${interpolate(spinAnim.value, [0, 0.1, 0.2, 0.9, 1], [0, 0, 0, 180, 180])}deg`,
			},
		],
	}));
	const outerAnimStyles = useAnimatedStyle(() => ({
		transform: [
			{
				rotate: `${interpolate(spinAnim.value, [0, 0.2, 0.4, 1], [0, 0, 0, 90])}deg`,
			},
		],
	}));

	return (
		<View style={[styles.wrapper, { width: size, height: size }]}>
			<Animated.View
				style={[
					styles.iconBox,
					{
						borderColor: iconColor,
						borderWidth: size * 0.08,
						borderRadius: size * 0.125,
					},
					outerAnimStyles,
				]}
			/>
			<Animated.View
				style={[
					styles.iconBox,
					{
						borderColor: iconColor,
						borderWidth: size * 0.08,
						borderRadius: size * 0.125,
					},
					styles.middle,
					middleAnimStyles,
				]}
			/>
			<Animated.View
				style={[
					styles.iconBox,
					{
						borderColor: iconColor,
						borderWidth: size * 0.08,
						borderRadius: size * 0.125,
					},
					styles.inner,
					innerAnimStyles,
				]}
			/>
		</View>
	);
};

export default LogoIcon;

const styles = StyleSheet.create({
	wrapper: {},
	iconBox: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		width: '100%',
		height: '100%',
	},
	middle: {
		width: '74%',
		height: '74%',
	},
	inner: {
		width: '48%',
		height: '48%',
	},
});
