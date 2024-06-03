import * as React from 'react';
import {StyleSheet, View, Image, Text, Alert} from 'react-native';
import {Color, FontSize, FontFamily, Border} from '../../GlobalStyles';
import CustomButton from '../../components/commonButton';
import {useNavigation} from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../i18n';  //'./i18n'; 
import {ScaleDimention} from '../../GlobalStyles';

const {height, width} = ScaleDimention;
const Language = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { changeLanguage } = useLocale(); // Use useLocale hook
  return (
    <View style={styles.signInOption1}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.pldLogo1}
          resizeMode="cover"
          source={require('../../assets/images/PLDLogo.png')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          style={styles.L1Button}
          onPress={() => {
            navigation.navigate('RegisterOption');
            changeLanguage('zh')}}>
          <Text style={styles.L1ButtonLbl}>{t("screens.languageOption.Chinese")} </Text>
        </CustomButton>
        <CustomButton
          style={styles.L2Button}
          onPress={() =>{ 
          navigation.navigate('RegisterOption');
          changeLanguage('en')}}>
          <Text style={styles.L2ButtonLbl}>{t("screens.languageOption.English")} </Text>
        </CustomButton>
      </View>
    </View>
  );
};

// Language.navigationOptions = {
// 	tabBarVisible: false, // Hide the tab bar for this screen
//   };
const styles = StyleSheet.create({
  signInOption1: {
    backgroundColor: Color.colorKhaki,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
  },
  imageContainer: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  pldLogo1: {
    width: 250,
    height: 343,
  },

  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1.5,
  },
  L1Button: {
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorWhitesmoke_100,
    height: 55,
    width: 248,
    marginBottom: 20,
  },

  L1ButtonLbl: {
    fontFamily: FontFamily.helvetica,
    color: Color.colorBlack,
    fontSize: FontSize.size_xl,
    fontWeight: '400',
    lineHeight: 23,
  },
  L2Button: {
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    backgroundColor: Color.colorDarkred_100,
    borderRadius: Border.br_3xs,
    height: 55,
    width: 248,
  },

  L2ButtonLbl: {
    fontFamily: FontFamily.helvetica,
    color: Color.colorWhitesmoke_100,
    fontSize: FontSize.size_xl,
    fontWeight: '400',
    lineHeight: 23,
  },
});

export default Language;
