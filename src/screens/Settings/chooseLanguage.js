import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { FontFamily, Color, ScaleDimention, FontSize, Border } from '../../GlobalStyles';
import { useSelector } from 'react-redux';
import Loader from '../../components/loader';
import { List, RadioButton } from 'react-native-paper';
import { useLocale } from '../../i18n';
import { put } from '../../services/api';
import { CHANGE_LANGUAGE } from '../../services/config';
import { showToast } from '../../utils';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/core';
import CheckBox from '@react-native-community/checkbox';
import CustomButton from '../../components/commonButton';

const { width } = ScaleDimention;
const ChooseLanguage = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { changeLanguage } = useLocale();
  const language = useSelector(state => state.language.selectedLanguage);
  const config = useSelector(state => state.config.configUrls);
  const [checked, setChecked] = useState('en');

  const session = useSelector(state => state.session);
  const [isLoading, setisLoading] = useState(false);

  const _onChangeServer = async lng => {
    setisLoading(true);
    const payload = { languageCode: lng };
    const changeLanguage = await put(
      `${config?.UrlBasePath}/${CHANGE_LANGUAGE}`,
      session?.user?.token,
      payload,
    );
    console.log('changeLanguage-----', changeLanguage);
    setisLoading(false);
    if (changeLanguage.success) {
      showToast('success', changeLanguage.message);
    }
  };

  useEffect(() => {
    setChecked(language);
  }, [language]);

  const _onChangesLanguage = () => {
    changeLanguage(checked);
    _onChangeServer(checked);
  };

  return (
    <SafeAreaView style={{ flex: 1, width: width }}>
      <View style={styles.headerConatiner}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.backIcon}
            resizeMode="cover"
            source={require('../../assets/images/iconexlightleft-2.png')}
          />
        </TouchableOpacity>
        <Text style={styles.headerLabel}>
          {' '}
          {t('screens.Settings.Choose Language')}
        </Text>
      </View>
      <View style={styles.container}>
        {isLoading && <Loader />}
        <List.Item
          // onPress={() => _onChangesLanguage('en')}
          style={{
            borderBottomWidth: 0.5,
            borderBottomColor: Color.colorDarkgray_100,
          }}
          title={'English'}
          titleStyle={styles.titleStyle}
          description={props => (
            <View style={{ flexDirection: 'column' }}>
              <Text {...props} style={{ color: Color.colorDimgray_200 }}>
                {'English'}
              </Text>
            </View>
          )}
          descriptionStyle={styles.descriptionStyle}
          left={props => (
            <CheckBox
              tintColors={{ true: Color.colorKhaki, false: 'gray' }}
              style={styles.checkbox}
              value={checked === 'en' ? true : false}
              onValueChange={() => setChecked('en')}
            />
          )}
        />

        <List.Item
          // onPress={() => _onChangesLanguage('zh')}
          // style={{
          //   borderBottomWidth: 0.5,
          //   borderBottomColor: Color.colorDarkgray_100,
          // }}
          title={'中國人'}
          titleStyle={styles.titleStyle}
          description={props => (
            <View style={{ flexDirection: 'column' }}>
              <Text {...props} style={{ color: Color.colorDimgray_200 }}>
                {'Chinese'}
              </Text>
            </View>
          )}
          descriptionStyle={styles.descriptionStyle}
          left={props => (
            <CheckBox
              tintColors={{ true: Color.colorKhaki, false: 'gray' }}
              style={styles.checkbox}
              value={checked === 'zh' ? true : false}
              onValueChange={() => setChecked('zh')}
            />

          )}
        />

        <CustomButton
          style={styles.L2Button}
          onPress={() =>  _onChangesLanguage()}>
          <Text style={styles.L2ButtonLbl}>{t('screens.Settings.Continue')}</Text>
        </CustomButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width - 40,
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 5,
    // padding: 5,
  },
  titleStyle: {
    fontFamily: FontFamily.helvetica,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 18,
    color: Color.colorGray_300,
  },
  descriptionStyle: {
    fontFamily: FontFamily.helvetica,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14,
    color: Color.colorDimgray_200,
  },
  priceStyle: {
    fontFamily: FontFamily.helvetica,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16,
    color: Color.colorGray_300,
    marginBottom: 5,
  },
  headerConatiner: {
    flexDirection: 'row',
    width: width,
    paddingLeft: '5%',
    alignItems: 'center',
    height: 74,
    justifyContent: 'flex-start',
    shadowRadius: 2, // Shadow radius
    elevation: Platform.OS === 'android' ? 2 : undefined, // Elevation for Android
    // shadowOpacity: Platform.OS === 'ios' ? 0.2 : undefined,
    borderBottomColor: 'gray',
    borderBottomWidth:.2,
    // marginBottom: 10,
  },
  backIcon: {
    width: '20%',
    height: 24,
    width: 24,
    marginRight: 5,
    marginTop: 3,
  },

  headerLabel: {
    fontSize: FontSize.size_xl,
    fontWeight: '700',
    color: Color.colorGray_300,
    fontFamily: FontFamily.helvetica,
    textAlign: 'left',
  },
  checkbox: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // width:50,
    marginLeft: 20
  },
  L2Button: {
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    backgroundColor: Color.colorDarkred_100,
    borderRadius: Border.br_3xs,
    height: 55,
    width: 282,
    marginTop: 20,
  },

  L2ButtonLbl: {
    fontFamily: FontFamily.helvetica,
    color: Color.colorWhitesmoke_100,
    fontSize: FontSize.size_xl,
    fontWeight: '400',
    lineHeight: 23,
  },
});

export default ChooseLanguage;
