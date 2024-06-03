import React, {useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  Alert,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {FontFamily, Color, FontSize, Border} from '../../GlobalStyles';
import {ScaleDimention} from '../../GlobalStyles';
import {useNavigation} from '@react-navigation/native';
import SettingsListItem from './SettingsListItem';
import CustomModal from '../../components/customModal';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import { DELETE_USER, DE_ACTIVATE_ACCOUNT } from '../../services/config';
import { Delete, put } from '../../services/api';
import Loader from '../../components/loader';
import { persistLogout } from '../../Redux/Reducers/sessionSlice';
import { showToast } from '../../utils';
const {height, width} = ScaleDimention;

const Settings = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const language = useSelector(state => state.language.selectedLanguage);
  const config = useSelector(state => state.config.configUrls);
  const session = useSelector(state => state.session);
  const [isLoading, setisLoading] = useState(false);
  const {t} = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };


  const _onDeleteUser=async()=>{
    setisLoading(true);
    const _delete = await Delete( `${config?.UrlBasePath}/${DELETE_USER}`, session?.user?.token);
    console.log('_delete-----',_delete)
    setisLoading(false);
    if (_delete.success) {
      toggleModal();
      dispatch(persistLogout())
      showToast('success', _delete.message);

    }

  }

  const _onDeactivateUser=async()=>{
      setisLoading(true);
      const payload={}
      const Deactivate = await put(`${config?.UrlBasePath}/${DE_ACTIVATE_ACCOUNT}`, session?.user?.token,payload);
      console.log('Deactivate-----',Deactivate)
      setisLoading(false);
      if (Deactivate.success) {
        toggleModal();
        dispatch(persistLogout())
        showToast('success', Deactivate.message);
      }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
        <View style={styles.headerConatiner}>
          <TouchableOpacity onPress={()=>navigation.goBack()} >
          <Image
            style={styles.backIcon}
            resizeMode="cover"
            source={require('../../assets/images/iconexlightleft-2.png')}
          />
          </TouchableOpacity>
          <Text style={styles.headerLabel}> {t('screens.Settings.Settings')}</Text>
        </View>
      {isLoading && <Loader />}
      <SettingsListItem
        title={t('screens.Settings.Help & Support')}
        description={
          t('screens.Settings.Customer support , Your Queries , Frequently asked Questions')
        }
        src={require('../../assets/images/Call.png')}
        onPress={() => navigation.navigate('Help & Support')}
      />
      <SettingsListItem
        title={t('screens.Settings.Manage Notifications')}
        description={t('screens.Settings.Manage how you want to receive important updates')}
        src={require('../../assets/images/Bell.png')}
        onPress={() => navigation.navigate('Manage Notification')}
      />

      <SettingsListItem
        title={t('screens.Settings.Change Language')}
        description={t('screens.Settings.Change the language of the app')}
        src={require('../../assets/images/GroupLang.png')}
        onPress={() => navigation.navigate('Choose Language')}
      />
      <SettingsListItem
        title={t('screens.Settings.Delete Account')}
        description={t('screens.Settings.Delete the current account')}
        src={require('../../assets/images/cancel.png')}
        onPress={() => toggleModal()}
      />

      {/* Delete User Modal */}
      <CustomModal isVisible={isModalVisible} onClose={toggleModal}>
        <View
          style={{
            flexDirection: 'column',
            marginHorizontal: '3%',
            marginVertical: '10%',
            borderRadius: 20,
            backgroundColor: Color.colorWhitesmoke_100,
          }}>
          <View
            style={{
              marginHorizontal: 5,
              paddingVertical: 15,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <TouchableOpacity onPress={toggleModal} style={{width: 30,alignSelf:'flex-start'}}>
              <Image
                style={styles.backIcon}
                resizeMode="cover"
                source={require('../../assets/images/iconexlightleft-2.png')}
              />
            </TouchableOpacity>
            <View style={styles.popupLblContainer}>
              <Text style={styles.DeleteLbl2}>
              {t('screens.Settings.Are you sure you want to delete this account?')}
              </Text>
            </View>
          </View>

          <View style={styles.popupLblContainer}>
            <Text style={styles.delSubLbl}>
            {t('screens.Settings.By deleting your account you will lose your data.')}
            </Text>

            <View style={styles.listContainer}>
              <TouchableOpacity
                onPress={_onDeleteUser}
                style={styles.listItem}>
                <Text style={[styles.titleStyle, {color: Color.colorDarkred_100}]}>
                {t('screens.Settings.Delete Account')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={_onDeactivateUser}
                style={styles.listItem}>
                <Text style={styles.titleStyle}>{t('screens.Settings.Deactivate Account')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={toggleModal}
                style={styles.listItem}>
                <Text style={styles.titleStyle}>{t('screens.Settings.Cancel')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </CustomModal>
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
    marginHorizontal: 15,
  },
  backIcon: {
    height: 24,
    width: 24,
    marginRight: 5,
    marginTop: 3,
  },
  DeleteLbl2: {
    fontFamily: FontFamily.helvetica,
    color: Color.colorGray_300,
    fontSize: FontSize.size_xl,
    fontWeight: '700',
    lineHeight: 23,
    textAlign: 'center',
    width: 236,
  },
  popupLblContainer: {
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  delSubLbl: {
    fontFamily: FontFamily.helvetica,
    color: Color.colorDimgray_200,
    fontSize: FontSize.size_sm,
    fontWeight: '400',
    lineHeight: 16,
    width: 236,
    textAlign: 'center',
  },
  titleStyle: {
    fontFamily: FontFamily.helvetica,
    color: Color.colorDimgray_200,
    fontSize: FontSize.size_base,
    fontWeight: '400',
    lineHeight: 23,
    alignSelf:'center',
    textAlign:'center',
  },
  listContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  listItem: {
    width: 236,
    borderBottomWidth: 0.5,
   
    borderBottomColor: Color.colorDarkgray_100,
    paddingVertical: 15, // Adjust as needed
  },
  headerConatiner: {
    flexDirection: 'row',
    width: width,
    paddingLeft: '5%',
    alignItems: 'center',
    height:74,
    justifyContent:'flex-start',
    shadowRadius: 2, // Shadow radius
    elevation: Platform.OS === 'android' ? 2 : undefined, // Elevation for Android
    // shadowOpacity: Platform.OS === 'ios' ? 0.2 : undefined,
    borderBottomColor:'gray',
    borderBottomWidth:.2,
    marginBottom:10
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
});

export default Settings;
