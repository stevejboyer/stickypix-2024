import React from 'react';
import { View } from 'react-native';

interface Props {
	width?: number;
	height?: number;
}

const Spacer = (props: Props) => {
	const { width, height } = props;
	return (
		<View
			style={{
				width: width || '100%',
				height: height || 10,
			}}
		/>
	);
};

export default Spacer;
