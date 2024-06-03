import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import {FontFamily, Color, FontSize, Border} from '../../GlobalStyles';
import {ScaleDimention} from '../../GlobalStyles';
import { get } from '../../services/api';
import { useSelector } from 'react-redux';
import { TERM_CONDITION } from '../../services/config';
import Loader from '../../components/loader';
import { useTranslation } from 'react-i18next';
import { useIsFocused, useNavigation } from '@react-navigation/core';
import HTMLContent from '../../components/htmlContent';
const {height, width} = ScaleDimention;
const TermsCondition = () => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
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

},[])

const fetchData=async()=>{
setIsLoading(true)
const termsCondition= await get( `${config?.UrlBasePath}/${TERM_CONDITION}`, session?.user?.token);
setData(termsCondition.Terms)
setIsLoading(false)
}
  return (
   <SafeAreaView style={{flex:1,width:width}}>
       <View style={styles.headerConatiner}>
          <TouchableOpacity onPress={()=>navigation.goBack()} >
          <Image
            style={styles.backIcon}
            resizeMode="cover"
            source={require('../../assets/images/iconexlightleft-2.png')}
          />
          </TouchableOpacity>
          <Text style={styles.headerLabel}> {t('screens.Settings.Terms & Conditions')}</Text>
        </View>
         <View style={styles.container}>
      {isLoading && <Loader />}
      {/* <Text style={styles.description}>
        {data?.description}
      </Text> */}
      {data?.description ? <HTMLContent htmlContent={data?.description} />:null}
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
    padding:5
  },
  description:{
    fontFamily:FontFamily.helvetica,
    fontSize:12,
    fontWeight:'400',
    lineHeight:14,
    color:Color.colorGray_300
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
    borderBottomWidth:.2
    // marginBottom:10
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

export default TermsCondition;
