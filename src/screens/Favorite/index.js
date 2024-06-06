import React, { useEffect, useState } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  Alert,
  TouchableOpacity,
  Platform,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {
  FontFamily,
  Color,
  FontSize,
  Border,
  ScaleDimention,
} from '../../GlobalStyles';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import NotificationListItem from './NotificationListItem';
import { get, getWithPagination } from '../../services/api';
import { FAVORITES } from '../../services/config';
import { useSelector } from 'react-redux';
import Loader from '../../components/loader';
import { useTranslation } from 'react-i18next';
import { getImageFullPath } from '../../utils';
const {height, width} = ScaleDimention;
const Favorite = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {t} = useTranslation();
  const [data,setData]=useState([])
  const [isLoading,setIsLoading]=useState(false);
  const session = useSelector(state => state.session);
  const config = useSelector((state) => state.config.configUrls);
  const [page, setPage] = useState(1);
  const [totalPage,setTotalPage]=useState(0);
  
  useEffect(()=>{
    if (isFocused) {
  if (session.isLoggedIn) {
    setData([])
    fetchData()
  }
}
  
  },[isFocused])
  
  // const fetchData=async()=>{
  // setIsLoading(true)
  // const favorit= await get(`${config?.UrlBasePath}/${FAVORITES}`, session?.user?.token);
  // setData(favorit.favorites)
  // console.log('favorites--',favorit)
  // setIsLoading(false)
  // }

  const fetchData = async (pageNum = 1) => {
    try {
      setIsLoading(true)
      const payload={
        page: pageNum,
        pageSize: 10
        }
      const favorit = await getWithPagination(`${config?.UrlBasePath}/${FAVORITES}`, session?.user?.token,payload);
      // console.log('newData---',favorit.favorites.length)
      setData(prevData => [...prevData, ...favorit.favorites]); // Append new data to the existing data
      if (pageNum===1) {
        setTotalPage(favorit?.totalPage)
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






  const renderItem = ({item}) => {
    const _description = item.description.substring(
      0,
      item.description.indexOf(' ', 40),
    );
    return (
      <NotificationListItem
        title={item?.name}
        description={_description}
        onPress={() =>navigation.navigate('EventDetails',{_id:item?.eventId,type:'Events'})}
        image={getImageFullPath(config?.imagebasePath, item?.images)}
      />
    );
  };

  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
       <View style={styles.headerConatiner}>
          <TouchableOpacity onPress={()=>navigation.openDrawer()} >
          <Image
            style={styles.backIcon}
            resizeMode="cover"
            source={require('../../assets/images/iconexfilledburger.png')}
          />
          </TouchableOpacity>
          <Text style={styles.headerLabel}> {t('screens.Bookmark.Bookmarks')}</Text>
        </View>
        {isLoading && <Loader />}

        <FlatList
        // contentContainerStyle={styles.cardContainer}
        showsVerticalScrollIndicator={false}
        data={data} // Provide the array of data
        renderItem={renderItem} // Render function for each item
        keyExtractor={item => item._id.toString()} // Key extractor function
        ListEmptyComponent={
          <View style={styles.emptyComponent}>
         { !isLoading && <Text>{t('screens.Bookmark.No favorites available!')} </Text>}
            
          </View>
        }
        windowSize={10}
        initialNumToRender={10}
       onEndReached={handleEndReached}
       onEndReachedThreshold={0.5}
      />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Border.br_11xl,
    // backgroundColor: Color.colorWhitesmoke_100,
    flex: 1,
    width: width,
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
    // shadowOpacity: Platform.OS === 'ios' ? .4 : undefined,
    borderBottomColor:'gray',
    borderBottomWidth:Platform.OS === 'android'?0:.4,
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
  emptyComponent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignItems: 'center',
    paddingTop: 140,
  },
});

export default Favorite;
