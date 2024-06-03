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
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import ActivityListItem from './components/ActivityListItem';
import {useNavigation} from '@react-navigation/native';
import {Color, FontFamily, FontSize, ScaleDimention} from '../../GlobalStyles';
import {get} from '../../services/api';
import {useSelector} from 'react-redux';
import {formatDate} from '../../utils';
import Loader from '../../components/loader';
import {useTranslation} from 'react-i18next';
import {USER_TRANSACTION} from '../../services/config';
const {height, width} = ScaleDimention;

const Activities = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const session = useSelector(state => state.session);
  const config = useSelector(state => state.config.configUrls);

  useEffect(() => {
    if (session.isLoggedIn) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const activities = await get(
      `${config?.UrlBasePath}/${USER_TRANSACTION}`,
      session?.user?.token,
    );
    const filteredEventsArray = activities?.Transactions.filter(
      item => item !== null,
    );
    setData(filteredEventsArray);
    console.log;
    setIsLoading(false);
  };

  const renderItem = ({item}) => {
    return (
      <ActivityListItem
        title={item.name}
        type={item.type}
        status={item.status}
        date={formatDate(item.Date)}
        // price={'$50.00/-'}
        onPress={() =>
          navigation.navigate('ActivitiesDetails', {_id: item._id})
        }
      />
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerConatiner}>
          <Image
            style={styles.backIcon}
            resizeMode="cover"
            source={require('../../assets/images/iconexlightleft-2.png')}
          />
          <Text style={styles.headerLabel}>
            {t('screens.Activity.Activities')}
          </Text>
        </TouchableOpacity>
      {isLoading && <Loader />}

      <FlatList
        contentContainerStyle={{width: width - 20}}
        showsVerticalScrollIndicator={false}
        data={data} // Provide the array of data
        renderItem={renderItem} // Render function for each item
        keyExtractor={item => item._id.toString()} // Key extractor function
        ListEmptyComponent={
          <View style={styles.emptyComponent}>
            {!isLoading && <Text  style={{ color:Color.colorDimgray_200}}>{t('screens.Activity.No Activity available!')} </Text>}
          </View>
        }
      />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    // alignItems: 'center',
    marginHorizontal: 10,
    flex: 1,
    width: width - 20,
  },
  emptyComponent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignItems: 'center',
    paddingTop: 140,
  },
  headerConatiner: {
    flexDirection: 'row',
    marginTop: '5%',
    // marginLeft: '5%',
    alignItems: 'flex-start',
    marginBottom:10,
    paddingBottom:15,
    borderBottomWidth:.3,
    borderBottomColor:Color.colorDarkgray_100
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

export default Activities;
