import React from 'react';
import { TextInput, View, StyleSheet, Dimensions, Image, Text } from 'react-native';
import { FontFamily, Color, FontSize, Border, ScaleDimention } from "../../../GlobalStyles";
import { useSelector } from 'react-redux';
import { getImageFullPath } from '../../../utils';
import { useTranslation } from 'react-i18next';
const { height, width } = ScaleDimention;
const RegisteredUsers = ({ totalParticipants, ProfileImages }) => {
  const config = useSelector(state => state.config.configUrls);
  const { t } = useTranslation();
  return (
    <View style={styles.container}>

      {ProfileImages.length === 1 && <Image
        style={styles.ellipseIconLayout}
        resizeMode="cover"
        source={getImageFullPath(config?.imagebasePath, ProfileImages[0])}
      />}
      {ProfileImages.length === 2 && <Image
        style={[styles.eventDetailPageChild2, styles.ellipseIconLayout]}
        resizeMode="cover"
        source={getImageFullPath(config?.imagebasePath, ProfileImages[1])}
      />}
      <Text style={[styles.kPeopleRegistered, styles.text1Typo]}>
        { }{totalParticipants} {t('screens.EventsDetails.people registered')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderRadius: Border.br_8xs,
    width: width,
    marginVertical: 15,
    marginLeft: 5

  },
  kPeopleRegistered: {
    marginLeft: 5,
    fontSize: FontSize.size_sm,
    color: Color.colorDarkred_100,
  },
  ellipseIcon: {
    // left: 25,
  },
  text1Typo: {
    fontFamily: FontFamily.helvetica,
  },
  ellipseIconLayout: {
    height: 22,
    width: 22,
    borderRadius: 22,
    backgroundColor: Color.colorGainsboro_200
  },
  eventDetailPageChild2: {
    marginLeft: -5
  },
});

export default RegisteredUsers;
