import React from 'react';
import { Tabs } from 'expo-router';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import ShoppingCartHeaderIcon from '@/components/ShoppingCartHeaderIcon';
import TabBar from '@/components/tabBar/TabBar';
import MaterialTabBarIcon from '@/components/tabBar/TabBarIcons/MaterialTabBarIcon';
import FontAwesomeTabBarIcon from '@/components/tabBar/TabBarIcons/FontAwesomeTabBarIcon';

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
				// Disable the static render of the header on web
				// to prevent a hydration error in React Navigation v6.
				headerShown: useClientOnlyValue(false, true),
			}}
			tabBar={props => <TabBar {...props} />}
		>
			<Tabs.Screen
				name="HomeTab"
				options={{
					title: 'Home',
					tabBarIcon: ({ color }) => (
						<FontAwesomeTabBarIcon
							name="home"
							color={color}
						/>
					),
					headerRight: () => <ShoppingCartHeaderIcon />,
				}}
			/>
			<Tabs.Screen
				name="OrderTab"
				options={{
					title: 'Order',
					tabBarIcon: ({ color }) => (
						<MaterialTabBarIcon
							name="add-to-photos"
							color={color}
						/>
					),
					headerRight: () => <ShoppingCartHeaderIcon />,
				}}
			/>
			<Tabs.Screen
				name="RewardsTab"
				options={{
					title: 'Rewards',
					tabBarIcon: ({ color }) => (
						<FontAwesomeTabBarIcon
							name="star"
							color={color}
						/>
					),
					headerRight: () => <ShoppingCartHeaderIcon />,
				}}
			/>
			<Tabs.Screen
				name="MoreTab"
				options={{
					title: 'More',
					tabBarIcon: ({ color }) => (
						<MaterialTabBarIcon
							name="more-horiz"
							color={color}
						/>
					),
					headerRight: () => <ShoppingCartHeaderIcon />,
				}}
			/>
		</Tabs>
	);
}
