import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Text, View } from '@/components/Themed';
import Button from '@/components/Button';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
	const router = useRouter();
	const blurhash =
		'|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

	const placeholderImage = require('../../assets/images/icon.png');
	function handleStartOrderButtonClick() {
		router.navigate('/OrderTab');
	}

	return (
		<ScrollView>
			<View style={styles.container}>
				<Text style={styles.h1}>Photo Magnets to Remember</Text>
				<View style={styles.right}>
					<Image
						style={styles.fillImage}
						source={placeholderImage}
						placeholder={{ blurhash }}
						contentFit="contain"
					/>
				</View>
				<View style={styles.left}>
					<Image
						style={styles.fillImage}
						source={placeholderImage}
						placeholder={{ blurhash }}
						contentFit="contain"
					/>
				</View>
				<View style={styles.right}>
					<Text style={styles.h2}>Highest Quality Prints</Text>
				</View>
				<View style={styles.left}>
					<Image
						style={styles.fillImage}
						source={placeholderImage}
						placeholder={{ blurhash }}
						contentFit="contain"
					/>
				</View>
				<View style={styles.right}>
					<Image
						style={styles.fillImage}
						source={placeholderImage}
						placeholder={{ blurhash }}
						contentFit="contain"
					/>
				</View>
				<Button
					text="Start Order"
					onClick={handleStartOrderButtonClick}
				/>
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
		backgroundColor: '#F2F2F2',
		marginBottom: 180,
	},
	h1: {
		fontSize: 55,
		fontFamily: 'NotoSerif',
		fontWeight: 900,
		lineHeight: 65,
	},
	h2: {
		fontSize: 35,
		fontFamily: 'NotoSerif',
		fontWeight: 900,
		lineHeight: 45,
	},
	right: {
		alignSelf: 'flex-end',
		marginVertical: 70,
		height: 200,
		width: '75%',
	},
	left: {
		alignSelf: 'flex-start',
		marginVertical: 70,
		height: 200,
		width: '75%',
	},
	fillImage: {
		width: '100%',
		height: '100%',
	},
});
