import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  FontFamily,
  Color,
  FontSize,
  Border,
  ScaleDimention,
} from '../../GlobalStyles';
import {useNavigation} from '@react-navigation/native';
import CustomModal from '../../components/customModal';
import CustomButton from '../../components/commonButton';
import { useTranslation } from 'react-i18next';
const {height, width} = ScaleDimention;

const EventDetailsPaymentQr = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  return (
    <SafeAreaView style={{flex: 1, width: width,backgroundColor: Color.colorWhitesmoke_100,}}>
      <TouchableOpacity
        // onPress={() => navigation.goBack()}
        style={styles.headerConatiner}>
        <Image
          style={styles.backIcon}
          resizeMode="cover"
          source={require('../../assets/images/iconexlightleft-2.png')}
        />
        <Text style={[styles.payment1, styles.payment1Typo]}>{t('screens.EventPaymentQr.Payment')}</Text>
      </TouchableOpacity>

      <View style={styles.payment}>
        {/* <View style={[styles.groupItem]}>
          <View style={{flexDirection: 'row', padding: 10}}>
            <View
              style={{
                flexDirection: 'row',
                width: '90%',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                alignSelf: 'flex-start',
              }}>
              <Image
                style={[styles.iconexlightlinkLayout]}
                resizeMode="cover"
                source={require('../../assets/images/iconexlightscanner.png')}
              />
              <Text style={[styles.qrCodeTypo]}>QR Code</Text>
            </View>
            <View
              style={{
                width: '10%',
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={[styles.path3Icon]}
                resizeMode="cover"
                source={require('../../assets/images/path-3.png')}
              />
            </View>
          </View>

          <View style={styles.rectangleGroup}>
            <Image
              style={[styles.groupInner]}
              resizeMode="cover"
              source={require('../../assets/images/group-267.png')}
            />
            <Image
              style={[styles.vectorIcon]}
              resizeMode="cover"
              source={require('../../assets/images/vector.png')}
            />
          </View>
        </View>

        <TouchableOpacity onPress={toggleModal} style={styles.groupChild}>
          <Image
            style={styles.iconexlightlinkLayout}
            resizeMode="cover"
            source={require('../../assets/images/iconexlightcamera.png')}
          />
          <Text style={[styles.payment1Typo]}>Scan Code</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleModal} style={styles.groupChild1}>
          <Text style={[styles.payment1Typo, {width: '70%'}]}>
            Attach reciept
          </Text>
          <Image
            style={styles.iconexlightlinkLayout}
            resizeMode="cover"
            source={require('../../assets/images/iconexlightlink.png')}
          />
        </TouchableOpacity> */}

        {/* Forgot Password Modal */}
        {/* <CustomModal isVisible={isModalVisible} onClose={toggleModal}> */}
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
                paddingHorizontal: 15,
                paddingVertical: 20,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Color.colorWhitesmoke_100,
              }}>
              {/* <TouchableOpacity
                onPress={toggleModal}
                style={styles.ModalheaderConatiner}>
                <Image
                  style={styles.backIcon}
                  resizeMode="cover"
                  source={require('../../assets/images/iconexlightleft-2.png')}
                />
              </TouchableOpacity> */}

              <View style={styles.popupLblContainer}>
              
              <Image
                  style={{height:80,width:80}}
                  resizeMode="cover"
                  source={require('../../assets/images/Group.png')}
                />
                <Text style={styles.SuccessLbl}>{t('screens.EventPaymentQr.Thank you!')}</Text>
                <Text style={styles.SuccessLbl2}>
                  {t('screens.EventPaymentQr.We have recieved your reciept, our team will shortly share the confirmation with you')}
                </Text>
              </View>

              <CustomButton
                style={styles.L2Button}
                onPress={() => navigation.popToTop()}>
                <Text style={styles.L2ButtonLbl}>{t('screens.EventPaymentQr.Back to home')}</Text>
              </CustomButton>
            </View>
          </View>
        {/* </CustomModal> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Border.br_8xs,
    backgroundColor: Color.colorWhitesmoke_100,
    flex:1
  },
  headerConatiner: {
    flexDirection: 'row',
    marginTop: '5%',
    marginLeft: '5%',
    alignItems: 'flex-start',
    width: width,
    backgroundColor: Color.colorWhitesmoke_100,
  },
  backIcon: {
    width: '30%',
    height: 24,
    width: 24,
    marginRight: 10,
  },

  events1: {
    fontSize: FontSize.size_mini,
    fontWeight: '400',
    color: Color.colorGray_300,
    fontFamily: FontFamily.helvetica,
    textAlign: 'left',
    justifyContent: 'center',
  },

  payment: {
    borderRadius: Border.br_11xl,
    flex: 1,
    width: width,
    backgroundColor: Color.colorWhitesmoke_100,
    marginTop: 20,
    // justifyContent:'center',
    alignItems: 'center',
  },
  payment1: {
    fontWeight: '700',
  },
  payment1Typo: {
    textAlign: 'left',
    fontSize: FontSize.size_xl,
    color: Color.colorGray_300,
    fontFamily: FontFamily.helvetica,
  },
  groupItem: {
    backgroundColor: Color.colorGainsboro_500,
    borderRadius: Border.br_3xs,
    height: 357,
    width: 282,
    marginTop: 20,
  },
  qrCodeTypo: {
    textAlign: 'center',
    color: Color.colorGray_300,
    fontFamily: FontFamily.helvetica,
    fontSize: FontSize.size_base,
    marginLeft: 5,
  },

  path3Icon: {
    height: 7,
    width: 14,
  },

  rectangleGroup: {
    width: 282,
    height: 270,
  },
  groupInner: {
    width: 269,
    height: 262,
  },
  vectorIcon: {
    height: 202,
    width: 202,
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    bottom: 40,
    right: 45,
  },
  groupChild: {
    backgroundColor: 'rgba(18, 12, 12, 0)',
    borderStyle: 'solid',
    borderColor: Color.colorBlack,
    borderWidth: 1,
    borderRadius: Border.br_3xs,
    flexDirection: 'row',
    width: 282,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 25,
  },

  groupChild1: {
    backgroundColor: Color.colorGainsboro_200,
    borderRadius: Border.br_3xs,
    flexDirection: 'row',
    width: 282,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconexlightlinkLayout: {
    width: 24,
    height: 24,
    marginRight: 5,
    marginLeft: 5,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  ModalheaderConatiner: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  backIcon: {
    height: 24,
    width: 24,
    marginRight: 5,
    marginTop: 3,
  },

  popupLblContainer: {
    width: 282,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center'
  },

  L2Button: {
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    backgroundColor: Color.colorDarkred_100,
    borderRadius: Border.br_3xs,
    height: 55,
    width: 282,
    marginBottom: 20,
  },

  L2ButtonLbl: {
    fontFamily: FontFamily.helvetica,
    color: Color.colorWhitesmoke_100,
    fontSize: FontSize.size_xl,
    fontWeight: '400',
    lineHeight: 23,
  },

  SuccessLbl: {
    fontFamily: FontFamily.helvetica,
    color: Color.colorGray_300,
    fontSize: FontSize.size_xxl,
    fontWeight: '700',
    lineHeight: 28,
    alignSelf: 'center',
    marginBottom:10,
    marginTop:10
  },

  SuccessLbl2: {
    fontFamily: FontFamily.helvetica,
    color: Color.colorDimgray_200,
    fontSize: FontSize.size_base,
    fontWeight: '700',
    lineHeight: 18,
    marginVertical:15,
    textAlign:'center'
  },
});

export default EventDetailsPaymentQr;
