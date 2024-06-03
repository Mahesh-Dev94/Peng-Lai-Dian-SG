// SideMenuScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import AvatarComponent from '../components/avtar';
import { Color, FontFamily } from '../GlobalStyles';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { List } from 'react-native-paper';
import { persistLogout } from '../Redux/Reducers/sessionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { CURRENT_USER } from '../services/config';
import { getImageFullPath } from '../utils';
import { get } from '../services/api';
import { setRefresh } from '../Redux/Reducers/refresh';
const SideMenuScreen = ({ navigation, state }) => {
	const dispatch = useDispatch();
	const isFocused = useIsFocused();
	const session = useSelector(state => state.session);
	const refresh = useSelector(state => state.refresh.isRefresh);
	const config = useSelector(state => state.config.configUrls);
	const { t } = useTranslation();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [logo,setLogo]=useState(null);


	const ShowAlert = () => {
		Alert.alert(
		  t('screens.SideMenu.Alert'),
		  t('screens.SideMenu.Do you want to log out?'),
		  [
			{ text: t('screens.SideMenu.No'), onPress: () => console.log('OK Pressed') },
			{ text: t('screens.SideMenu.Yes'), onPress: () => dispatch(persistLogout()) },
		  ],
		  { cancelable: false },
		);
	  }

	const _onLogout = () => {
		ShowAlert();
	}


	// useEffect(() => {
	// 	// if (session) {
	// 		console.log('sidemenu session---',session?.user)
	// 		setName(session?.user?.users?.Firstname);
	// 		setEmail(session?.user?.users?.email);
	// 		setLogo(getImageFullPath(config.imagebasePath,session?.user?.users?.ProfileImage))
	// 	// }
	// },[dispatch, session])


	// useEffect(() => {
	// 	// if (session) {
	// 		console.log('sidemenu session---',session?.user)
	// 		setName(session?.user?.users?.Firstname);
	// 		setEmail(session?.user?.users?.email);
	// 		setLogo(getImageFullPath(config.imagebasePath,session?.user?.users?.ProfileImage))
	// 	// }
	// },[session])
	// console.log('sidemenu session---',session?.user)

	useEffect(() => {
		console.log('refresh---',refresh,session.isLoggedIn)
		if (session.isLoggedIn && config) {
		  fetchData();
		
		}
	  }, [dispatch,refresh]);

	
	  const fetchData = async () => {
		const currentUser = await get(
		  `${config?.UrlBasePath}/${CURRENT_USER}`,
		  session?.user?.token,
		);
		// console.log('sidemenu session---',currentUser)
			setName(currentUser?.user.Firstname +' '+ currentUser?.user.Lastname);
			setEmail(currentUser?.user.email);
			setLogo(getImageFullPath(config.imagebasePath,currentUser?.user.ProfileImage))
	  };

	return (
		<SafeAreaView style={{flex:1}}>
		<View style={styles.container}>

			<View style={styles.userInfo}>
				<List.Item
					onPress={() => navigation.closeDrawer()}
					contentStyle={{ paddingLeft: 0, marginRight: 0 }}
					left={props => <Image style={{ marginTop: 0 }} height={20} width={20} source={require("../assets/images/iconexfilledburger.png")} />}
				/>
				<AvatarComponent src={logo ? logo :require("../assets/images/ellipse-49.png")} size={60} />
				<List.Item
					onPress={() => navigation.navigate('ProfileDrawer')}
					title={name}
					description={email}
					contentStyle={{ paddingLeft: 0, marginRight: 0 }}
					titleStyle={styles.userName}
					descriptionStyle={styles.userEmail}
					right={props => <Image {...props} style={{ marginTop: 25, marginLeft: 10 }} height={20} width={20} source={require("../assets/images/Down5.png")} />}
				/>

			</View>
			<View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
				<List.Item
					onPress={() => navigation.navigate('MainDrawer')}
					title={t('screens.SideMenu.Home')}
					style={{ paddingVertical: 3 }}
					titleStyle={styles.menuLabel}
					left={() => <Image style={{ marginTop: 3 }} height={24} width={24} source={require("../assets/images/Home.png")} />}
				/>
				<List.Item
					onPress={() => navigation.navigate('ProfileDrawer')}
					title={t('screens.SideMenu.Profile')}
					style={{ paddingVertical: 3 }}
					titleStyle={styles.menuLabel}
					left={() => <Image style={{ marginTop: 3 }} height={24} width={24} source={require("../assets/images/User.png")} />}
				/>
				<List.Item
					onPress={() => navigation.navigate('AboutUs')}
					title={t('screens.SideMenu.About Us')}
					style={{ paddingVertical: 3 }}
					titleStyle={styles.menuLabel}
					left={() => <Image style={{ marginTop: 3 }} height={24} width={24} source={require("../assets/images/Users.png")} />}
				/>
				<List.Item
					onPress={() => navigation.navigate('events')}
					title={t('screens.SideMenu.Events')}
					style={{ paddingVertical: 3 }}
					titleStyle={styles.menuLabel}
					left={() => <Image style={{ marginTop: 3, marginRight: 3 }} height={24} width={24} source={require("../assets/images/Calendar.png")} />}
				/>
				<List.Item
					onPress={() => navigation.navigate('Donations')}
					title={t('screens.SideMenu.Donations')}
					style={{ paddingVertical: 3 }}
					titleStyle={styles.menuLabel}
					left={() => <Image style={{ marginTop: 3 }} height={24} width={24} source={require("../assets/images/Coins.png")} />}
				/>
				<List.Item
					onPress={() => navigation.navigate('Albums')}
					title={t('screens.SideMenu.Album')}
					style={{ paddingVertical: 3 }}
					titleStyle={styles.menuLabel}
					left={() => <Image style={{ marginTop: 3 }} height={24} width={24} source={require("../assets/images/Image.png")} />}
				/>
				<List.Item
					onPress={() => navigation.navigate('Settings')}
					title={t('screens.SideMenu.Settings')}
					style={{ paddingVertical: 3 }}
					titleStyle={styles.menuLabel}
					left={() => <Image style={{ marginTop: 3 }} height={24} width={24} source={require("../assets/images/Settings.png")} />}
				/>
				<List.Item
					onPress={() => _onLogout()}
					title={t('screens.SideMenu.Log Out')}
					style={{ paddingVertical: 3 }}
					titleStyle={styles.menuLabel}
					left={() => <Image style={{ marginTop: 3 }} height={24} width={24} source={require("../assets/images/Logout.png")} />}
				/>
			</View>
			<TouchableOpacity onPress={() => navigation.navigate('Terms & Condition')} style={styles.termsContainer}>
				<Text style={styles.termsText}>
					{t('screens.SideMenu.Terms & Conditions Applied')}
				</Text>
			</TouchableOpacity>
		</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Color.colorWhitesmoke_100, // Adjust background color as needed
	},
	userInfo: {
		flexDirection: 'column',
		alignItems: 'flex-start',
		paddingHorizontal: 20,
		backgroundColor: Color.colorKhaki,
		// borderTopLeftRadius:20
		// paddingTop: 10
	},
	avatar: {
		marginRight: 10,
	},
	userName: {
		fontSize: 20,
		fontWeight: '400',
		color: Color.colorGray_300,
		fontFamily: FontFamily.helvetica
	},
	userEmail: {
		fontSize: 13,
		fontWeight: '400',
		color: Color.colorGray_300,
		fontFamily: FontFamily.helvetica,
		width: '100%'
	},
	menuLabel: {
		fontFamily: FontFamily.helvetica,
		fontSize: 20,
		fontWeight: '400',
		color: Color.colorGray_300,
		marginLeft: -5
	},

	termsContainer:{
		position: 'absolute',
		bottom: 10, // Adjust as needed for desired distance from the bottom
		left: 0,
		right: 0,
		alignItems: 'center'
	},

	termsText: { fontSize: 10, color: Color.colorDimgray_200, alignItems: 'center', alignSelf: 'center', textAlign: 'center' },
	

});

export default SideMenuScreen;
