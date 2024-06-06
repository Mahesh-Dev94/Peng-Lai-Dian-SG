import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';
import { Color } from '../GlobalStyles';
import { Controller } from 'react-hook-form';

const CustomInput = ({  control, name, placeholder, rules, errors,style,value,label, ...rest }) => {
  // console.log('value--',value)
  return (
    <>
    <Controller
    control={control}
    name={name}
    rules={rules}
    // defaultValue={value} 
    render={({ field }) => (
      <View style={{flexDirection:'column'}}>
        <Text style={styles.label}> {''}{label}</Text>
    <TextInput
      editable={placeholder==='Date of birth'? false:true}
      selectTextOnFocus={placeholder==='Date of birth'? false:true}
      placeholder={placeholder}
      style={[styles.input,style]}
      placeholderTextColor={Color.colorDimgray_200}
      onChangeText={field.onChange}
      value={field.value}
      {...rest}
    />
    </View>
    )}
    />
    {errors && errors[name] && <Text style={{ color: 'red',marginTop:-20,marginBottom:10,alignSelf:'flex-start',marginLeft:2 }}>{errors[name].message}</Text>}
  </>
  );
};

const styles = StyleSheet.create({
  label:{
    fontSize: 12, // Font size
    color:Color.colorGray_100, // Text color
    // paddingLeft:15
  },
  input: {
    // backgroundColor: Color.colorGainsboro_200, // Gray background color
    // borderRadius: 10, // Border radius
    borderBottomWidth:1,
    // borderWidth: 1, // Border width
    borderColor: '#CCCCCC', // Border color
    fontSize: 15, // Font size
    color: Color.colorGray_300, // Text color
  },
});

export default CustomInput;