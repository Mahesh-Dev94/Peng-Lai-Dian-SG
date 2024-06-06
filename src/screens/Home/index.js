import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { FontFamily, Color, FontSize, Border } from '../../GlobalStyles';

import { ScaleDimention } from '../../GlobalStyles';
const { height, width } = ScaleDimention;
import Search from './components/search';
import Header from './components/header';
import Banner from './components/banner';
import Post from './components/post';
import { useDispatch, useSelector } from 'react-redux';
import { get, getWithPagination, post } from '../../services/api';
import { HOME } from '../../services/config';
import ImageView from 'react-native-image-viewing';
import { useTranslation } from 'react-i18next';
import Loader from '../../components/loader';
import { persistLogout } from '../../Redux/Reducers/sessionSlice';
import { useIsFocused, useNavigation } from '@react-navigation/core';

const HomescreenOption = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const session = useSelector(state => state.session);
  const config = useSelector((state) => state.config.configUrls);
  const [isLoading, setisLoading] = useState(false);
  const [timeline, setTimeline] = useState([]);
  const [banner, setBanner] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [images,setimages]=useState([]);
  const [page, setPage] = useState(1);
  const [totalPage,setTotalPage]=useState(0);

  console.log(session.isLoggedIn,config)

  useEffect(() => {

    if (isFocused) {
     
      if (session.isLoggedIn && config ) {
        
        setTimeline([])
        console.log('session.isLoggedIn && config',session && config)
        fetchData();
      }
    }
  }, [isFocused]);

  const _onLogout=()=>{
		dispatch(persistLogout())
		navigation.navigate('Register')
	}

    const fetchData = async (pageNum = 1) => {
    try {
      setisLoading(true);
      const payload={
        page: pageNum,
        pageSize: 10
        }
      const homeDetails = await getWithPagination(`${config?.UrlBasePath}/${HOME}`, session.user.token,payload);
      // console.log('newData---',homeDetails?.timeLine.length)
      setTimeline(prevData => [...prevData, ...homeDetails?.timeLine]); // Append new data to the existing data
      if (pageNum===1) {
        setBanner(homeDetails?.banner)
        setTotalPage(homeDetails?.totalPage)
      }
      setisLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      _onLogout();
    } finally {
      setisLoading(false);
    }
  };

  const appendBaseUrlToImages = async(imagesArray, baseUrl) => {
    return imagesArray.map(imageName => {
      return { uri: `${baseUrl}/${imageName}` }; // Append base URL to the URI
    });
  };

  _openImageViewer=async(imgs)=>{
    const imageList=await appendBaseUrlToImages(imgs,config?.imagebasePath);
    // console.log('images----',imageList)
    setimages(imageList)
    setIsVisible(true) 
  }

  const renderItem = ({ item,index }) => (
    <View style={{paddingTop:index===0? 60:0}}>
    <Post item={item} _onSlider={(imgs) =>_openImageViewer(imgs)} imagePath={config?.imagebasePath}/>
    </View>
  );

  const handleEndReached = () => {
    // Load more data when reaching the end of the list
    // console.log(!isLoading, timeline.length,page ,totalPage)
    if (!isLoading && page < totalPage) {
      const nextPage = page + 1;
      // console.log(timeline.length,nextPage)
      setisLoading(true); 
      fetchData(nextPage);
      setPage(nextPage);
    }
  };
 

  const renderHeader = () => {
    return (
      <>
      <View style={styles.homescreenOption1Item}>
      <Header />
      <Search onPress={()=>navigation.navigate('search')} />
    </View>
    <View
      style={{
        height: 175,
        width: width,
        position: 'absolute',
        zIndex: 999,
        top: 130,
      }}>
      <Banner banner={banner} />
    </View>
    </>
    );
  };







  

  return (
    <SafeAreaView style={{ flex: 1, width: width }}>
      <View style={styles.container}>
      {isLoading && <Loader />}
          <FlatList
           ListHeaderComponent={renderHeader}
            showsVerticalScrollIndicator={false}
            style={styles.postContainer}
            contentContainerStyle={{ width: width,paddingBottom:60 }}
            data={timeline}
            renderItem={renderItem}
            keyExtractor={(item,index) => item._id.toString()+index}
            windowSize={10}
            initialNumToRender={10}
           onEndReached={handleEndReached}
           onEndReachedThreshold={0.5}
            // ListFooterComponent={renderFooter}
            ListEmptyComponent={
              <View style={styles.emptyComponent}>
              {!isLoading &&  <Text> {t('screens.Home.No post available!')}</Text>}
              </View>
            }
          />
        <ImageView
          images={images}
          imageIndex={0}
          visible={isVisible}
          keyExtractor={(imageSrc, index) => imageSrc + index}
          onRequestClose={() => setIsVisible(false)}
        />
      </View>
    </SafeAreaView>
  );



};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhitesmoke_100,
    borderRadius: Border.br_11xl,
  },
  homescreenOption1Item: {
    backgroundColor: Color.colorKhaki,
    width: width - 20,
    height: 222,
    borderRadius: Border.br_xl,
    margin: 10,
  },
  postContainer: {
    flexDirection: 'column',
    width: width,
    height:'100%'
  },
  loadingFooter: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyComponent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop:100
  },
});

export default HomescreenOption;
