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
import { formatDate, getImageFullPath } from '../../../utils';
import HTMLContent from '../../../components/htmlContent';
const {height, width} = ScaleDimention;
const ActivityDetailCard = ({data,imagebaseURL}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Card style={{width: width - 60,backgroundColor: Color.colorWhitesmoke_100,}}>
        <View>
          <Card.Cover
            style={styles.cardCoverImage}
            source={getImageFullPath(imagebaseURL, data?.images)}
          />
        </View>

        <View style={styles.contentConatiner}>
          <Title style={styles.title}>{data?.transactionsName}</Title>
          <View style={styles.dateContainer}>
            <Image
              style={{height: 24, width: 24}}
              source={require('../../../assets/images/iconexlightcalendar1.png')}
            />
           {data && <Text style={styles.dateLabel}>{formatDate(data?.Date)}</Text>}
          </View>
          <View style={styles.dateContainer}>
            <Image
              style={{height: 24, width: 24}}
              source={require('../../../assets/images/Location.png')}
            />
            <Text style={styles.dateLabel}>
             {data?.eventLocation}
            </Text>
          </View>
          {/* <Text style={styles.description}>
          {data?.description}
          </Text> */}
            <HTMLContent htmlContent={data?.description} />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  contentConatiner: {paddingHorizontal: 8, paddingBottom: 8},
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cardCoverImage: {
    height: 164,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  title: {
    fontFamily: FontFamily.helvetica,
    fontSize: 20,
    fontWeight: '400',
    color: Color.colorGray_300,
    lineHeight: 23,
    paddingTop: 5,
  },

  description: {
    fontFamily: FontFamily.helvetica,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14,
    color: Color.colorGray_300,
    marginLeft: 5,
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
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 5,
  },
  dateLabel: {
    fontFamily: FontFamily.helvetica,
    fontSize: 12,
    fontWeight: '400',
    color: Color.colorGray_300,
    lineHeight: 14,
    paddingLeft: 3,
  },
});

export default ActivityDetailCard;
