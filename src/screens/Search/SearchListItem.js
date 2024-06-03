// import React from 'react';
// import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { List } from 'react-native-paper';
// import { Color, FontFamily } from '../../GlobalStyles';

// const SearchListItem = ({ title, date,src, onPress }) => {
//   return (
//     <List.Item
//       onPress={onPress}
//       style={{ borderBottomWidth: .5, borderBottomColor: Color.colorDarkgray_100 }}
//       title={title}
//       titleStyle={styles.titleStyle}
//       description={(props) => (
//         <View style={{ flexDirection: 'row',alignItems:'center'}}>
//             <Image
//             style={{height:15,width:15,marginRight:5}}
//             resizeMode="cover"
//             source={require('../../assets/images/Calendar.png')}
//           /><Text {...props} style={{color:Color.colorDimgray_200}}>{date}</Text>
//         </View>
//       )}
//       descriptionStyle={styles.descriptionStyle}
//       left={props => (
//         <Image
//           {...props}
//           style={{height:48,width:50}}
//           // height={48}
//           // width={50}
//           resizeMode="cover"
//           source={src }
//         />
//       )}
//       right={props => (
//         <View style={{ alignItems: 'flex-end' ,justifyContent:'center'}}>
//           <Image
//             style={{height:20,width:17}}
//             resizeMode="cover"
//             source={require('../../assets/images/Down5.png')}
//           />
//         </View>
//       )}
//     />
//   );
// };

// export default SearchListItem;

// const styles = StyleSheet.create({
//   titleStyle: {
//     fontFamily: FontFamily.helvetica,
//     fontSize: 16,
//     fontWeight: '700',
//     lineHeight: 18,
//     color: Color.colorGray_300,
//   },
//   descriptionStyle: {
//     fontFamily: FontFamily.helvetica,
//     fontSize: 12,
//     fontWeight: '400',
//     lineHeight: 14,
//     color: Color.colorDimgray_200,
//   },
//   priceStyle: {
//     fontFamily: FontFamily.helvetica,
//     fontSize: 14,
//     fontWeight: '400',
//     lineHeight: 16,
//     color: Color.colorGray_300,
//     marginBottom: 5

//   }


// });\


import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { List } from 'react-native-paper';
import { Color, FontFamily } from '../../GlobalStyles';

const SearchListItem = ({ title, date, src, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {src ? <Image
        style={styles.image}
        resizeMode="cover"
        source={src}
      /> : null}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            style={{ height: 15, width: 15, marginRight: 5 }}
            resizeMode="cover"
            source={require('../../assets/images/Calendar.png')}
          /><Text style={{ color: Color.colorDimgray_200 }}>{date}</Text>
        </View>
      </View>
      <Image
        style={styles.icon}
        resizeMode="contain"
        source={require('../../assets/images/Down5.png')}
      />
    </TouchableOpacity>
  );
};

export default SearchListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    borderBottomColor: Color.colorDarkgray_100,
    paddingVertical: 15,
    marginHorizontal: 15,
    justifyContent:'center'
  },
  icon: {
    height: 22,
    width: 22,
    marginVertical: 4
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  title: {
    fontFamily: FontFamily.helvetica,
    fontSize: 16,
    color: Color.colorGray_300,
    marginBottom: 5,
  },
  description: {
    fontFamily: FontFamily.helveticaLight,
    fontSize: 12,
    color: Color.colorDimgray_200,
  },
  time: {
    fontFamily: FontFamily.helveticaLight,
    fontSize: 12,
    color: Color.colorDarkred_100,
  },
  image: {
    width: 57,
    height: 59,
    borderRadius: 5,
  },
});

