import React from 'react';
import { View, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Color } from '../GlobalStyles';

const SearchInput = ({placeholder, value, onChangeText, onCalendarPress, onSearchPress,style }) => {
  return (
    <View style={[styles.container,style]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChangeText}
      />
         <TouchableOpacity style={[styles.iconContainer,{borderRightWidth:1,borderRightColor:Color.colorGray_100,marginVertical:8}]}>
        <Image source={require('../assets/images/iconexlightsearch1.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.iconContainer]} onPress={onCalendarPress}>
        <Image source={require('../assets/tab_Icon/Calendar.png')} style={[styles.icon]} />
      </TouchableOpacity>
   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginHorizontal: 20,
	marginTop:15,
    marginVertical: 20,
	width:279,
	height:40
  },
  input: {
    flex: 1,
    height: 40,
    // paddingHorizontal: 4,
    color: '#333',
	// justifyContent:'center',
	// alignSelf:'center',
	alignItems:'center'
  },
  iconContainer: {
    paddingHorizontal: 8,
	justifyContent:'center',
	alignSelf:'center',
	alignItems:'center'
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#666',
	alignSelf:'center',
  },
});

export default SearchInput;