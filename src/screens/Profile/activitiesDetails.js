import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {FontFamily, Color, FontSize, Border} from '../../GlobalStyles';
import ActivityListItem from './components/ActivityListItem';
import ActivityDetailCard from './components/ActivityDetailCard';
import AttendeeCard from './components/AttendeeCard';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomButton from '../../components/commonButton';
import {ScaleDimention} from '../../GlobalStyles';
import {TRANSACTION} from '../../services/config';
import {useTranslation} from 'react-i18next';
import Loader from '../../components/loader';
import { useSelector } from 'react-redux';
import { get } from '../../services/api';
const {height, width} = ScaleDimention;
const ActivitiesDetail = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const session = useSelector(state => state.session);
  const config = useSelector(state => state.config.configUrls);
  const route = useRoute();
  const {_id} = route.params;
  useEffect(() => {
    if (session.isLoggedIn) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const activitiyDetails = await get(`${config?.UrlBasePath}/${TRANSACTION}/${_id}`,
      session?.user?.token,
    );
    // console.log('activitiyDetails---', activitiyDetails);
    setData(activitiyDetails?.Transactions);

    setIsLoading(false);
  };
  return (
    <SafeAreaView style={{flex: 1, width: width}}>
      <ScrollView style={styles.activitiesDetails} keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false}>
        <View style={styles.activitiesDetailsChild} />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerConatiner}>
          <Image
            style={styles.backIcon}
            resizeMode="cover"
            source={require('../../assets/images/iconexlightleft-2.png')}
          />
          <Text style={styles.headerLabel}>
            {t('screens.ActivityDetails.Activities')}
          </Text>
        </TouchableOpacity>
        <View style={styles.subHeaderContainer}>
          {isLoading && <Loader />}
          <Text style={styles.headerLabel}>{t('screens.ActivityDetails.Booking Details')}</Text>
          {/* <Text style={styles.headerSubLabel}>Amount Paid : $50.00/-</Text> */}
          <Text style={styles.headerSubLabel}>{t('screens.ActivityDetails.Booking ID')} : {data?.transactionId}</Text>
          <ActivityDetailCard data={data} imagebaseURL={config?.imagebasePath}/>
          {/* <AttendeeCard data={data} /> */}

          <View style={styles.emailContainer}>
            <Text style={styles.emailOtherLabel}>
              {t('screens.ActivityDetails.We have sent the pass to')} {' '}: {' '}
              <Text style={styles.email}>{data?.email}</Text>
            </Text>
          </View>

          <CustomButton
            style={styles.ActivityButton}
            onPress={() => navigation.navigate('Help & Support')}>
            <Text style={styles.viewActivities}>{t('screens.ActivityDetails.Help & Support')}</Text>
            <Image
              style={styles.chevronDownIcon}
              resizeMode="cover"
              source={require('../../assets/images/chevrondown2.png')}
            />
          </CustomButton>
          <View style={{height: 90}}></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ActivitiesDetail;

const styles = StyleSheet.create({
  activitiesDetails: {
    borderRadius: Border.br_11xl,
    backgroundColor: Color.colorWhitesmoke_100,
    flex: 1,
    width: width,
  },
  activitiesDetailsChild: {
    top: 8,
    left: 8,
    right: 8,
    borderRadius: Border.br_xl,
    backgroundColor: Color.colorKhaki,
    width: width - 16,
    height: 195,
    position: 'absolute',
  },

  headerConatiner: {
    flexDirection: 'row',
    marginTop: '8%',
    marginLeft: '5%',
    alignItems: 'flex-start',
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
  subHeaderContainer: {
    marginHorizontal: 30,
    alignItems: 'flex-start',
    flexDirection: 'column',
    paddingTop: 15,
  },
  headerSubLabel: {
    fontFamily: FontFamily.helvetica,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    color: Color.colorGray_300,
    paddingTop: 8,
  },

  emailContainer: {
    backgroundColor: Color.colorGainsboro_200,
    padding: 13,
    width: width - 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  emailOtherLabel: {
    fontFamily: FontFamily.helvetica,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14,
    color: Color.colorGray_300,
  },
  email: {
    fontFamily: FontFamily.helvetica,
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 11,
    color: Color.colorGray_200,
  },
  ActivityButton: {
    // shadowRadius: 4,
    // elevation: 4,
    // shadowOpacity: 1,
    // backgroundColor: Color.colorDarkred_100,
    borderWidth: 1,
    borderColor: Color.colorDarkred_100,
    borderRadius: Border.br_3xs,
    flexDirection: 'row',
    marginTop: 20,
    width: width - 60,
    height: 55,
  },
  viewActivities: {
    fontFamily: FontFamily.helvetica,
    color: Color.colorDarkred_100,
    fontSize: FontSize.size_xl,
    textAlign: 'left',
    width: '85%',
  },

  chevronDownIcon: {
    height: 28,
    width: 28,
  },
});
