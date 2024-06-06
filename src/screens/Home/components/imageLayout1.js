import React from 'react';
import { StyleSheet,Image, TouchableOpacity } from 'react-native';
import {ScaleDimention} from '../../../GlobalStyles';
import { getImageFullPath } from '../../../utils';
const {height, width} = ScaleDimention;
const ImageLayout1 = ({imagePath,images,onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="cover"
		    source={getImageFullPath(imagePath,images[0])}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal:20
  },
  image: {
    width:width-40,
    height: 207,
  },
  
});

export default ImageLayout1;
