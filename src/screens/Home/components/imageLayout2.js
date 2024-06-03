
import React from 'react';
import { TextInput, View, StyleSheet,Dimensions,Image, TouchableOpacity } from 'react-native';
import { FontFamily, Color, FontSize, Border } from "../../../GlobalStyles";
import {ScaleDimention} from '../../../GlobalStyles';
import { getImageFullPath } from '../../../utils';
const {height, width} = ScaleDimention;
const ImageLayout2 = ({imagePath,images,onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="cover"
		source={getImageFullPath(imagePath,images[0])}
      />
	  <Image
        style={styles.image}
        resizeMode="cover"
		source={getImageFullPath(imagePath,images[1])}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal:20
  },
  image: {
    width:(width-40)/2,
    height:215,
    margin:2
  },
  
});

export default ImageLayout2;
