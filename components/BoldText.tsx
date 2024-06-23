import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ThemeProvider from '../classes/ThemeProvider';

interface Props {
	text: string;
	center?: boolean;
	color?: string;
	large?: boolean;
	index?: number;
}

export default function () {
	const { text, center, color, large, index } = this.props;

	return (
		<View style={styles.wrapper}>
			<Text
				style={[
					styles.text,
					center ? { textAlign: 'center' } : {},
					color ? { color } : {},
					large ? { fontSize: index ? 20 - index * 2 : 20 } : {},
				]}
			>
				{text}
			</Text>
		</View>
	);
}

const theme = ThemeProvider();
const styles = StyleSheet.create({
	wrapper: {
		paddingBottom: 5,
	},
	text: {
		fontWeight: '700',
		fontSize: 15,
		color: theme.black,
	},
});
