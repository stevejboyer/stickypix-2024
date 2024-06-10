import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from './Themed';

interface Props {
	color: string;
	fontSize: number;
}

export default function Logo(props: Props) {
	const { color, fontSize } = props;

	return (
		<View style={[styles.wrapper, { height: fontSize + 5 }]}>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Text style={[styles.stickypixText, { color, fontSize }]}>Stickypix</Text>
				<Text style={[styles.stickypixText, { fontSize, color }, styles.exclamation]}>!</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		marginTop: 10,
	},
	stickypixText: {
		fontFamily: 'NotoSerif-VariableFont',
		fontWeight: 600,
		paddingBottom: 10,
		letterSpacing: -0.3,
	},
	exclamation: {
		transform: [{ rotate: '15deg' }],
	},
	gradient: {
		flex: 1,
	},
});
