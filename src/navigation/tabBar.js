import React from 'react'; 

import {View, Pressable, Dimensions, StyleSheet,Text, Image} from 'react-native'
import { Color } from '../GlobalStyles';
// import NavigationIcon from './navigationIcon'; 

import {ScaleDimention} from '../GlobalStyles';
const {height, width} = ScaleDimention;

const TabBar = ({ state, descriptors, navigation}) =>{

const labelIcon=(label)=>{

    switch (label) {
        case 'home':
            return <Image height={24} width={24} source={require("../assets/tab_Icon/Home.png")} />;
        case 'search':
            return <Image height={24} width={24} source={require("../assets/tab_Icon/Search.png")} />;
        case 'events':
            return <Image height={24} width={24} source={require("../assets/tab_Icon/Calendar.png")} />;
        case 'favorite':
            return <Image height={24} width={24} source={require("../assets/tab_Icon/Bookmark.png")} />;
        case 'profile':
            return <Image height={24} width={24} source={require("../assets/tab_Icon/User.png")} />;
        default:
            return null;
    }
}


  return (
    <View style={styles.mainContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <View key = {index} style = {[styles.mainItemContainer, {borderRightWidth: label=="notes"? 3:0}]}>
            <Pressable
              onPress = {onPress}
              style = {{backgroundColor: isFocused?Color.colorKhaki:Color.colorKhaki, borderRadius: 20, }}>
              <View style = {{justifyContent: 'center', alignItems: 'center', flex: 1}}>
			    {labelIcon(label)}
              </View>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    backgroundColor: Color.colorKhaki,
    borderRadius: 25,
	  width:width-30,
    marginHorizontal: 17,
    height:52
  },
  mainItemContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    // marginVertical: 5,
    borderRadius: 1, 
    borderColor: "#333B42"
  }, 
})


export default TabBar; 