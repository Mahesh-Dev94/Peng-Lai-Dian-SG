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
import CustomButton from '../../../components/commonButton';
import {ScaleDimention} from '../../../GlobalStyles';
import { useTranslation } from 'react-i18next';
const {height, width} = ScaleDimention;
const AttendeeCard = ({data}) => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Card
        style={{width: width - 40, backgroundColor: Color.colorWhitesmoke_100,padding:7}}>
        <View style={styles.contentConatiner}>
          <Title style={styles.title}>{t('screens.ActivityDetails.Attendee Details')}</Title>
          <View style={styles.dateContainer}>
            <Text style={styles.namLabel}>{t('screens.ActivityDetails.Name')}</Text>
            <Text style={styles.dateLabel}>{t('screens.ActivityDetails.Status')}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.nameLabel}>{data?.participantName}</Text>
            <Text style={[styles.dateLabel, {color: Color.colorDarkred_100}]}>
              {data?.status}
            </Text>
          </View>

          <View style={styles.dateContainer}>
            <View style={{textAlign:'left',justifyContent:'flex-start',alignItems:'flex-start',width:'49%',paddingRight:5}}>
            <CustomButton
              style={styles.ActivityButtonOutline}
              onPress={() => Alert.alert(' Book Another Event')}>
              <Text style={styles.outlineButtonLabel}>{t('screens.ActivityDetails.Book Another Event')}</Text>
            </CustomButton>
            </View>
          
         <View style={{textAlign:'right',alignItems:'center',width:'49%',paddingLeft:5}}>
         <CustomButton
              style={styles.ActivityButton}
              onPress={() => Alert.alert('Download Pass')}>
              <Text style={styles.buttonLabel}>{t('screens.ActivityDetails.Download Pass')}</Text>
            </CustomButton>
         </View>
          
          </View>
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
  title: {
    fontFamily: FontFamily.helvetica,
    fontSize: 20,
    fontWeight: '400',
    color: Color.colorGray_300,
    lineHeight: 23,
    paddingTop: 5,
  },

  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  dateLabel: {
    fontFamily: FontFamily.helvetica,
    fontSize: 12,
    fontWeight: '400',
    color: Color.colorGray_100,
    lineHeight: 14,
    paddingLeft: 3,
    width: '50%',
    textAlign:'right'
  },
  namLabel: {
    fontFamily: FontFamily.helvetica,
    fontSize: 12,
    fontWeight: '400',
    color: Color.colorGray_100,
    lineHeight: 14,
    paddingLeft: 3,
    width: '50%',
  },
  nameLabel: {
    fontFamily: FontFamily.helvetica,
    fontSize: 14,
    fontWeight: '400',
    color: Color.colorGray_300,
    lineHeight: 16,
    width: '50%',
  },
  ActivityButton: {
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    backgroundColor: Color.colorDarkred_100,
    borderRadius: Border.br_3xs,
    height: 26,
    width: 150,
    marginHorizontal: 5,
  },
  ActivityButtonOutline: {
    borderWidth: 1,
    borderColor: Color.colorDarkred_100,
    borderRadius: Border.br_3xs,
    height: 26,
    width: 150,
    marginHorizontal: 5,
    
  },
  outlineButtonLabel: {
    fontFamily: FontFamily.helvetica,
    fontSize: 12,
    fontWeight: '400',
    color: Color.colorDarkred_100,
    lineHeight: 14,
    paddingLeft: 3,
  },
  buttonLabel: {
    fontFamily: FontFamily.helvetica,
    fontSize: 12,
    fontWeight: '400',
    color: Color.colorWhitesmoke_100,
    lineHeight: 14,
    paddingLeft: 3,
  },
});

export default AttendeeCard;
