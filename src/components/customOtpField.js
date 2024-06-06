import React, {useEffect, useRef, useState} from 'react';
import {View, TextInput, StyleSheet, Settings} from 'react-native';
import {Color} from '../GlobalStyles';

const CustomOTPField = ({onChangeText, style}) => {
  // State to hold the complete OTP
  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');
  const [otp4, setOtp4] = useState('');
  const [otp5, setOtp5] = useState('');
  const [otp6, setOtp6] = useState('');
  // Refs for each OTP input field
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);
  const input5Ref = useRef(null);
  const input6Ref = useRef(null);

  // Focus next input field when current input is filled
  const handleInputChange = ref => {
    if (ref) {
      if (ref.current) {
        ref.current.focus();
      }
    }
  };

  useEffect(()=>{
    const newOtp = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;
    onChangeText(newOtp);
  },[otp1 , otp2 , otp3 , otp4 , otp5,otp6])

  return (
    <View style={[styles.container, style]}>
      {/* OTP Input Fields */}
      <TextInput
        ref={input1Ref}
        style={styles.input}
        keyboardType="number-pad"
        maxLength={1}
        onChangeText={text => {
          setOtp1(text);
          handleInputChange(input2Ref);
        }}
      />
      <TextInput
        ref={input2Ref}
        style={styles.input}
        keyboardType="number-pad"
        maxLength={1}
        onChangeText={text => {
          setOtp2(text);
          handleInputChange(input3Ref);
        }}
      />
      <TextInput
        ref={input3Ref}
        style={styles.input}
        keyboardType="number-pad"
        maxLength={1}
        // value={value[2]}
        onChangeText={text => {
          setOtp3(text);
          handleInputChange(input4Ref);
        }}
      />
      <TextInput
        ref={input4Ref}
        style={styles.input}
        keyboardType="number-pad"
        maxLength={1}
        onChangeText={text => {
          setOtp4(text);
          handleInputChange(input5Ref);
        }}
      />
      <TextInput
        ref={input5Ref}
        style={styles.input}
        keyboardType="number-pad"
        maxLength={1}
        onChangeText={text => {
          setOtp5(text);
          handleInputChange(input6Ref);
        }}
      />
       <TextInput
        ref={input6Ref}
        style={styles.input}
        keyboardType="number-pad"
        maxLength={1}
        onChangeText={text => {
          setOtp6(text);
          handleInputChange(null);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: 10,
  },
  input: {
    // backgroundColor: Color.colorGainsboro_200,
    borderBottomWidth:1,
    // borderWidth: 1, // Border width
    borderColor: Color.colorGainsboro_200, // Border color
    // borderRadius: 10,
    padding: 10,
    width: 36,
    height: 43,
    textAlign: 'center',
    color:Color.colorDimgray_200
  },
});

export default CustomOTPField;
