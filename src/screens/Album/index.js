import React,{useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {FontSize, FontFamily, Color, Border} from '../../GlobalStyles';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import EventCard from  './components/EventCard';
import {ScaleDimention} from '../../GlobalStyles';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { APP_ALBUM } from '../../services/config';
import Loader from '../../components/loader';
import { get, getWithPagination } from '../../services/api';
import { formatDate, getImageFullPath } from '../../utils';
const {height, width} = ScaleDimention;

const Albums = () => {
const navigation=useNavigation();
const isFocused = useIsFocused();
const { t } = useTranslation();
const [data,setData]=useState([])
const [isLoading,setIsLoading]=useState(false);
const session = useSelector(state => state.session);
const config = useSelector((state) => state.config.configUrls);
const [page, setPage] = useState(1);
const [totalPage,setTotalPage]=useState(0);

useEffect(()=>{
  // if (isFocused) {
if (session.isLoggedIn) {
  setData([])
  fetchData()
}
  // }
},[])


const fetchData = async (pageNum = 1) => {
  try {
    setIsLoading(true)
    const payload={
      page: pageNum,
      pageSize: 5
      }
    const albumList = await getWithPagination( `${config?.UrlBasePath}/${APP_ALBUM}`, session?.user?.token,payload);
    // console.log('newData---',albumList?.Albums.length)
    setData(prevData => [...prevData, ...albumList.Albums]); // Append new data to the existing data
    if (pageNum===1) {
      setTotalPage(albumList?.totalPage)
    }
    setIsLoading(false);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    setIsLoading(false);
  }
};

const handleEndReached = () => {
  // Load more data when reaching the end of the list
  // console.log(!isLoading, data.length,page ,totalPage)
  if (!isLoading && page < totalPage) {
    const nextPage = page + 1;
    // console.log(data.length,nextPage)
    setIsLoading(true); 
    fetchData(nextPage);
    setPage(nextPage);
  }
};

const renderItem=({item})=>{
  const _description= item.description.substring(0, item.description.indexOf(' ', 40));
  return(<EventCard banner={getImageFullPath(config?.imagebasePath,item?.albumimages)} _id={item._id}  title={item.title} description={_description} date={formatDate(item.createdAt)} />)}
  return (
    <SafeAreaView style={{flex:1,width:width}}>
    <View style={styles.events}>
      {isLoading && <Loader/>}
      <View style={styles.eventsChild} />

      <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.headerConatiner}>
        <Image
          style={styles.backIcon}
          resizeMode="cover"
          source={require('../../assets/images/iconexlightleft-2.png')}
        />
        <Text style={styles.events1}> {t('screens.Album.Album')}</Text>
      </TouchableOpacity>
      <FlatList
      contentContainerStyle={styles.cardContainer}
      showsVerticalScrollIndicator={false}
      style={{flex: 1}}
      data={data} // Provide the array of data
      renderItem={renderItem} // Render function for each item
      keyExtractor={(item,index) => item._id.toString()+index} // Key extractor function
      windowSize={10}
      initialNumToRender={10}
     onEndReached={handleEndReached}
     onEndReachedThreshold={0.5}
      // ListFooterComponent={renderFooter}
      ListEmptyComponent={
        <View style={styles.emptyComponent}>
         {!isLoading && <Text style={{color: Color.colorDimgray_200}}>{t('screens.Album.No Albums!')} </Text>}
        </View>
      }
    />
      {/* <ScrollView contentContainerStyle={styles.cardContainer} style={{flex: 1}}>

      <EventCard title={'Buddha Lifestyle'} description={'Arrangements needs to be done'} date={'23/01/2024'} />
      <EventCard title={'Buddha Pshycology'} description={'Arrangements needs to be done'} date={'23/01/2024'} />
      <EventCard title={'Buddhas Image'} description={'Arrangements needs to be done'} date={'23/01/2024'} />
	  <EventCard title={'Buddha Pshycology'} description={'Arrangements needs to be done'} date={'23/01/2024'} />


    </ScrollView> */}
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  events: {
    borderRadius: Border.br_11xl,
    backgroundColor: Color.colorWhitesmoke_100,
    flex: 1,
    // width: width
  },
  eventsChild: {
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
    marginTop: '10%',
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

  events1: {
    // top: 37,
    // left: 60,
    fontSize: FontSize.size_xl,
    fontWeight: '700',
    color: Color.colorGray_300,
    fontFamily: FontFamily.helvetica,
    textAlign: 'left',
  },

  TabViewConaatiner: {
    backgroundColor: 'transparent',
    marginTop: 10,
    borderBottomColor: 'green',
    borderBottomWidth: 1,
  },

  tabView: {
    backgroundColor: 'transparent',
    width: width / 1.6,
    elevation: 0,
    marginLeft: 8,
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width - 16,
    marginHorizontal: 8,
    // borderTopColor: Color.colorDarkgray_100,
    // borderTopWidth: 1,
    paddingBottom:70
  },
  emptyComponent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignItems: 'center',
    paddingTop: 140,
  },
});

export default Albums;
