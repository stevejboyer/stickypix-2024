import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import Logo from '../Logo';
import ShoppingCartHeaderIcon from '../ShoppingCartHeaderIcon';
import { useColorScheme } from '@/components/useColorScheme';
import { getShade } from '@/constants/Colors';

const TabHeader = (props: BottomTabHeaderProps) => {
	const colorScheme = useColorScheme();

	return (
		<View style={styles.container}>
			<View />
			<View style={styles.logoWrapper}>
				<Logo
					color={getShade(colorScheme).tabIconInactive}
					fontSize={26}
				/>
			</View>
			<ShoppingCartHeaderIcon />
		</View>
	);
};

export default TabHeader;

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		height: 100,
		paddingTop: 50,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 10 },
		shadowRadius: 10,
		shadowOpacity: 0.1,
	},
	logoWrapper: {
		position: 'absolute',
		top: 50,
		right: 0,
		bottom: 0,
		left: 0,
		alignContent: 'center',
	},
});
