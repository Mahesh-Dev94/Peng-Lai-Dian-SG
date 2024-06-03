
import React from 'react';
import { TextInput, View, StyleSheet, Dimensions, Image, Text, TouchableOpacity, Alert } from 'react-native';
import { FontFamily, Color, FontSize, Border } from "../../../GlobalStyles";
import {ScaleDimention} from '../../../GlobalStyles';
import { getImageFullPath } from '../../../utils';
const {height, width} = ScaleDimention;
const ImageLayoutMore = ({imagePath,images,onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{marginHorizontal:20}}>
      <View style={styles.container}>
        <Image
          style={[styles.image]}
          resizeMode="cover"
          source={getImageFullPath(imagePath,images[0])}
        />
        <Image
          style={[styles.image]}
          resizeMode="cover"
          source={getImageFullPath(imagePath,images[1])}
        />
      </View>
      <View style={styles.container}>
        <Image
          style={[styles.image3]}
          resizeMode="cover"
          source={getImageFullPath(imagePath,images[2])}
        />
        <Image
          style={[styles.image3]}
          resizeMode="cover"
          source={getImageFullPath(imagePath,images[3])}
        />
        <TouchableOpacity onPress={onPress}>
          <Image
            style={[styles.image3]}
            resizeMode="cover"
            source={getImageFullPath(imagePath,images[4])}
          />
          <View style={styles.overlay}>
           {(images.length-5) ? <Text style={styles.text}>+{images.length-5}</Text>:null }
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>

  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: (width - 40) / 2,
    height: 125,
    margin: 2
  },
  image3: {
    width: (width - 45) / 3,
    height: 82,
    margin: 2
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
    fontFamily: FontFamily.Montserrat,

  },
});

export default ImageLayoutMore;
