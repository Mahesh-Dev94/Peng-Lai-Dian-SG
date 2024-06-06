import React from 'react';
import { View, Text, Button } from 'react-native';
import Modal from 'react-native-modal';

const CustomModal = ({ isVisible, onClose, children }) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={{ flex: 1,justifyContent:'center'}}>
        {children}
      </View>
    </Modal>
  );
};

export default CustomModal;
