import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';
import { Color } from '../GlobalStyles';
import { Controller } from 'react-hook-form';

const CustomInnerInput = ({  control, name, placeholder, rules, errors,style,value, ...rest }) => {
  // console.log('value--',value)
  return (
    <View style={style}>
    <Controller
    control={control}
    name={name}
    rules={rules}
    // defaultValue={value} 
    render={({ field }) => (
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
    )}
    />
    {errors && errors[name] && <Text style={{ color: 'red',marginTop:-20,marginBottom:40,alignSelf:'flex-start' }}>{errors[name].message}</Text>}
  </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: Color.colorGainsboro_200, // Gray background color
    borderRadius: 10, // Border radius
    borderWidth: 1, // Border width
    borderColor: '#CCCCCC', // Border color
    fontSize: 16, // Font size
    color: Color.colorDimgray_200, // Text color
	paddingHorizontal: 10,
  },
});

export default CustomInnerInput;