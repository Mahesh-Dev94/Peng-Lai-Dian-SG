import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { List } from 'react-native-paper';
import { Color, FontFamily } from '../../../GlobalStyles';

const ActivityListItem = ({ title, type, date, price,status, onPress }) => {
  return (
    <List.Item
      onPress={onPress}
      style={{ borderBottomWidth: .5, borderBottomColor: Color.colorDarkgray_100 }}
      title={title}
      titleStyle={styles.titleStyle}
      description={(props) => (
        <View style={{ flexDirection: 'column',paddingVertical:3 }}>
          <Text {...props} style={{color:Color.colorDimgray_200}}>{`${date } : ${ type}`}</Text>
          <Text {...props} style={{ color: Color.colorDarkred_100 }}>{status}</Text>
        </View>
      )}
      descriptionStyle={styles.descriptionStyle}
      left={props => (
        <Image
          {...props}
          height={24}
          width={24}
          resizeMode="cover"
          source={
            type === 'Donation'
              ? require('../../../assets/images/Coins.png')
              : require('../../../assets/images/Calendar.png')
          }
        />
      )}
      right={props => (
        <View style={{ alignItems: 'center' }}>
          {/* <Text style={styles.priceStyle}>
            {price}
          </Text> */}
          <Image
            resizeMode="cover"
            source={require('../../../assets/images/Down5.png')}
          />
        </View>
      )}
    />
  );
};

export default ActivityListItem;

const styles = StyleSheet.create({
  titleStyle: {
    fontFamily: FontFamily.helvetica,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 18,
    color: Color.colorGray_300,
  },
  descriptionStyle: {
    fontFamily: FontFamily.helvetica,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14,
    color: Color.colorDimgray_200,
  },
  priceStyle: {
    fontFamily: FontFamily.helvetica,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16,
    color: Color.colorGray_300,
    marginBottom: 5

  }


});
