import { View, Text, useColorScheme, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { getShade } from '@/constants/Colors';

interface Props {
	text: string;
	onClick: () => void;
}

const Button = (props: Props) => {
	const colorScheme = useColorScheme();
	const { text, onClick } = props;
	const colors = getShade(colorScheme);
	return (
		<View style={styles.buttonWrapper}>
			<TouchableOpacity
				onPress={onClick}
				style={styles.touchable}
			>
				<View style={[styles.button, { borderColor: colors.tabIconActive }]}>
					<Text style={[styles.text, { color: colors.tabIconActive }]}>{text}</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default Button;

const styles = StyleSheet.create({
	buttonWrapper: {
		width: '100%',
		alignItems: 'center',
	},
	touchable: {
		width: '80%',
	},
	button: {
		height: 50,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		borderRadius: 15,
		borderCurve: 'continuous',
		borderWidth: 2,
		// shadowColor: '#B620E0',
		// shadowOffset: { width: 5, height: 5 },
		// shadowRadius: 1,
		// shadowOpacity: 1,
	},
	text: {
		fontSize: 18,
		fontWeight: 'bold',
	},
});
