import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Color } from '../GlobalStyles';

const CustomActionSheet = ({ visible, onClose,onSelect }) => {
  const { t } = useTranslation();
  const handleOptionPress = (option) => {
    // Handle option press
    onSelect(option);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={1} style={styles.option} onPress={() => handleOptionPress(1)}>
          <Text style={{color: Color.colorDimgray_200}}>{t('screens.Profile.Take Photo')}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1}  style={styles.option} onPress={() => handleOptionPress(2)}>
          <Text style={{color: Color.colorDimgray_200}}>{t('screens.Profile.Choose from Library')}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1}  style={styles.cancel} onPress={onClose}>
          <Text style={{color: Color.colorDimgray_200}}>{t('screens.Profile.Cancel')}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  option: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
  },
  cancel: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    marginTop: 10,
  },
});

export default CustomActionSheet;
