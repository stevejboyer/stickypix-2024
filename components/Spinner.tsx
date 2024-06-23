import React from 'react';
import { StyleSheet, View } from 'react-native';
import LogoIcon from './LogoIcon';

interface Props {
	dark?: boolean;
}

export default function (props: Props) {
	const { dark } = props;

	return (
		<View style={styles.wrapper}>
			<LogoIcon
				iconColor={dark ? '333' : '#ffffff'}
				spinning={true}
				size={80}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		width: 50,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
