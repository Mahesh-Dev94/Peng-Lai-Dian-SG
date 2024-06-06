import React, {useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import {
  FontFamily,
  Color,
  FontSize,
  Border,
  ScaleDimention,
} from '../../GlobalStyles';
import Banner from '../Album/components/banner'; //'./components/banner';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/commonButton';
import DropdownComponent from '../../components/commonDropdown';
import CustomInput from '../../components/commonInput';
import {RadioButton} from 'react-native-paper';
const {height, width} = ScaleDimention;
const noOfYear = [
  {label: '1 year', value: '1'},
  {label: '2 year', value: '2'},
  {label: '3 year', value: '3'},
];
const data = [
  {label: 'Personal', value: 'Personal'},
  {label: 'Company', value: 'Company'},
  {label: 'Association', value: 'Association'},
];

const DonationDetailsPaymentOther = () => {
  const navigation = useNavigation();
  const [inputCount, setInputCount] = useState(1);
  const [inputValues, setInputValues] = useState(['']); // Store input values
  const [price, setPrice] = useState(50);
  const [checked, setChecked] = React.useState('first');

  const handleChangeText = (text, index) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = text;
    setInputValues(newInputValues);
  };

  const handleAddInputField = () => {
    // setInputCount(inputCount + 1);
    // setInputValues([...inputValues, '']);
  };

  const renderInputFields = () => {
    return Array.from({length: inputCount}).map((_, index) => (
      //   <TextInput
      //     key={index}
      //     style={styles.input}
      //     placeholder={`Name ${index + 1}`}
      //     value={inputValues[index]}
      //     onChangeText={(text) => handleChangeText(text, index)}
      //   />
      <CustomInput
        key={index}
        style={styles.input}
        placeholder={`Name ${index + 1}`}
      />
    ));
  };

  return (
    <SafeAreaView style={{flex: 1, width: width}}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerConatiner}>
          <Image
            style={styles.backIcon}
            resizeMode="cover"
            source={require('../../assets/images/iconexlightleft-2.png')}
          />
          <Text style={styles.events1}>Lotus Pagoda</Text>
        </TouchableOpacity>
        {/*Main Content  */}
        <View style={{width: width, marginTop: 15,flex:4.3}}>
          <Banner />
          <View style={styles.contentContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Choose Amount :</Text>
            </View>

            <View style={styles.radioButtonConatiner}>
              <View style={styles.radioSubConatiner}>
                <RadioButton
                  uncheckedColor={Color.colorGainsboro_200}
                  color={Color.colorDarkred_100}
                  value={2}
                  status={checked === 2 ? 'checked' : 'unchecked'}
                  onPress={() => setChecked(2)}
                />
                <Text style={styles.radiolbl}>$2</Text>
              </View>

              <View style={styles.radioSubConatiner}>
                <RadioButton
                  value={5}
                  status={checked === 5 ? 'checked' : 'unchecked'}
                  onPress={() => setChecked(5)}
                  uncheckedColor={Color.colorGainsboro_200}
                  color={Color.colorDarkred_100}
                />
                <Text style={styles.radiolbl}>$5</Text>
              </View>
            </View>

            <View style={styles.radioButtonConatiner}>
              <View style={styles.radioSubConatiner}>
                <RadioButton
                  uncheckedColor={Color.colorGainsboro_200}
                  color={Color.colorDarkred_100}
                  value={10}
                  status={checked === 10 ? 'checked' : 'unchecked'}
                  onPress={() => setChecked(10)}
                />
                <Text style={styles.radiolbl}>$10</Text>
              </View>

              <View style={styles.radioSubConatiner}>
                <RadioButton
                  value={50}
                  status={checked === 50 ? 'checked' : 'unchecked'}
                  onPress={() => setChecked(50)}
                  uncheckedColor={Color.colorGainsboro_200}
                  color={Color.colorDarkred_100}
                />
                <Text style={styles.radiolbl}>$50</Text>
              </View>
            </View>

            <View style={[styles.radioButtonConatiner,{marginBottom:30}]}>
              <View
                style={{
                  width: '30%',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <RadioButton
                  uncheckedColor={Color.colorGainsboro_200}
                  color={Color.colorDarkred_100}
                  value={'other'}
                  status={checked === 'other' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('other')}
                />
                <Text style={styles.radiolbl}>Other</Text>
              </View>

              <View
                style={{
                  width: '70%',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <CustomInput style={styles.OtherInput} placeholder={``} />
              </View>
            </View>

        

            {renderInputFields()}
            <View style={{width:288,justifyContent:'center',alignItems:'center'}}>
            <Text style={styles.noteOther}><Text style={styles.noteLbl}>Note</Text>: Actual name to be displayed on the sponsored items list</Text>
            </View>
           
            <View style={{width: 282, flexDirection: 'row-reverse'}}>
              <CustomButton
                style={styles.addMore}
                onPress={handleAddInputField}>
                <Text style={styles.addMoreLbl}>Add More</Text>
                <View style={styles.plusContainer}>
                  <Text style={styles.pluslbl}>+</Text>
                </View>
              </CustomButton>
            </View>
          </View>
        </View>
        {/* bottom content */}
        <View style={styles.buttonsConatiner}>
          <View style={styles.L1Button}>
            <Text style={styles.totalLBl}>Total Price</Text>
            <Text style={styles.price}>{`$${price * inputCount}.00/-`}</Text>
          </View>
          <CustomButton onPress={()=>navigation.navigate('EventDetailsPaymentQr')} style={styles.L2Button}>
            <Text style={styles.L2ButtonLbl}>Pay</Text>
          </CustomButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Border.br_8xs,
    backgroundColor: Color.colorWhitesmoke_100,
    width: width,
    flex: 1,
    // justifyContent: 'space-between',
  },
  headerConatiner: {
    flexDirection: 'row',
    marginTop: '5%',
    marginLeft: '5%',
    alignItems: 'flex-start',
    // flex:.5
  },
  backIcon: {
    width: '30%',
    height: 24,
    width: 24,
    marginRight: 10,
    // marginTop: 3,
  },

  events1: {
    fontSize: FontSize.size_mini,
    fontWeight: '400',
    color: Color.colorGray_300,
    fontFamily: FontFamily.helvetica,
    textAlign: 'left',
    justifyContent: 'center',
  },

  contentContainer: {
    alignItems: 'center',
    width: width,
    paddingHorizontal: 20,
    justifyContent: 'center',
    marginTop: 8,
    backgroundColor: Color.colorWhitesmoke_100,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginBottom: 15,
  },
  titleContainer: {
    width: 282,
    justifyContent: 'flex-start',
    marginVertical: 10,
    paddingTop: 15,
    marginBottom: 15,
  },
  title: {
    fontFamily: FontFamily.helvetica,
    fontSize: FontSize.size_xl,
    lineHeight: 23,
    fontWeight: '400',
    alignSelf: 'flex-start',
    color: Color.colorGray_300,
  },
  input: {
    height: 55,
    width: 282,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  OtherInput: {
    height: 41,
    width: 181,
    paddingHorizontal: 10,
    // marginBottom: 20,
  },
  addMore: {
    backgroundColor: Color.colorDarkred_100,
    borderRadius: Border.br_3xs,
    height: 26,
    width: 105,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  addMoreLbl: {
    fontFamily: FontFamily.helvetica,
    color: Color.colorWhitesmoke_100,
    fontSize: FontSize.size_sm,
    fontWeight: '400',
    lineHeight: 16,
    width: '80%',
    textAlign: 'center',
  },
  pluslbl: {
    fontFamily: FontFamily.robotoRegular,
    color: Color.colorDimgray_200,
    fontSize: 10,
    fontWeight: '400',
    // lineHeight: 18,
    // textAlign: 'center',
  },

  plusContainer: {
    width: 15,
    height: 15,
    backgroundColor: Color.colorWhitesmoke_100,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: 5,
  },

  totalLBl: {
    fontFamily: FontFamily.helvetica,
    fontSize: FontSize.size_mini,
    lineHeight: 17,
    fontWeight: '400',
    color: Color.colorGray_300,
    marginBottom: 10,
    // backgroundColor:'red'
  },

  price: {
    fontFamily: FontFamily.helvetica,
    fontSize: FontSize.size_xxl,
    lineHeight: 28,
    fontWeight: '700',
    color: Color.colorGray_300,
  },
  buttonsConatiner: {
    flex: 0.7,
    shadowRadius: 4, // Shadow radius
    elevation: Platform.OS === 'android' ? 4 : undefined, // Elevation for Android
    shadowOpacity: Platform.OS === 'ios' ? 0.4 : undefined,
    width: width + 10,
    flexDirection: 'row',
    height: 92,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'center',
    borderTopColor: Color.colorDarkgray_100,
    // borderTopWidth:1
  },

  L1Button: {
    borderRadius: Border.br_3xs,
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },

  L2Button: {
    backgroundColor: Color.colorDarkred_100,
    borderRadius: Border.br_3xs,
    height: 45,
    width: 150,
    // marginBottom: 20,
  },

  L2ButtonLbl: {
    fontFamily: FontFamily.helvetica,
    color: Color.colorWhitesmoke_100,
    fontSize: FontSize.size_xl,
    fontWeight: '400',
    lineHeight: 23,
  },

  radioButtonConatiner: {
    flexDirection: 'row',
    width: 282,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:10
  },
  radioSubConatiner: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  radiolbl: {
    fontFamily: FontFamily.helvetica,
    color: Color.colorGray_300,
    fontSize: FontSize.size_base,
    fontWeight: '400',
    lineHeight: 18,
  },
  noteLbl:{
    fontFamily: FontFamily.montserratMedium,
    color: Color.colorDimgray_200,
    fontSize: FontSize.size_xs,
    fontWeight: '400',
    lineHeight: 14,
  },
  noteOther:{
    fontFamily: FontFamily.helvetica,
    color: Color.colorDimgray_200,
    fontSize: FontSize.size_xs,
    fontWeight: '400',
    lineHeight: 14,
  }
});

export default DonationDetailsPaymentOther;
