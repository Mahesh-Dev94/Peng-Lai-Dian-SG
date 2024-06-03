import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {FontFamily, Color, FontSize, Border} from '../../GlobalStyles';
import {ScaleDimention} from '../../GlobalStyles';
import { get } from '../../services/api';
import { useSelector } from 'react-redux';
import { HELP_SUPPORT, TERM_CONDITION } from '../../services/config';
import Loader from '../../components/loader';
import { useTranslation } from 'react-i18next';
import { useIsFocused, useNavigation } from '@react-navigation/core';
import HTMLContent from '../../components/htmlContent';
const {height, width} = ScaleDimention;
const HelpSupport = () => {
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
const helpSupport= await get( `${config?.UrlBasePath}/${HELP_SUPPORT}`, session?.user?.token);
setData(helpSupport.Help)
setIsLoading(false)
}

  return (
   <SafeAreaView style={{flex:1}}>
       <View style={styles.headerConatiner}>
          <TouchableOpacity onPress={()=>navigation.goBack()} >
          <Image
            style={styles.backIcon}
            resizeMode="cover"
            source={require('../../assets/images/iconexlightleft-2.png')}
          />
          </TouchableOpacity>
          <Text style={styles.headerLabel}> {t('screens.Settings.Help & Support')}</Text>
        </View>
        <ScrollView style={{flex:1,width:width}} keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false}>
         <View style={styles.container}>
      {isLoading && <Loader />}
      <HTMLContent htmlContent={data?.description} />
    </View>
    </ScrollView>
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
    borderBottomWidth:.2,
    marginBottom:5
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

export default HelpSupport;
