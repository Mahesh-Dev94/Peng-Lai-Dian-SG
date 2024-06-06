import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

const CustomButton = ({ onPress, children, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    // height:55
  },
});

export default CustomButton;
