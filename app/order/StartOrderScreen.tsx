import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StartOrder() {
	return (
		<View style={styles.container}>
			<Text>here is the start order screen</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
