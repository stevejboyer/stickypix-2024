import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, useColorScheme } from 'react-native';
import BackButton from './BackButton';
import { getShade } from '@/constants/Colors';

interface Props {
	text: string;
	onBackPress?: () => void;
}

const Headline = (props: Props) => {
	const colorScheme = useColorScheme();
	const colors = getShade(colorScheme);

	const { text, onBackPress } = props;

	const headlineStyles = {
		color: colors.black,
		fontSize: 22,
		fontFamily: 'SpaceMono',
	};

	return (
		<View style={styles.wrapper}>
			{onBackPress && (
				<TouchableOpacity
					onPress={onBackPress}
					style={styles.back}
				>
					<BackButton />
				</TouchableOpacity>
			)}
			<Text style={[headlineStyles]}>{text}</Text>
		</View>
	);
};

export default Headline;

const styles = StyleSheet.create({
	wrapper: {
		width: '100%',
		marginTop: 5,
		marginBottom: 15,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
	},

	back: {
		position: 'absolute',
		left: 20,
		width: 30,
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
