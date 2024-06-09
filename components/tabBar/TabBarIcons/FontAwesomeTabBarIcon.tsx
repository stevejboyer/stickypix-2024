import { FontAwesome } from '@expo/vector-icons';

const FontAwesomeTabBarIcon = (props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) => {
	return (
		<FontAwesome
			size={28}
			style={{ marginBottom: -3 }}
			{...props}
		/>
	);
};

export default FontAwesomeTabBarIcon;
