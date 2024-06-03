import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomescreenOption from '../screens/Home';
import SignUp from '../screens/Register/SignUp';
import Events from '../screens/Events';
import Profile from '../screens/Profile';
import SideMenuScreen from '../navigation/sideMenu';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabBar from '../navigation/tabBar';
import Search from '../screens/Search';
import Favorite from '../screens/Favorite';
import Activities from '../screens/Profile/activities';
import {Color, FontFamily} from '../GlobalStyles';
import ActivitiesDetail from '../screens/Profile/activitiesDetails';
import Language from '../screens/Register/language';
import RegisterOption from '../screens/Register/registerOption';
import SignIn from '../screens/Register/SignIn';
import AboutUs from '../screens/AboutUs';
import Settings from '../screens/Settings';
import TermsCondition from '../screens/Settings/Term&Conditions';
import Albums from '../screens/Album';
import AlbumsDetails from '../screens/Album/AlbumDetails';
import Notification from '../screens/Notification';
import Donations from '../screens/Donations';
import DonationDetails from '../screens/Donations/donationDetail';
import DonationDetailsPayment from '../screens/Donations/donationDetailPayment';
import DonationDetailsPaymentOther from '../screens/Donations/donationDetailPaymentOther';
import EventDetails from '../screens/Events/eventDetail';
import EventDetailsPayment from '../screens/Events/eventDetailPayment';
import EventDetailsPaymentQr from '../screens/Events/eventDetailPaymentQr';
import {getSessionData} from '../Redux/Reducers/sessionSlice';
import {useDispatch, useSelector} from 'react-redux';
import {fetchApiConfig} from '../services/api';
import {setConfigUrls} from '../Redux/Reducers/config';
import ChooseLanguage from '../screens/Settings/chooseLanguage';
import ManageNotification from '../screens/Settings/manageNotification';
import HelpSupport from '../screens/Settings/HelpSupport';
import { ActivityIndicator } from 'react-native-paper';
import { Image, StyleSheet,View} from 'react-native';
import {ScaleDimention} from '../GlobalStyles';
import { useLocale } from '../i18n';

const {height, width} = ScaleDimention;
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
  const dispatch = useDispatch();
  const session = useSelector(state => state.session);
  const language = useSelector(state => state.language.selectedLanguage);
  // const {changeLanguage} = useLocale();
  const [isLoading, setIsLoading] = useState(true); // Loading state
  useEffect(() => {
    dispatch(getSessionData());
  }, [dispatch]);

  useEffect(() => {
    console.log('language--',language)
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const configData = await fetchApiConfig();
      console.log('configData---',configData)
      dispatch(setConfigUrls(configData));
      setIsLoading(false); 
    } catch (error) {
      console.error('Error fetching API config:', error);
    }
  };


  if (isLoading) {
       //<ActivityIndicator size="large" color={Color.colorKhaki} />; // Render loading indicator while fetching config
       return  (
      <View style={styles.signInOption1}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.pldLogo1}
          resizeMode="cover"
          source={require( '../assets/images/launch_screen.png')}
        />
      </View>
    </View>
    )
  }

  const screenOptionStyle = {
    headerStyle: {
      backgroundColor: Color.colorWhitesmoke_200,
    },
    headerTintColor: Color.colorGray_300,
    headerFontFamily: FontFamily.helvetica,
    headerBackTitle: 'Back',
    headerShown: false,
  };

  const MainStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="MainHome" component={HomescreenOption} />
        <Stack.Screen name="Events" component={Events} />
        <Stack.Screen name="MainProfile" component={Profile} />
      </Stack.Navigator>
    );
  };

  const RegisterStackNavigator = () => {
    return (
      <Stack.Navigator
        initialRouteName="Language"
        screenOptions={screenOptionStyle}>
        <Stack.Screen name="Language" component={Language} />
        <Stack.Screen name="RegisterOption" component={RegisterOption} />
        <Stack.Screen name="Signin" component={SignIn} />
        <Stack.Screen name="Signup" component={SignUp} />
      </Stack.Navigator>
    );
  };

  const ProfileStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Activities"
          component={Activities}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ActivitiesDetails"
          component={ActivitiesDetail}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  };

  const EventsStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Events" component={Events} />
      </Stack.Navigator>
    );
  };

  const SearchStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Search" component={Search} />
      </Stack.Navigator>
    );
  };

  const FavoriteStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Favorite" component={Favorite} />
      </Stack.Navigator>
    );
  };

  const BottomTabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={{headerShown: false}}
        tabBar={props => <TabBar {...props} />}>
        <Tab.Screen name="home" component={MainStackNavigator} />
        <Tab.Screen name="search" component={SearchStackNavigator} />
        <Tab.Screen name="events" component={EventsStackNavigator} />
        <Tab.Screen name="favorite" component={FavoriteStackNavigator} />
        <Tab.Screen name="profile" component={ProfileStackNavigator} />
      </Tab.Navigator>
    );
  };

  const DrawerNavigator = () => {
    return (
      <Drawer.Navigator
        initialRouteName={'MainDrawer'}
        screenOptions={{headerShown: false}}
        drawerContent={props => <SideMenuScreen {...props} />}>
        <Drawer.Screen name="MainDrawer" component={BottomTabNavigator} />
        <Drawer.Screen name="ProfileDrawer" component={ProfileStackNavigator} />
     
      </Drawer.Navigator>
    );
  };

  const MainRootNavigator=()=>{
    return(
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Main" component={DrawerNavigator} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Terms & Condition"
          component={TermsCondition}
          options={{headerShown: false}}
        />

      <Stack.Screen
          name="Help & Support"
          component={HelpSupport}
          options={{headerShown: false}}
        />


        <Stack.Screen
          name="Albums"
          component={Albums}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AlbumsDetails"
          component={AlbumsDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notifications"
          component={Notification}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Donations"
          component={Donations}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DonationDetails"
          component={DonationDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DonationDetailsPayment"
          component={DonationDetailsPayment}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DonationDetailsPaymentOther"
          component={DonationDetailsPaymentOther}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EventDetails"
          component={EventDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EventDetailsPayment"
          component={EventDetailsPayment}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EventDetailsPaymentQr"
          component={EventDetailsPaymentQr}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Choose Language"
          component={ChooseLanguage}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Manage Notification"
          component={ManageNotification}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    )
  }

  return (
    <NavigationContainer>
       <Stack.Navigator screenOptions={screenOptionStyle}>
        {session?.isLoggedIn ?<Stack.Screen name="mainRoot" component={MainRootNavigator} />:
           <Stack.Screen name="Register" component={RegisterStackNavigator} />
      }
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;


const styles = StyleSheet.create({
  signInOption1: {
    backgroundColor: Color.colorKhaki,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
  },
  imageContainer: {
    // flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pldLogo1: {
    width: 250,
    height: 250,
    // resizeMode: 'center', 
  }
  
})