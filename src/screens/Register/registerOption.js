import * as React from 'react';
import { StyleSheet, View, Image, Text, Dimensions } from 'react-native';
import { Color, FontSize, FontFamily, Border } from '../../GlobalStyles';
import CustomButton from '../../components/commonButton';
import { useNavigation } from '@react-navigation/native';
import { ScaleDimention } from '../../GlobalStyles';
import { useTranslation } from 'react-i18next';
const { height, width } = ScaleDimention;
const RegisterOption = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
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
        <View style={styles.buttonSubContainer}>
          <View
            style={styles.lblContainer}>
            <Text style={styles.welcomLbl}> {t("screens.registerOption.Welcome !")}</Text>
            <Text style={styles.subWelcomLbl}>
              {/* To Peng Lai Dian , Singapore */}
              {t("screens.registerOption.To Peng Lai Dian , Singapore")}
            </Text>
          </View>
          <CustomButton
            style={styles.L2Button}
            onPress={() => navigation.navigate('Signin')}>
            <Text style={styles.L2ButtonLbl}>
              {/* Sign In  */}
              {t("screens.registerOption.Sign In")}
              </Text>
          </CustomButton>
          <CustomButton
            style={styles.L1Button}
            onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.L1ButtonLbl}>
              {/* Sign Up */}
              {t("screens.registerOption.Sign Up")}
              </Text>
          </CustomButton>

          <CustomButton
            style={{marginTop: 10}}
            onPress={() => navigation.goBack()}>
            <Text style={[styles.dontHaveAnContainer, styles.emailIdClr]}>
              <Text style={styles.signUp}>
                {t('screens.registerOption.Back')}
              </Text>
              {/* <Text style={styles.signUp}>{t('screens.SignIn.Sign up')}</Text> */}
            </Text>
          </CustomButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  signInOption1: {
    backgroundColor: Color.colorKhaki,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width
  },
  imageContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pldLogo1: {
    width: 201,
    height: 230,
  },

  buttonContainer: {
    width: width,
    flex: 1.8,
    backgroundColor: Color.colorWhitesmoke_100,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSubContainer: {
    // width: width - 100,
    // flex: 1,
    // marginTop: 40,
  },
  lblContainer: {
    width: 248,
    height: 89,
    marginBottom: 20,
    justifyContent:'flex-start'
  },

  welcomLbl: {
    fontFamily: FontFamily.helvetica,
    color: Color.colorGray_300,
    fontSize: FontSize.size_xxl,
    fontWeight: '700',
    lineHeight: 28,
    marginBottom: 15,
  },
  subWelcomLbl: {
    fontFamily: FontFamily.helvetica,
    color: Color.colorGray_300,
    fontSize: FontSize.size_xl,
    fontWeight: '400',
    lineHeight: 23,
  },
  L1Button: {
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorGainsboro_100,
    height: 55,
    width: '248',
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
    width: '248',
    marginBottom: 20,
  },

  L2ButtonLbl: {
    fontFamily: FontFamily.helvetica,
    color: Color.colorWhitesmoke_100,
    fontSize: FontSize.size_xl,
    fontWeight: '400',
    lineHeight: 23,
  },

  dontHaveAnContainer: {
    fontSize: FontSize.size_sm,
    textAlign: 'center',
  },
  emailIdClr: {
    color: Color.colorDimgray_200,
    // textAlign: 'center',
  },
  dontHaveAn: {
    fontFamily: FontFamily.helvetica,

  },
  signUp: {
    fontWeight: '700',
    fontFamily: FontFamily.helvetica,
    textDecorationLine: 'underline',
    lineHeight:15
  },
});

export default RegisterOption;
