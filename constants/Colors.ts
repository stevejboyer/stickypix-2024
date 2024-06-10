import { ColorSchemeName } from 'react-native/Libraries/Utilities/Appearance';

const green = '#1BFFC6';
const purple = '#8B2FFF';
const pink = '#B620E0';
const white = '#fff';
const lightGray = '#ccc';
const darkGray = '#333';

interface Shade {
	text: string;
	background: string;
	tint: string;
	tabIconActive: string;
	tabIconInactive: string;
}

export function getShade(colorScheme: ColorSchemeName) {
	return shades[colorScheme || 'light'];
}

const shades: { [key: string]: Shade } = {
	light: {
		text: darkGray,
		background: white,
		tint: green,
		tabIconInactive: darkGray,
		tabIconActive: pink,
	},
	dark: {
		text: white,
		background: darkGray,
		tint: pink,
		tabIconInactive: lightGray,
		tabIconActive: green,
	},
};

export default shades;
