import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {Color, FontFamily, Border, FontSize} from '../../GlobalStyles';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {ScaleDimention} from '../../GlobalStyles';
import VideoCard from './videoCard';
import { useSelector } from 'react-redux';
import { ABOUT_US } from '../../services/config';
import { useTranslation } from 'react-i18next';
import { getImageFullPath } from '../../utils';
import Loader from '../../components/loader';
import { get } from '../../services/api';
import HTMLContent from '../../components/htmlContent';
const {height, width} = ScaleDimention;
const AboutUs = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { t } = useTranslation();
  const [data,setData]=useState(null)
  const [isLoading,setIsLoading]=useState(false);
  const session = useSelector(state => state.session);
  const config = useSelector((state) => state.config.configUrls);

useEffect(()=>{
  if (isFocused) {
  if (session.isLoggedIn) {
    fetchData()
  }
  }
},[isFocused])

const fetchData=async()=>{
  setIsLoading(true)
  const aboutDetails = await get(`${config?.UrlBasePath}/${ABOUT_US}`, session?.user?.token);
  setData(aboutDetails.About)
  setIsLoading(false)
}

  return (
    <SafeAreaView style={{flex: 1, width: width}}>
     
      <ScrollView style={styles.about} keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false}>
        <View style={styles.aboutChild} />
        <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.headerConatiner}>
          <Image
            style={styles.backIcon}
            resizeMode="cover"
            source={require('../../assets/images/iconexlightleft-2.png')}
          />
          <Text style={styles.events1}>  {t('screens.AboutUs.About Us')} </Text>
        </TouchableOpacity>
        <View style={styles.bannerContainer}>
          {/* <Text style={styles.aboutLbl}>
          {data?.subtitle}
          </Text> */}
         {data && <Image
            style={styles.banner}
            resizeMode="cover"
            source={getImageFullPath(config?.imagebasePath,data?.image)}
          />}
		
        </View>

       <View style={styles.categoryContainer}>
       {isLoading && <Loader/>}
	   <Text style={styles.categoryLbl}>{t('screens.AboutUs.History')}</Text>
        {/* <Text style={styles.cateLbl}>
          {data?.description}
        </Text> */}
       {data?.description ? <HTMLContent htmlContent={data?.description} />:null}

        <Text style={styles.categoryLbl}> {t('screens.AboutUs.videos')}</Text>
         <View style={{marginBottom:40}}>
         {data && <VideoCard  videoUrl={data?.video1link} title={data?.video1title} />}
		 </View>
		 <View style={{marginBottom:40}}>
     {data &&<VideoCard videoUrl={data?.video2link} title={data?.video2title} />}
		 </View>
	   </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  about: {
    width: width,
    borderRadius: Border.br_11xl,
    backgroundColor: Color.colorWhitesmoke_100,
    flex: 1,
  },
  aboutChild: {
    top: 8,
    left: 8,
    right: 8,
    borderRadius: Border.br_xl,
    backgroundColor: Color.colorKhaki,
    width: width - 16,
    height: 222,
    position: 'absolute',
  },
  headerConatiner: {
    flexDirection: 'row',
    marginTop: '7%',
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

  bannerContainer: {
    flexDirection: 'column',
    width: width - 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 25,
  },
  aboutLbl: {
    fontFamily: FontFamily.helvetica,
    fontSize: 12,
    fontWeight: '400',
    color: Color.colorGray_300,
    marginTop: 25,
    width: width - 50,
  },
  banner: {
    height: 180,
    width: width - 50,
    marginTop: 25,
    borderRadius: 15,
  },

  events1: {
    fontSize: FontSize.size_xl,
    fontWeight: '700',
    color: Color.colorGray_300,
    fontFamily: FontFamily.helvetica,
    textAlign: 'left',
  },
  categoryContainer: {
    flexDirection: 'column',
    width: width - 50,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: 25,
	marginTop:10
  },
  categoryLbl: {
    fontFamily: FontFamily.helvetica,
    fontSize: 16,
    fontWeight: '400',
    color: Color.colorGray_300,
    lineHeight: 18,
    marginVertical: 10,
    textAlign: 'left',
	alignItems:'flex-start'
  },
  cateLbl: {
    fontFamily: FontFamily.helvetica,
    fontSize: 12,
    fontWeight: '400',
    color: Color.colorGray_300,
  },
});

export default AboutUs;
