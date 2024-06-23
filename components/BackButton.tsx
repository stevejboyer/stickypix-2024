import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { getShade } from '@/constants/Colors';
const svgJson = require('../assets/img/icons/svg.json');

const BackIcon = () => {
	const colorScheme = useColorScheme();
	const colors = getShade(colorScheme);
	return (
		<View style={styles.wrapper}>
			<Svg
				height="30"
				width="30"
				viewBox="0 0 35 35"
			>
				<Path
					d={svgJson.leftArrow}
					fill={colors.black}
				/>
			</Svg>
		</View>
	);
};

export default BackIcon;

const styles = StyleSheet.create({
	wrapper: {
		height: 45,
		width: 55,
		padding: 10,
		justifyContent: 'space-around',
	},
});
