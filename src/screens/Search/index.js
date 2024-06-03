import React, {useEffect, useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {
  FontFamily,
  Color,
  FontSize,
  Border,
  ScaleDimention,
} from '../../GlobalStyles';
import SearchInput from '../../components/searchInput';
import SearchListItem from './SearchListItem';
import DatePicker from 'react-native-date-picker';
import {formatDate, getImageFullPath} from '../../utils';
import {SEARCH} from '../../services/config';
import Loader from '../../components/loader';
import {useSelector} from 'react-redux';
import {get, getWithPagination} from '../../services/api';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
// const {width} = Dimensions.get('window');
const {height, width} = ScaleDimention;
const Search = () => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [_Date, setDate] = useState('');
  const [query, setquery] = useState('');
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const session = useSelector(state => state.session);
  const config = useSelector(state => state.config.configUrls);
  const [page, setPage] = useState(1);
  const [totalPage,setTotalPage]=useState(0);

  // useEffect(() => {
  //   if (session.isLoggedIn && config) {
  //     if (query.length>2) {
  //       fetchData(query);
  //     }
  //   }
  // }, [query]);


  useEffect(() => {
    if (session.isLoggedIn && config) {
      if (query.length > 2) {
        fetchData(query);
      }
    }
  }, [query]);

  // useEffect(() => {
  //   if (_Date) {
  //     const _date=formatDate(_Date)
  //     fetchData(_date);
  //   }
  // }, [_Date]);



  const fetchData = async (searchQuery) => {
    try {
      
  
    console.log('queryString---', searchQuery);
    setIsLoading(true);
    const payload = {
      page: 1,
      pageSize: 100,
      searchTerm: searchQuery,
    };
    const searchList = await getWithPagination(
      `${config?.UrlBasePath}/${SEARCH}`,
      session.user.token,
      payload,
    );

    console.log('searchList---', searchList);
    setEvents(searchList?.results);

    setIsLoading(false);
  } catch (error) {
    setEvents([]);
    setIsLoading(false);
  }
  };

  const _onPressItem=(_id,type)=>{
    if (type) {
      navigation.navigate('EventDetails', {_id:_id, type: 1})
    }
   
  }

  const renderItem=({item})=>(
    <SearchListItem
    title={item.type==='event' ?item?.name:item?.description.substring(0, 35)}
    date={ item.type==='event' ? format(new Date(item?.eventDate), 'dd/MM/yyyy'):format(new Date(item?.createdAt), 'dd/MM/yyyy')}
    src={item?.images?getImageFullPath(config?.imagebasePath,item?.images):null}
    onPress={()=>_onPressItem(item?._id,item.type==='event')}
  />
  )

  return (
    <SafeAreaView style={{flex: 1, width: width}}>
      <View style={styles.container}>
        <View style={styles.header}>
          {/* <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.headerConatiner}>
            <Image
              style={styles.backIcon}
              resizeMode="cover"
              source={require('../../assets/images/iconexlightleft-2.png')}
            />
          </TouchableOpacity> */}

          <TouchableOpacity style={styles.headerConatiner} onPress={()=>navigation.openDrawer()} >
          <Image
            style={styles.backIcon}
            resizeMode="cover"
            source={require('../../assets/images/iconexfilledburger.png')}
          />
          </TouchableOpacity>
          {/* <Text style={styles.events1}>{data?.events?.name}</Text> */}
          <SearchInput
            style={{width: '80%'}}
            placeholder={t("screens.Search.Search")}
            value={query}
            onChangeText={setquery}
            onCalendarPress={() => setOpen(true)}
          />
        </View>
        {isLoading && <Loader />}

        <View style={{paddingTop:10}}>
          {/* <View style={styles.seperator} /> */}
         { events.length ? <Text style={styles.category}> {t("screens.Search.Events")}</Text>:null}
          <FlatList
            style={{paddingBottom:50,marginHorizontal:10}}
            showsVerticalScrollIndicator={false}
            data={events} // Provide the array of data
            renderItem={renderItem} // Render function for each item
            keyExtractor={item => item._id.toString()} // Key extractor function
            ListEmptyComponent={
              <View style={styles.emptyComponent}>
            { !isLoading &&  <Text  style={{ color:Color.colorDimgray_200}}>{t('screens.Search.No events available!')} </Text>}
              </View>
            }
          />
        </View>
      </View>
      {/* Date picker */}
      <DatePicker
        modal
        open={open}
        date={new Date()}
        mode="date"
        onConfirm={date => {
          setOpen(false);
          setDate(date);
          setquery(format(new Date(date), 'dd/MM/yyyy'));
          
          // fetchData(formatDate(date));
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
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
  header: {
    flexDirection: 'row',
    width: width,
    // paddingTop:10,
    shadowRadius: 2, // Shadow radius
    elevation: Platform.OS === 'android' ? 2 : undefined, // Elevation for Android
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : undefined,
    borderBottomColor: 'gray',
  },
  headerConatiner: {
    marginLeft: '4%',
    alignItems: 'flex-start',
    width: '5%',
    marginTop: 20,
  },
  backIcon: {
    height: 24,
    width: 24,
    marginRight: 10,
    // marginTop: 3,
  },

  seperator: {
    height: 6,
    backgroundColor: Color.colorGainsboro_200,
    marginVertical: 10,
  },
  category: {
    fontFamily: FontFamily.helvetica,
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 26,
    textAlign: 'left',
    marginHorizontal: 20,
  },
  emptyComponent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignItems: 'center',
    paddingTop: 140,
  },
});

export default Search;
