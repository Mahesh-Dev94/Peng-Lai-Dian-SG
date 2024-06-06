import React, {useEffect, useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  Alert,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
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
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {APP_NOTIFICATION} from '../../services/config';
import {get, getWithPagination} from '../../services/api';
import Loader from '../../components/loader';
import {formatTimeForNow, getImageFullPath, setgetIsNotification} from '../../utils';
const {height, width} = ScaleDimention;
const Notification = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {t} = useTranslation();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const session = useSelector(state => state.session);
  const config = useSelector(state => state.config.configUrls);
  const [page, setPage] = useState(1);
const [totalPage,setTotalPage]=useState(0);

  useEffect(() => {
    if (isFocused) {
    if (session.isLoggedIn) {
      setData([])
      fetchData();
      setgetIsNotification(true);
    }
  }
  }, [isFocused]);

  const fetchData = async (pageNum = 1) => {
    try {
      setIsLoading(true)
      const payload={
        page: pageNum,
        pageSize: 10
        }
      const NotificationList = await getWithPagination(`${config?.UrlBasePath}/${APP_NOTIFICATION}`, session?.user?.token,payload);
      // console.log('newData---',NotificationList.notifications.length)
      setData(prevData => [...prevData, ...NotificationList.notifications]); // Append new data to the existing data
      if (pageNum===1) {
        setTotalPage(NotificationList?.totalPage)
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
        title={item?.Event?.name}
        description={_description}
        onPress={() =>navigation.navigate('EventDetails',{_id:item?.Event?.id,type:'Events'})}
        image={getImageFullPath(config?.imagebasePath, item?.Event?.images)}
        time={formatTimeForNow(item?.createdAt)}
      />
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
        <View style={styles.headerConatiner}>
          <TouchableOpacity onPress={()=>navigation.goBack()} >
          <Image
            style={styles.backIcon}
            resizeMode="cover"
            source={require('../../assets/images/iconexlightleft-2.png')}
          />
          </TouchableOpacity>
          <Text style={styles.headerLabel}> {t('screens.Notification.Notifications')}</Text>
        </View>
      {isLoading && <Loader />}
      <FlatList
        contentContainerStyle={styles.cardContainer}
        showsVerticalScrollIndicator={false}
        data={data} // Provide the array of data
        renderItem={renderItem} // Render function for each item
        keyExtractor={item => item._id.toString()} // Key extractor function
        ListEmptyComponent={
          <View style={styles.emptyComponent}>
           {!isLoading &&  <Text  style={{ color:Color.colorDimgray_200}}>{t('screens.Notification.No notification available!')} </Text>}
          </View>
        }
        windowSize={10}
        initialNumToRender={10}
       onEndReached={handleEndReached}
       onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: Border.br_8xs,
    // backgroundColor: Color.colorWhitesmoke_100,
    paddingVertical:10,
    width: width,
  },
  cardContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // width: width,
    // // marginRight: 8,
    // // paddingHorizontal: 30,
    // paddingBottom: 70,
    // borderRadius: Border.br_8xs,
    // paddingVertical: 10,
  },
  emptyComponent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignItems: 'center',
    paddingTop: 140,
  },
  // headerConatiner: {
  //   flexDirection: 'row',
  //   width: width,
  //   paddingLeft: '5%',
  //   alignItems: 'center',
  //   height:74,
  //   justifyContent:'flex-start',
  //   shadowOffset: {
  //     width: 0,
  //     height: 1, // Elevation only at the bottom
  //   },
  //   shadowRadius: 2, // Shadow radius
  //   elevation: Platform.OS === 'android' ? 2 : undefined, // Elevation for Android
  //   shadowOpacity: Platform.OS === 'ios' ? 0.2 : undefined,
  //   borderBottomColor:'gray',
  //   // borderBottomWidth:.5
  //   marginBottom:10
  // },
  headerConatiner: {
    flexDirection: 'row',
    width: width,
    paddingLeft: '5%',
    alignItems: 'center',
    height: 74,
    justifyContent: 'flex-start',
    shadowOffset: {
      width: 0,
      height: 1, // Elevation only at the bottom
    },
    shadowColor: 'black', // Shadow color
    shadowOpacity: 0.2, // Shadow opacity
    // elevation: Platform.OS === 'android' ? 2 : undefined, // Elevation for Android
    borderBottomColor: 'gray',
    borderBottomWidth: .2,
    marginBottom: 10,
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

export default Notification;
