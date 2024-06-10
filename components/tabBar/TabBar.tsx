import { StyleSheet } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
	const colorScheme = useColorScheme();

	return (
		<View style={{ position: 'relative' }}>
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

					const color = isFocused ? Colors[colorScheme ?? 'light'].tint : '#222';

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
							<Text style={{ color, paddingTop: 3 }}>{label}</Text>
						</TouchableOpacity>
					);
				})}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	tabBar: {
		position: 'absolute',
		bottom: 25,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: 'white',
		marginHorizontal: 20,
		paddingVertical: 13,
		borderRadius: 25,
		borderCurve: 'continuous',
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 10 },
		shadowRadius: 10,
		shadowOpacity: 0.1,
	},
	tabBarIcon: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 4,
	},
});

export default TabBar;
