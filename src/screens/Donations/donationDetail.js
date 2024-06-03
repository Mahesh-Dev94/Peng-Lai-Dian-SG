import React, {useEffect, useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
  Linking,
} from 'react-native';
import {
  FontFamily,
  Color,
  FontSize,
  Border,
  ScaleDimention,
} from '../../GlobalStyles';
import Banner from '../Album/components/banner'; //'./components/banner';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomButton from '../../components/commonButton';
import {APP_DONATION, GET_CONTACT_INFO} from '../../services/config';
import {get} from '../../services/api';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import Loader from '../../components/loader';
import CustomModal from '../../components/customModal';
import HTMLContent from '../../components/htmlContent';
const {height, width} = ScaleDimention;

const DonationDetails = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const session = useSelector(state => state.session);
  const config = useSelector(state => state.config.configUrls);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const route = useRoute();
  const {_id} = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [contacts,setContact]=useState(null)

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  useEffect(() => {
    if (session.isLoggedIn) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const DonationDetails = await get(
      `${config?.UrlBasePath}/${APP_DONATION}/${_id}`,
      // `${APP_DONATION}/${_id}`,
      session?.user?.token,
    );
    setData(DonationDetails.donation);
    setIsLoading(false);
    const contactInfo = await get(
      `${config?.UrlBasePath}/${GET_CONTACT_INFO}`,
      session?.user?.token,
    );
    setContact(contactInfo?.GetContectInfo);
    console.log('contactInfo----',contactInfo)
  
  };

  const makePhoneCall = () => {
    Linking.openURL(`tel:+${contacts?.contactNumber}`);
  };

  const sendEmail = () => {
    Linking.openURL(`mailto:${contacts?.contactEmail}`);
  };

  const openWhatsApp = () => {
    Linking.openURL(`whatsapp://send?text=hello&phone=+${contacts?.whatsapp}`)
  };

  return (
    <SafeAreaView style={{flex: 1, width: width}}>
     
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.headerConatiner}>
            <Image
              style={styles.backIcon}
              resizeMode="cover"
              source={require('../../assets/images/iconexlightleft-2.png')}
            />
            <Text style={styles.events1}>{data?.title}</Text>
          </TouchableOpacity>
          {/*Main Content  */}
          <ScrollView style={{flex: 1}} keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false}>
          <View style={{width: width, marginTop:5, flex: 1}}>
            {isLoading && <Loader />}
            <Banner banner={data?.images} />
            <View style={styles.contentContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{data?.title}</Text>
                <Text style={styles.price}>{/* $300 */}</Text>
              </View>

              <Text style={styles.Headerdescription}>
                {t('screens.DonationDetails.Description')}{' '}
              </Text>
              {/* <Text style={styles.description}
              numberOfLines={showFullDescription ? undefined : 6}
              >
                { data?.description}
              </Text> */}
               <HTMLContent htmlContent={showFullDescription
                  ? data?.description
                  : data?.description.substring(0, 600)+(data?.description.length >600 ?'...':'')} />
              {data?.description.length >600 ?  <TouchableOpacity
                 style={{alignSelf:'flex-start',marginLeft:2}}
                  onPress={() => setShowFullDescription(!showFullDescription)}>
                  <Text style={{color: Color.colorDarkred_100}}>
                    
                    {showFullDescription ? t('screens.DonationDetails.See less') : t('screens.DonationDetails.Read more')}
                  </Text>
                </TouchableOpacity>:null}
            </View>
          </View>
          </ScrollView>
        </View>
  
      {/* bottom content */}
      <View style={styles.buttonsConatiner}>
        {/* <CustomButton style={styles.L1Button}>
			  <Image style={{height:30,width:24}} resizeMode="cover" source={require("../../assets/images/bookmark.png")} />
              </CustomButton> */}
        <CustomButton onPress={toggleModal} style={styles.L2Button}>
          <Text style={styles.L2ButtonLbl}>
            {' '}
            {t('screens.DonationDetails.Contact Us')}
          </Text>
        </CustomButton>
      </View>

      {/* Contact us Modal */}
      <CustomModal isVisible={isModalVisible} onClose={toggleModal}>
        <View
          style={{
            // flexDirection: 'column',
            // marginHorizontal: '1%',
            marginVertical: '10%',
            borderRadius: 20,
            backgroundColor: Color.colorWhitesmoke_100,
          }}>
          <View
            style={{
              // marginHorizontal: 5,
              paddingVertical: 15,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={toggleModal}
              style={{
                width: 30,
                alignSelf:'flex-start'
              }}>
              <Image
                style={styles.backIcon}
                resizeMode="cover"
                source={require('../../assets/images/iconexlightleft-2.png')}
              />
            </TouchableOpacity>
            <View style={styles.popupLblContainer}>
              <Text style={styles.DeleteLbl2}>
                {t(
                  'screens.DonationDetails.Choose how you want to contact us?',
                )}
              </Text>
            </View>
          </View>

          <View style={styles.popupLblContainer}>

            <View style={styles.listContainer}>
              <TouchableOpacity onPress={openWhatsApp} style={styles.listItem}>
                <Image source={require('../../assets/images/whatsapp.png')} />
                <Text
                  style={[styles.titleStyle, {color: Color.colorDarkred_100}]}>
                  {t('screens.DonationDetails.Whatsapp')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={makePhoneCall} style={styles.listItem}>
                <Image source={require('../../assets/images/phone.png')} />
                <Text style={styles.titleStyle}>
                  {t('screens.DonationDetails.Call')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={sendEmail}
                style={[styles.listItem, {borderBottomWidth: 0}]}>
                <Image source={require('../../assets/images/envelope.png')} />
                <Text style={styles.titleStyle}>
                  {t('screens.DonationDetails.E-mail')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </CustomModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Border.br_8xs,
    // backgroundColor: Color.colorWhitesmoke_100,
    width: width,
    flex: 1,
  },
  headerConatiner: {
    flexDirection: 'row',
    marginTop: '5%',
    marginLeft: '5%',
    alignItems: 'flex-start',
    marginBottom:10
    // flex:.5
  },
  backIcon: {
    width: '30%',
    height: 24,
    width: 24,
    marginRight: 10,
    // marginTop: 3,
  },

  events1: {
    fontSize: FontSize.size_mini,
    fontWeight: '400',
    color: Color.colorGray_300,
    fontFamily: FontFamily.helvetica,
    textAlign: 'left',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  contentContainer: {
    alignItems: 'center',
    width: width,
    paddingHorizontal: 20,
    justifyContent: 'center',
    marginTop: -15,
    backgroundColor: Color.colorWhitesmoke_100,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginBottom: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    width: width - 40,
    justifyContent: 'center',
    marginVertical: 10,
    paddingTop: 15,
  },
  title: {
    fontFamily: FontFamily.helvetica,
    fontSize: FontSize.size_xl,
    lineHeight: 23,
    fontWeight: '700',
    alignSelf: 'flex-start',
    color: Color.colorGray_300,
    width: '80%',
  },
  price: {
    alignSelf: 'flex-end',
    fontFamily: FontFamily.helvetica,
    fontSize: FontSize.size_xl,
    lineHeight: 23,
    fontWeight: '700',
    color: Color.colorDarkred_100,
    textAlign: 'right',
    width: '20%',
  },
  Headerdescription: {
    fontFamily: FontFamily.helvetica,
    fontSize: FontSize.size_base,
    lineHeight: 18,
    fontWeight: '400',
    color: Color.colorGray_300,
    marginVertical: 10,
    alignSelf: 'flex-start',
  },
  description: {
    fontFamily: FontFamily.helvetica,
    fontSize: FontSize.size_xs,
    lineHeight: 14,
    fontWeight: '400',
    color: Color.colorGray_300,
    backgroundColor: Color.colorWhitesmoke_100,
  },
  buttonsConatiner: {
    // flex:.7,
    shadowRadius: 4, // Shadow radius
    elevation: Platform.OS === 'android' ? 4 : undefined, // Elevation for Android
    shadowOpacity: Platform.OS === 'ios' ? 0.4 : undefined,
    width: width + 10,
    flexDirection: 'row',
    height: 92,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'center',
    borderTopColor: Color.colorDarkgray_100,
    // borderTopWidth:1
  },

  L1Button: {
    // backgroundColor: Color.colorDarkred_100,
    borderRadius: Border.br_3xs,
    height: 55,
    width: 88,
    // marginRight:30,
    borderColor: Color.colorDarkgray_100,
    borderWidth: 1,
  },

  L2Button: {
    backgroundColor: Color.colorDarkred_100,
    borderRadius: Border.br_3xs,
    height: 55,
    width: 197,
    // marginBottom: 20,
  },

  L2ButtonLbl: {
    fontFamily: FontFamily.helvetica,
    color: Color.colorWhitesmoke_100,
    fontSize: FontSize.size_xl,
    fontWeight: '400',
    lineHeight: 23,
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
    alignSelf: 'center',
    textAlign: 'center',
    marginLeft: 5,
  },
  listContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  listItem: {
    width: 256,
    borderBottomWidth: 0.5,
    borderBottomColor: Color.colorDarkgray_100,
    paddingVertical: 15, // Adjust as needed
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
  },
});

export default DonationDetails;
