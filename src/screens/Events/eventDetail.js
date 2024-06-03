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
import RegisteredUsers from './components/registeredUsers';
import {get, inner_Post} from '../../services/api';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import Loader from '../../components/loader';
import {
  APP_EVENT,
  APP_EVENT_PAST,
  APP_EVENT_UPCOMING,
  FAVORITES,
} from '../../services/config';
import {formatDate, getTimeFromDate, showToast} from '../../utils';
import HTMLContent from '../../components/htmlContent';
const {height, width} = ScaleDimention;

const EventDetails = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const session = useSelector(state => state.session);
  const config = useSelector(state => state.config.configUrls);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const route = useRoute();
  const {_id, type} = route.params;
  // console.log(_id, type);
  useEffect(() => {
    if (session.isLoggedIn) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    // const endpoint=type?APP_EVENT_PAST:APP_EVENT_UPCOMING;
    // console.log(endpoint)
    const EventDetails = await get(`${config?.UrlBasePath}/${APP_EVENT}/${_id}`, session?.user?.token);
    if (EventDetails.success) {
      setData(EventDetails);
    }else{
      showToast('info',EventDetails?.message)
    }
    //
    // console.log('EventDetails----', EventDetails);
    setIsLoading(false);
  };


  const _onBookmarkClicked = async () => {
    const payload = {
      Event: data?.events?.id,
    };
    const favorit = await inner_Post(
      `${config?.UrlBasePath}/${FAVORITES}`,
      session?.user?.token,
      payload,
    );

   
    setData(prevData => ({
      ...prevData,
      events: {
        ...prevData.events,
        bookmarked: !prevData.events.bookmarked
      }
    }));

    showToast('success', favorit.message);
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
          <Text style={styles.events1}>{data?.events?.name}</Text>
        </TouchableOpacity>
        {/*Main Content  */}
        <ScrollView style={{flex:1}} keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false}>
        {data ? <View style={{width: width, marginTop: 15,flex:1}}>
          
           <Banner banner={data?.events?.images} />
          <View style={styles.contentContainer}>
          {isLoading && <Loader />}
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{data?.events?.name}</Text>
                <Text style={styles.price}>{/* $50 */}</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: 10,
                  alignSelf: 'flex-start',
                  justifyContent: 'center',
                }}>
                <Image
                  style={{height: 24, width: 24}}
                  resizeMode="cover"
                  source={require('../../assets/images/iconexlightcalendar5.png')}
                />
                {data && (
                  <Text style={styles.dateLbl}>
                    {formatDate(data?.events?.eventDate)}
                  </Text>
                )}
              </View>

              <View style={{flexDirection: 'row', width: width - 40}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignSelf: 'flex-start',
                    width: '50%',
                  }}>
                  <Image
                    style={{height: 24, width: 24}}
                    resizeMode="cover"
                    source={require('../../assets/images/iconexlightlocation.png')}
                  />
                  <Text style={styles.dateLbl}>
                    {data?.events?.eventAddress}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'flex-end',
                    justifyContent: 'flex-end',
                    width: '50%',
                  }}>
                  <Image
                    style={{height: 24, width: 24}}
                    resizeMode="cover"
                    source={require('../../assets/images/iconexlighttime-circle.png')}
                  />
                  {data && (
                    <Text style={styles.dateLbl}>
                      {getTimeFromDate(data?.events?.eventDate)}
                    </Text>
                  )}
                </View>
              </View>
              {data?.totalParticipants ? (
                <RegisteredUsers
                  totalParticipants={data?.totalParticipants}
                  ProfileImages={data?.ProfileImages}
                />
              ):null}

              <Text style={styles.Headerdescription}>
                {' '}
                {t('screens.EventsDetails.Description')}
              </Text>
                <HTMLContent htmlContent={showFullDescription
                  ? data?.events?.description
                  : data?.events?.description.substring(0, 400)+(data?.events?.description.length >400?'...':'')} />
              {data?.events?.description.length >400 ?  <TouchableOpacity
                 style={{alignSelf:'flex-start',marginLeft:2}}
                  onPress={() => setShowFullDescription(!showFullDescription)}>
                  <Text style={{color: Color.colorDarkred_100}}>
                    
                    {showFullDescription ? t('screens.EventsDetails.See less') : t('screens.EventsDetails.Read more')}
                  </Text>
                </TouchableOpacity>:null}
          </View>
        </View>:null}
        </ScrollView>
      </View>
     
         {/* bottom content */}
         <View style={styles.buttonsConatiner}>
          <CustomButton style={styles.L1Button}
          onPress={_onBookmarkClicked}
          >
            <Image
              style={{height: 30, width: 24}}
              resizeMode="cover"
              // source={require('../../assets/images/bookmark.png')}
              source={data?.events?.bookmarked ?require('../../assets/images/Subtract.png'):require('../../assets/images/bookmark.png')}
          
            />
          </CustomButton>
          <CustomButton
            onPress={() =>
             !data?.isEventBooked? navigation.navigate('EventDetailsPayment',{_id:_id,dataPay:data}):null
              // console.log('')
              }
            style={[styles.L2Button,data?.isEventBooked?{backgroundColor:Color.colorGray_200}:{}]}>
            <Text style={styles.L2ButtonLbl}>
              {' '}
              {t('screens.EventsDetails.Participate')}
            </Text>
          </CustomButton>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Border.br_8xs,
    backgroundColor: Color.colorWhitesmoke_100,
    width: width,
    flex: 1,
  },
  headerConatiner: {
    flexDirection: 'row',
    marginTop: '5%',
    marginLeft: '5%',
    alignItems: 'flex-start',
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
  },

  contentContainer: {
    alignItems: 'center',
    width: width,
    paddingHorizontal: 20,
    justifyContent: 'center',
    marginTop: 8,
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
  },
  buttonsConatiner: {
    shadowRadius: 2, // Shadow radius
    elevation: Platform.OS === 'android' ? 2 : undefined, // Elevation for Android
    shadowOpacity: Platform.OS === 'ios' ? 0.4 : undefined,
    width: width + 10,
    flexDirection: 'row',
    height: 92,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'center',
    borderTopColor: Color.colorDarkgray_100,
    borderTopWidth:0.1
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

  dateLbl: {
    fontFamily: FontFamily.helvetica,
    color: Color.colorGray_300,
    fontSize: FontSize.size_xs,
    fontWeight: '400',
    lineHeight: 14,
    alignSelf: 'center',
    marginLeft: 5,
  },
});

export default EventDetails;
