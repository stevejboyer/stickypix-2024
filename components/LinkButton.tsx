import React from 'react';
import { TouchableWithoutFeedback, StyleSheet, Text, View } from 'react-native';
import ThemeProvider from '../classes/ThemeProvider';

interface Props {
	text: string;
	onPress: () => void;
	style?: object;
}

const LinkButton = (props: Props) => {
	const { text, onPress, disabled, style } = props;

	return (
		<View style={[style, styles.wrapper]}>
			<TouchableWithoutFeedback onPress={onPress}>
				<View style={styles.button}>
					<Text style={styles.buttonText}>{text}</Text>
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
};

export default LinkButton;

const styles = StyleSheet.create({
	wrapper: {},
	button: {
		backgroundColor: 'pink',
		borderWidth: 2,
		borderColor: 'pink',
		borderRadius: 6,
		alignItems: 'center',
		paddingTop: 7,
		paddingBottom: 7,
		paddingLeft: 18,
		paddingRight: 18,
	},
	buttonText: {
		color: '#fff',
		fontWeight: '300',
		letterSpacing: 1,
		fontSize: 12,
	},
});
