import { StyleSheet } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
	return (
		<View style={styles.tabBar}>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const label = options.title;

				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name, route.params);
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: 'tabLongPress',
						target: route.key,
					});
				};

				const color = isFocused ? '#673ab7' : '#222';

				return (
					<TouchableOpacity
						accessibilityRole="button"
						accessibilityState={isFocused ? { selected: true } : {}}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarTestID}
						onPress={onPress}
						onLongPress={onLongPress}
						style={styles.tabBarIcon}
						key={route.key}
					>
						{options.tabBarIcon?.({ focused: isFocused, color, size: 24 })}
						<Text style={{ color }}>{label}</Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	tabBar: {
		bottom: 125,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 50,
		marginRight: 15,
		marginLeft: 15,
		borderRadius: 25,
		borderCurve: 'continuous',
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 10 },
		shadowRadius: 10,
		shadowOpacity: 0.1,
		backgroundColor: 'white',
	},
	tabBarIcon: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default TabBar;
