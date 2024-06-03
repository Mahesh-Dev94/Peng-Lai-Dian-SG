import React, { useState } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import Carousel, { Pagination } from "react-native-snap-carousel";
import { FontFamily, Color, FontSize, Border } from "../../../GlobalStyles";
import {ScaleDimention} from '../../../GlobalStyles';
import { useSelector } from 'react-redux';
const {height, width} = ScaleDimention;

const renderItem = (item,config) => {
	const imageurl=`${config?.imagebasePath}${item}`;
	return (
		<Image resizeMode='cover' source={{uri:imageurl}} style={[
			styles.homescreenOption1Inner,
		]} />
	);
};
const MyPager = ({ banner }) => {
	const [activeIndex, setActiveIndex] = useState(0)
	const config = useSelector((state) => state.config.configUrls);




	return (
		<View style={styles.pagerView}>
			<Carousel
				data={banner}
				renderItem={({item})=>renderItem(item,config)}
				sliderWidth={width}
				itemWidth= {width}
				loop={true}
				autoplay={true}
				enableSnap={true}
				enableMomentum={true}
				loopClonesPerSide={banner?.length}
				onSnapToItem={id => setActiveIndex(id)}
			/>
			<Pagination
			   autoplay={true}
			   loop={true}
				dotsLength={banner?.length}
				activeDotIndex={activeIndex}
				containerStyle={{
					alignSelf: 'center',
					paddingVertical: 0,
					marginTop:-30,
					width:40
				}}
				dotStyle={{
					width: 7,
					height: 7,
					borderRadius: 7,
					backgroundColor: Color.colorWhitesmoke_200,
				}}
				inactiveDotOpacity={0.4}
				inactiveDotScale={0.6}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	pagerView: {
		alignItems:'center',
		alignSelf:'center',
		marginHorizontal:30,
		width:width
	},

	homescreenOption1Inner: {
		width: width,
		height: 234,
		borderRadius: Border.br_8xs,
	},
});

export default MyPager;