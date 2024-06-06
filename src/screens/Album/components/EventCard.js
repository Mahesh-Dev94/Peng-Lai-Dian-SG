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
import HTMLContent from '../../../components/htmlContent';
const {height, width} = ScaleDimention;

const EventCard = ({banner,title,description,date,_id}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Card
       onPress={()=>navigation.navigate('AlbumsDetails',{_id:_id})}
        style={{
          width: width - 50,
          height: 180,
          backgroundColor: Color.colorWhitesmoke_100,
        }}>
          <Card.Cover
            style={{
              height: 111,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0,
              backgroundColor:'gray'
            }}
            source={banner}
          />

        <View style={styles.contentConatiner}>
          <View style={styles.titleContainer}>
            <Text  numberOfLines={1} style={styles.title}>{title}</Text>
            <View
              style={{
                width: '30%',
                alignItems:'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.dateLabel}>{date}</Text>
            </View>
          </View>
          <View style={styles.descriptionContainer}>
            <Text numberOfLines={1} style={styles.description}>
              {description}
            </Text>
             {/* {description ? <HTMLContent htmlContent={description} />:null} */}
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
  contentConatiner: {marginHorizontal: 8, paddingBottom: 8},
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontFamily: FontFamily.helvetica,
    fontSize: 16,
    fontWeight: '400',
    width: '70%',
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
    fontSize: 12,
    fontWeight: '400',
    color: Color.colorGray_300,
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
    fontSize: 14,
    fontWeight: '400',
    color: Color.colorDimgray_200,
  },
});

export default EventCard;
