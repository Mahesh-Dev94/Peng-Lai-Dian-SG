import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Switch, TouchableOpacity, Image, SafeAreaView} from 'react-native';
import {FontFamily, Color, ScaleDimention, FontSize} from '../../GlobalStyles';
import {List} from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/core';

const {width} = ScaleDimention;
const ManageNotification = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
   <SafeAreaView style={{flex:1,width: width}}>
       <View style={styles.headerConatiner}>
          <TouchableOpacity onPress={()=>navigation.goBack()} >
          <Image
            style={styles.backIcon}
            resizeMode="cover"
            source={require('../../assets/images/iconexlightleft-2.png')}
          />
          </TouchableOpacity>
          <Text style={styles.headerLabel}> {t('screens.Settings.Manage Notifications')}</Text>
        </View>
         <View style={styles.container}>
      <List.Item
        onPress={toggleSwitch}
        title={t('screens.Settings.Turn on Notifications')}
        titleStyle={styles.titleStyle}
        description={props => (
          <View style={{flexDirection: 'column'}}>
            <Text {...props} style={{color: Color.colorDimgray_200}}>
              {t('screens.Settings.turn on notifications to get all updates')}
            </Text>
          </View>
        )}
        descriptionStyle={styles.descriptionStyle}
        right={props => (
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled ? Color.colorKhaki : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        )}
      />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width - 40,
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 5,
    padding: 5,
  },
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
    marginBottom: 5,
  },
  headerConatiner: {
    flexDirection: 'row',
    width: width,
    paddingLeft: '5%',
    alignItems: 'center',
    height:74,
    justifyContent:'flex-start',
    shadowRadius: 2, // Shadow radius
    elevation: Platform.OS === 'android' ? 2 : undefined, // Elevation for Android
    // shadowOpacity: Platform.OS === 'ios' ? 0.2 : undefined,
    borderBottomColor:'gray',
    borderBottomWidth:.2,
    marginBottom:10
  },
  backIcon: {
    width: '20%',
    height: 24,
    width: 24,
    marginRight: 5,
    marginTop: 3,
  },

  headerLabel: {
    fontSize: FontSize.size_xl,
    fontWeight: '700',
    color: Color.colorGray_300,
    fontFamily: FontFamily.helvetica,
    textAlign: 'left',
  },
});

export default ManageNotification;
