import React, {useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
} from 'react-native';
import {FontFamily, Color, FontSize, Border} from '../../../GlobalStyles';
import ImageLayout1 from './imageLayout1';
import ImageLayout2 from './imageLayout2';
import ImageLayoutMore from './imageLayoutMore';
import PostTextContent from './postTextContent';
import {ScaleDimention} from '../../../GlobalStyles';
import ImageLayout4 from './imageLayout4';
import ImageLayoutTwoAboveOne from './imageLayout3';
const {height, width} = ScaleDimention;

const Post = ({item, _onSlider, imagePath}) => {
  return (
    <>
      <View style={[{marginVertical: 10}, styles.homescreenChildLayout]} />
      <PostTextContent description={item.description} date={item.createdAt} />

      {item.images.length >= 5 && (
        <ImageLayoutMore
          images={item.images}
          imagePath={imagePath}
          onPress={() => _onSlider(item.images)}
        /> )}

	  {item.images.length === 4 &&(<ImageLayout4  images={item.images}
          imagePath={imagePath}
          onPress={() => _onSlider(item.images)}
		  />)}

{item.images.length === 3 && (
        <ImageLayoutTwoAboveOne
          images={item.images}
          imagePath={imagePath}
          onPress={() => _onSlider(item.images)}
        />
      )}

      {item.images.length === 2 && (
        <ImageLayout2
          images={item.images}
          imagePath={imagePath}
          onPress={() => _onSlider(item.images)}
        />
      )}
      {item.images.length === 1 && (
        <ImageLayout1
          images={item.images}
          imagePath={imagePath}
          onPress={() => _onSlider(item.images)}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  homescreenChildLayout: {
    height: 9,
    width: width,
    backgroundColor: Color.colorGainsboro_200,
  },
});

export default Post;
