import React, { memo, useState } from 'react';
import { StyleSheet, View, Image} from 'react-native';
import Carousel, { Pagination } from "react-native-snap-carousel";
import {Border } from "../../../GlobalStyles";
import { ScaleDimention } from '../../../GlobalStyles';
import { getImageFullPath } from '../../../utils';
import { useSelector } from 'react-redux';
const { height, width } = ScaleDimention;


const MyPager = memo(({ banner }) => {
	const [activeIndex, setActiveIndex] = useState(0)
	const config = useSelector((state) => state.config.configUrls);

	const renderItem = ({ item }) => {
		const imageurl=`${config?.imagebasePath}/${item?.image}`;
		return (
			<Image resizeMode='cover' source={{uri:imageurl}} style={[
				styles.homescreenOption1Inner,
			]} />
		);
	};

	return (
		<View style={styles.pagerView}>
			<Carousel
				data={banner}
				renderItem={renderItem}
				sliderWidth={width - 60}
				itemWidth={width - 60}
				loop={true}
				autoplay={true}
				enableSnap={true}
				enableMomentum={true}
				loopClonesPerSide={banner.length}
				onSnapToItem={setActiveIndex}
			/>
			<Pagination
				autoplay={true}
				loop={true}
				dotsLength={banner.length}
				activeDotIndex={activeIndex}
				containerStyle={{
					alignSelf: 'center',
					paddingVertical: 0,
					marginTop: 8
				}}
				dotStyle={{
					width: 10,
					height: 10,
					borderRadius: 5,
					backgroundColor: 'gray',
				}}
				inactiveDotOpacity={0.4}
				inactiveDotScale={0.6}
			/>
		</View>
	);
});

const styles = StyleSheet.create({
	pagerView: {
		alignItems: 'center',
		alignSelf: 'center',
		marginHorizontal: 30,
		width: width
	},

	homescreenOption1Inner: {
		width: width - 60,
		height: 156,
		borderRadius: Border.br_xl,
	},
});

export default MyPager;