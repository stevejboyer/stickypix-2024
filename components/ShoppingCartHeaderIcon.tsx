import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useColorScheme } from '@/components/useColorScheme';

const ShoppingCartHeaderIcon = () => {
	const colorScheme = useColorScheme();

	return (
		<Link
			href="/modal"
			asChild
		>
			<Pressable>
				{({ pressed }) => (
					<Feather
						name="shopping-cart"
						size={23}
						color={Colors[colorScheme ?? 'light'].text}
						style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
					/>
				)}
			</Pressable>
		</Link>
	);
};

export default ShoppingCartHeaderIcon;
