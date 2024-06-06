import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {FontSize, FontFamily, Color, Border} from '../../GlobalStyles';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import EventCard from './components/EventCard';
import {ScaleDimention} from '../../GlobalStyles';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {get, getWithPagination, inner_Post} from '../../services/api';
import {
  APP_EVENT_PAST,
  APP_EVENT_UPCOMING,
  FAVORITES,
} from '../../services/config';
import Loader from '../../components/loader';
import {useTranslation} from 'react-i18next';
import {showToast} from '../../utils';
const {width} = ScaleDimention;

const Events = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {t} = useTranslation();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: t('screens.Events.Upcoming')},
    {key: 'second', title: t('screens.Events.Past')},
  ]);

  const session = useSelector(state => state.session);
  const config = useSelector(state => state.config.configUrls);
  const [isLoading, setisLoading] = useState(false);
  const [PastEvents, setPastEvents] = useState([]);
  const [UpcomingEvents, setUpcomingEvents] = useState([]);
  const [Upcomingpage, setUpcomingPage] = useState(1);
  const [totalUpcomingPage, setTotalUpcomingPage] = useState(0);
  const [Pastpage, setPastPage] = useState(1);
  const [totalPastPage, setTotalPastPage] = useState(0);

  const _onBookmarkClicked = async (_id, i) => {
    const payload = {
      Event: _id,
    };
    const favorit = await inner_Post(
      `${config?.UrlBasePath}/${FAVORITES}`,
      session?.user?.token,
      payload,
    );

    if (index === 0) {
      setUpcomingEvents(prevEvents => {
        const updatedEvents = [...prevEvents]; // Create a copy of the array
        updatedEvents[i] = {
          ...updatedEvents[i],
          bookmarked: !updatedEvents[i].bookmarked,
        }; // Update the bookmarked property
        return updatedEvents;
      });
    } else {
      setPastEvents(prevPastEvents => {
        const updatedPastEvents = [...prevPastEvents];
        updatedPastEvents[i] = {
          ...updatedPastEvents[i],
          bookmarked: !updatedPastEvents[i].bookmarked,
        };
        return updatedPastEvents;
      });
    }
    showToast('success', favorit.message);
  };

  useEffect(() => {
    if (isFocused) {
      setUpcomingEvents([])
      setPastEvents([])
      fetchUpcomingEvents();
      fetchPastEvents();
    }
  }, [isFocused]);

  const event_lists = async () => {
    setisLoading(true);
    const pastEvents = await get(
      `${config?.UrlBasePath}/${APP_EVENT_PAST}`,
      session.user.token,
    );
    setPastEvents(pastEvents.events);
    setisLoading(false);
  };


  const fetchUpcomingEvents = async (pageNum = 1) => {
    try {
      setisLoading(true)
      const payload={
        page: pageNum,
        pageSize: 10,
        }
      const UpcomingEvents = await getWithPagination(
        `${config?.UrlBasePath}/${APP_EVENT_UPCOMING}`,
        session.user.token,
        payload
      );
      // console.log('newData---',UpcomingEvents?.upcomingEvents.length)
      setUpcomingEvents(prevData => [...prevData, ...UpcomingEvents?.upcomingEvents]); // Append new data to the existing data
      if (pageNum===1) {
        setTotalUpcomingPage(UpcomingEvents?.totalPage)
      }
      setisLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setisLoading(false);
    }
  };
  
  const UpcominghandleEndReached = () => {
    if (!isLoading && Upcomingpage < totalUpcomingPage) {
      const nextPage = Upcomingpage + 1;
      setisLoading(true); 
      fetchUpcomingEvents(nextPage);
      setUpcomingPage(nextPage);
    }
  };


  const fetchPastEvents = async (pageNum = 1) => {
    try {
      setisLoading(true)
      const payload={
        page: pageNum,
        pageSize: 10,
        }
      const pastEvents = await getWithPagination(
        `${config?.UrlBasePath}/${APP_EVENT_PAST}`,
        session.user.token,
        payload
      );
      // console.log('newData---',pastEvents.events.length)
      setPastEvents(prevData => [...prevData, ...pastEvents.events]); // Append new data to the existing data
      if (pageNum===1) {
        setTotalPastPage(pastEvents?.totalPage)
      }
      setisLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setisLoading(false);
    }
  };
  
  const PasthandleEndReached = () => {
    if (!isLoading && Pastpage < totalPastPage) {
      const nextPage = Pastpage + 1;
      setisLoading(true); 
      fetchPastEvents(nextPage);
      setPastPage(nextPage);
    }
  };

  // Function to render each item
  const renderItem = e => {
    const cardIndex = e.index;
    const item = e.item;
    return (
      <EventCard
        item={item}
        _onBookmarkClick={() => _onBookmarkClicked(item._id, cardIndex)}
        onPress={() =>
          navigation.navigate('EventDetails', {_id: item._id, type: index})
        }
      />
    );
  };

  const FirstRoute = () => (
    <FlatList
      contentContainerStyle={styles.cardContainer}
      showsVerticalScrollIndicator={false}
      style={{flex: 1}}
      data={UpcomingEvents} // Provide the array of data
      renderItem={renderItem} // Render function for each item
      keyExtractor={item => item._id.toString()} // Key extractor function
      ListEmptyComponent={
        <View style={styles.emptyComponent}>
         {!isLoading &&  <Text  style={{ color:Color.colorDimgray_200}}>{t('screens.Events.No upcoming events!')} </Text>}
        </View>
      }
      windowSize={10}
      initialNumToRender={10}
     onEndReached={UpcominghandleEndReached}
     onEndReachedThreshold={0.5}
    />
  );

  const SecondRoute = () => (
    <FlatList
      contentContainerStyle={styles.cardContainer}
      showsVerticalScrollIndicator={false}
      style={{flex: 1}}
      data={PastEvents} // Provide the array of data
      renderItem={renderItem} // Render function for each item
      keyExtractor={item => item._id.toString()} // Key extractor function
      ListEmptyComponent={
        <View style={styles.emptyComponent}>
         {!isLoading &&  <Text style={{ color:Color.colorDimgray_200}}>{t('screens.Events.No Past events!')} </Text>}
        </View>
      }
      windowSize={10}
      initialNumToRender={10}
     onEndReached={PasthandleEndReached}
     onEndReachedThreshold={0.5}
    />
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: Color.colorGray_300}}
      style={styles.tabView}
      renderLabel={lbl => (
        <Text
          style={{
            fontSize: FontSize.size_base,
            color: Color.colorGray_300,
            fontFamily: FontFamily.helvetica,
          }}>
          {lbl.route.title}
        </Text>
      )}
    />
  );

  return (
    <SafeAreaView style={{flex: 1, width: width}}>
      <View style={styles.events}>
        <View style={styles.eventsChild} />

        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.headerConatiner}>
          <Image
            style={styles.backIcon}
            resizeMode="cover"
            source={require('../../assets/images/iconexfilledburger.png')}
          />
          <Text style={styles.events1}>{t('screens.Events.Events')} </Text>
        </TouchableOpacity>

        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          style={styles.TabViewConaatiner}
        />
        {isLoading && <Loader />}
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
    borderTopColor: Color.colorDarkgray_100,
    borderTopWidth: 1,
    paddingBottom: 70,
  },
  emptyComponent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignItems: 'center',
    paddingTop: 140,
  },
});

export default Events;
