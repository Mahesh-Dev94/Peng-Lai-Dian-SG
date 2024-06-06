import React from 'react';
import { TextInput, View, StyleSheet,Dimensions,Image, TouchableOpacity } from 'react-native';
import { FontFamily, Color, FontSize, Border } from "../../../GlobalStyles";
import { useTranslation } from 'react-i18next';
const {width} = Dimensions.get('window');
const SearchBox = ({onPress}) => {
  const { t } = useTranslation();
  return (
    <TouchableOpacity  onPress={onPress} style={styles.container}>
      <TextInput
        placeholder={t('screens.Home.Search')}
        style={styles.input}
        placeholderTextColor="#A9A9A9"
        editable={false}
        selectTextOnFocus={false}
      />
	   <Image
        style={styles.icon}
        resizeMode="cover"
        source={require("../../../assets/images/iconexlightsearch1.png")}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
	marginHorizontal:20,
	height: 39,
	borderRadius: Border.br_8xs,
	backgroundColor:Color.colorWhitesmoke_100,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    color: 'black',
	fontSize: FontSize.size_base,
  },
  icon: {
    marginRight: 10,
  },
});

export default SearchBox;
