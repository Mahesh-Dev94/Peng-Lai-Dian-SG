import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Avatar, Button, Card, Text, Title} from 'react-native-paper';
import {FontSize, FontFamily, Color, Border} from '../../../GlobalStyles';
import {ScaleDimention} from '../../../GlobalStyles';
import { formatDate, getImageFullPath, showToast } from '../../../utils';
import HtmlText from '../../../components/htmlTest';
import { useSelector } from 'react-redux';
import { inner_Post, post } from '../../../services/api';
import { FAVORITES } from '../../../services/config';
const {height, width} = ScaleDimention;

const EventCard = ({item,onPress,_onBookmarkClick}) => {
  const navigation = useNavigation();
  const config = useSelector((state) => state.config.configUrls);
   const _description= item.description.substring(0, item.description.indexOf(' ', 40));
 

  return (
    <View style={styles.container}>
      <Card
       onPress={onPress}
        style={{
          width: width - 50,
          // height: 180,
          backgroundColor: Color.colorWhitesmoke_100,
        }}>
        <View>
          <Card.Cover
            style={{
              height: 111,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0,
            }}
            source={getImageFullPath(config.imagebasePath,item?.images)}
          />
          <TouchableOpacity
            onPress={_onBookmarkClick}
            style={styles.favoritButton}>
            <Image
              style={{height: 19, width: 15}} 
              source={item.bookmarked ?require('../../../assets/images/Subtract.png'):require('../../../assets/images/Bookmark1.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.contentConatiner}>
          <View style={styles.titleContainer}>
            <Text numberOfLines={1} style={styles.title}>
              {item.name}
              </Text>
            {/* <Text style={styles.price}>
              $50
              </Text> */}
          </View>
          <View style={styles.descriptionContainer}>
            <Text numberOfLines={1} style={styles.description}>
              {_description}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                width: '25%',
                justifyContent: 'flex-end',
              }}>
              <Image
                style={{height: 12, width: 11, margin: 2}}
                source={require('../../../assets/images/Calendar.png')}
              />
              <Text style={styles.dateLabel}>
                {/* 14/01/2024 */}
                {formatDate(item.eventDate)}
                </Text>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 20,
    alignItems: 'center',
    width: width - 20,
  },
  favoritButton: {position: 'absolute', right: 10, top: 10},
  contentConatiner: {marginHorizontal: 8, paddingBottom: 8},
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontFamily: FontFamily.helvetica,
    fontSize: 16,
    fontWeight: '400',
    width: '100%',
    alignItems: 'flex-start',
    color: Color.colorGray_300,
    marginVertical:4
  },
  descriptionContainer: {
    flexDirection: 'row',
    // marginBottom:5
  },
  description: {
    fontFamily: FontFamily.helveticaLight,
    fontSize: 10,
    fontWeight: '400',
    color: Color.colorGray_300,
    width: '75%',
  },
  price: {
    fontFamily: FontFamily.helvetica,
    fontSize: 14,
    fontWeight: '400',
    width: '10%',
    alignItems: 'flex-end',
    paddingTop: 5,
    color: Color.colorGray_300,
  },
  dateLabel: {
    fontFamily: FontFamily.helveticaLight,
    fontSize: 12,
    fontWeight: '400',
    color: Color.colorGray_300,
  },
});

export default EventCard;
