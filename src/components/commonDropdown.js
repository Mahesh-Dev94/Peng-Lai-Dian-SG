

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text,Image } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Color } from '../GlobalStyles';
const DropdownComponent = ({
	data,
	values,
	onSelect,
	labelField = 'label',
	valueField = 'value',
	placeholder = 'Select item',
	searchPlaceholder = 'Search...',
	search=false,
	type='others',
	error
  }) => {
  const [value, setValue] = useState(null);


  useEffect(()=>{
	setValue(values)
  },[values])

  const renderItem = item => {
	return (
	  <View style={styles.item}>
		<Text style={styles.textItem}>{item[labelField]}</Text>
	  </View>
	);
  };

  return (
	<>
	<Dropdown
	  style={type==='payment'?styles.paymentDropdown : styles.dropdown}
	  placeholderStyle={styles.placeholderStyle}
	  selectedTextStyle={styles.selectedTextStyle}
	  inputSearchStyle={styles.inputSearchStyle}
	  iconStyle={styles.iconStyle}
	  data={data}
	  search={search}
	  labelField={labelField}
      valueField={valueField}
      placeholder={placeholder}
      searchPlaceholder={searchPlaceholder}
	  value={value}
	  onChange={item => {
		setValue(item[valueField]);
		onSelect(item[valueField]);
	  }}
	  renderItem={renderItem}
	/>
	{error && <Text style={{ color: 'red',marginTop:-20,marginBottom:10,alignSelf:'center',width:282 }}>{error.message}</Text>}
	</>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
   width:282,
   height:55,
   backgroundColor: Color.colorGainsboro_200, // Gray background color
   borderRadius: 10, // Border radius
   padding: 10, // Padding
   borderWidth: 1, // Border width
   borderColor: '#CCCCCC', // Border color
   fontSize: 16, // Font size
   color: Color.colorDimgray_200, // Text color
   marginBottom:20,
	shadowColor: '#000',
	shadowOffset: {
	  width: 0,
	  height: 1,
	},
	shadowOpacity: 0.2,
	shadowRadius: 1.41,

	elevation: 2,
  },
  paymentDropdown: {
	width:282,
	height:39,
	// backgroundColor: Color.colorGainsboro_200, // Gray background color
	borderRadius: 5, // Border radius
	padding: 10, // Padding
	borderWidth: 1, // Border width
	borderColor: Color.colorBlack, // Border color
	fontSize: 16, // Font size
	color: Color.colorDimgray_200, // Text color
	marginBottom:20,
	 shadowColor: '#000',
	 shadowOffset: {
	   width: 0,
	   height: 1,
	 },
	//  shadowOpacity: 0.2,
	//  shadowRadius: 1.41,
 
	//  elevation: 2,
   },
  icon: {
	marginRight: 5,
  },
  item: {
	padding: 17,
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center',
  },
  textItem: {
	flex: 1,
	fontSize: 16,
	color: Color.colorDimgray_200,
  },
  placeholderStyle: {
	fontSize: 16,
	color: Color.colorDimgray_200,
  },
  selectedTextStyle: {
	fontSize: 16,
	color: Color.colorDimgray_200,
  },
  iconStyle: {
	width: 20,
	height: 20,
  },
  inputSearchStyle: {
	height: 40,
	fontSize: 16,
	color: Color.colorDimgray_200,
  },
});