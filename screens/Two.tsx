import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function EditScreenInfo({ path }: { path: string }) {
	return (
		<View style={styles.getStartedContainer}>
			<Text style={styles.getStartedText}>Open up the code for this screen:</Text>
			<View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}></View>
		</View>
	);
}

const styles = StyleSheet.create({
	getStartedContainer: {
		alignItems: 'center',
		marginHorizontal: 50,
	},
	homeScreenFilename: {
		marginVertical: 7,
	},
	codeHighlightContainer: {
		borderRadius: 3,
		paddingHorizontal: 4,
	},
	getStartedText: {
		fontSize: 17,
		lineHeight: 24,
		textAlign: 'center',
	},
	helpContainer: {
		marginTop: 15,
		marginHorizontal: 20,
		alignItems: 'center',
	},
	helpLink: {
		paddingVertical: 15,
	},
	helpLinkText: {
		textAlign: 'center',
	},
});
