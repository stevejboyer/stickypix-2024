import { ScrollView, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Text, View } from '@/components/Themed';

export default function HomeScreen() {
	const blurhash =
		'|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

	const placeholderImage = require('../../assets/images/icon.png');
	return (
		<ScrollView>
			<View style={styles.container}>
				<Text style={styles.h1}>Photo Magnets to Remember</Text>
				<View style={styles.right}>
					<Image
						style={styles.rightImage}
						source={placeholderImage}
						placeholder={{ blurhash }}
						contentFit="contain"
					/>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		bottom: 0,
		paddingTop: 70,
		alignItems: 'flex-start',
		paddingHorizontal: 20,
		backgroundColor: '#eee',
	},
	h1: {
		fontSize: 55,
		fontFamily: 'NotoSerif',
		fontWeight: 900,
		paddingBottom: 10,
		lineHeight: 65,
	},
	right: {
		alignSelf: 'flex-end',
		marginVertical: 100,
		height: 200,
		width: '75%',
	},
	left: {
		alignSelf: 'flex-start',
		marginVertical: 100,
		height: 100,
	},
	rightImage: {
		width: '100%',
		height: '100%',
	},
});
