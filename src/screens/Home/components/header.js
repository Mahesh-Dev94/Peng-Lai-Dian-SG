import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getIsNotification, myGlobalIsNotificationRead } from '../../../utils';
const Header = () => {
  const navigation = useNavigation();
  const [isRead,setIsRead]=useState(false)
  console.log('getIsNotification---',getIsNotification())
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>navigation.openDrawer()} style={styles.leftImages}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={require("../../../assets/images/iconexfilledburger.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{
        navigation.navigate('Notifications')
        setIsRead(true)
        }} style={styles.rightImages}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={require("../../../assets/images/iconexfilledbell.png")}
        />
      {!getIsNotification() && <Image
          style={[styles.ellipse, styles.ellipseIcon]}
          resizeMode="cover"
          source={require("../../../assets/images/ellipse-241.png")}
        />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 60, // Adjust the height as needed
    // backgroundColor: 'white',
  },
  leftImages: {
    flexDirection: 'row',
  },
  rightImages: {
    flexDirection: 'row',
    position: 'relative', // Necessary for absolute positioning
  },
  image: {
	width: 24,
    height: 24,
    marginHorizontal: 5, // Adjust spacing between images as needed
  },
  ellipse:{
	height: 6,
    width: 6,
  },
  ellipseIcon: {
    position: 'absolute',
    top: 0, // Adjust the position as needed
    right: 10, // Adjust the position as needed
  },
});

export default Header;
