import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { List } from 'react-native-paper';
import { Color, FontFamily } from '../../GlobalStyles';

const NotificationListItem = ({ title, description, onPress, image }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        style={styles.icon}
        // resizeMode="cover"
        source={require('../../assets/images/Subtract.png')}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        {/* <Text style={styles.time}>{time}</Text> */}
      </View>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={image}
      />
    </TouchableOpacity>
  );
};

export default NotificationListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: Color.colorDarkgray_100,
    paddingVertical: 10,
    marginHorizontal: 15,
  },
  icon: {
    height: 24,
    width: 18,
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 10,
    paddingLeft:5
  },
  title: {
    fontFamily: FontFamily.helvetica,
    fontSize: 16,
    color: Color.colorGray_300,
    marginBottom: 5,
  },
  description: {
    fontFamily: FontFamily.helveticaLight,
    fontSize: 12,
    color: Color.colorDimgray_200,
  },
  time: {
    fontFamily: FontFamily.helveticaLight,
    fontSize: 12,
    color: Color.colorDarkred_100,
  },
  image: {
    width: 57,
    height: 59,
    borderRadius: 5,
  },
});
