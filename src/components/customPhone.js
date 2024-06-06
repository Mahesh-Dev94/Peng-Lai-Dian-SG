import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Color } from '../GlobalStyles';
import { Controller } from 'react-hook-form';

const CustomPhone = ({ countryCode, onSelectCountryCode, placeholder,rules, errors,control,name }) => {

  return (
    <>
    <Controller
    control={control}
    name={name}
    rules={rules}
    render={({ field }) => (
      <View style={[styles.container]}>
      {/* Country Code Selector */}
      <TouchableOpacity style={styles.countryCodeButton}
        onPress={onSelectCountryCode}
      >
        <Text style={styles.countryCodeText}>{countryCode}</Text>
        <Image
          resizeMode="cover"
          source={require('../assets/images/chevrondown.png')}
        />
      </TouchableOpacity>

      {/* Phone Number Input */}
      <TextInput
        style={styles.phoneInput}
        keyboardType="phone-pad"
        placeholder={placeholder}
        placeholderTextColor={Color.colorDimgray_200}
        // value={value}
        // onChangeText={onChangeText}
        onChangeText={field.onChange}
        value={field.value}
      />

    </View>
     )}
     />
     {errors && errors[name] && <Text style={{ color: 'red',marginTop:-20,marginBottom:10,alignSelf:'flex-start' }}>{errors[name].message}</Text>}
   </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.colorGainsboro_200,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,

    height: 55,
    width: 282,
    marginBottom: 25,
  },
  countryCodeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: Color.colorDarkgray_100,
    paddingHorizontal: 4,
  },
  countryCodeText: {
    marginRight: 4,
    fontSize: 16,
    fontWeight: 'bold',
    color:Color.colorDimgray_200

  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: Color.colorDimgray_200,
    padding: 10
  },
});

export default CustomPhone;
