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
const DonationDetailsPayment = () => {
  const navigation = useNavigation();
  const [inputCount, setInputCount] = useState(1);
  const [inputValues, setInputValues] = useState(['']); // Store input values
  const [price,setPrice]=useState(300)

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
    return Array.from({ length: inputCount }).map((_, index) => (
    //   <TextInput
    //     key={index}
    //     style={styles.input}
    //     placeholder={`Name ${index + 1}`}
    //     value={inputValues[index]}
    //     onChangeText={(text) => handleChangeText(text, index)}
    //   />
	  <CustomInput key={index} style={styles.input} placeholder={`Name ${index+1}`} />
    ));
  };

  return (
    <SafeAreaView style={{flex: 1, width: width}}>
      <ScrollView  contentContainerStyle={styles.container} keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false}>
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
        <View style={{width: width, marginTop: 15, flex: 4.3}}>
          <Banner />
          <View style={styles.contentContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Sponsorship Period</Text>
            </View>

            {/* <DropdownComponent
              data={noOfYear}
              placeholder="No. of years"
              onSelect={val => Alert.alert(val)}
              type="payment"
            />

            <Text style={styles.selectDuration}>09 Feb 2024 - 09 Feb 2025</Text>

            <DropdownComponent
              data={data}
              placeholder="Select Category"
              onSelect={val => Alert.alert(val)}
              type="payment"
            /> */}

             { renderInputFields()}
            <View style={{width:282,flexDirection:'row-reverse'}}>
              <CustomButton style={styles.addMore} onPress={handleAddInputField}>
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
			<Text style={styles.price}>{`$${price*inputCount}.00/-`}</Text>
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
	justifyContent:'space-between'
	
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
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15,
    marginBottom: 15,
  },
  titleContainer: {
    // flexDirection: 'row',
    width: width - 40,
    justifyContent: 'center',
    marginVertical: 10,
    paddingTop: 15,
    marginBottom: 25,
  },
  title: {
    fontFamily: FontFamily.helvetica,
    fontSize: FontSize.size_xl,
    lineHeight: 23,
    fontWeight: '400',
    alignSelf: 'center',
    color: Color.colorGray_300,
  },

  selectDuration: {
    fontFamily: FontFamily.helvetica,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 18,
    textAlign: 'center',
    marginBottom: 20,
    paddingVertical: 10,
  },
  input: {
    height: 55,
    width: 282,
    paddingHorizontal:5,
    marginBottom: 20,
  },
  addMore: {
    backgroundColor: Color.colorDarkred_100,
    borderRadius: Border.br_3xs,
    height: 26,
    width: 105,
    flexDirection: 'row',
	alignItems:'center',
	alignContent:'center'
  },
  addMoreLbl: {
    fontFamily: FontFamily.helvetica,
    color: Color.colorWhitesmoke_100,
    fontSize: FontSize.size_sm,
    fontWeight: '400',
    lineHeight: 16,
    width: '80%',
	textAlign:'center'

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
	alignSelf:'center',
	marginRight:5
  },

  totalLBl: {
	fontFamily: FontFamily.helvetica,
	fontSize: FontSize.size_mini,
	lineHeight: 17,
	fontWeight: '400',
	color: Color.colorGray_300,
	marginBottom:10,
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
	// backgroundColor:'red'
  },

  L1Button: {
    borderRadius: Border.br_3xs,
	justifyContent:'space-evenly',
	flexDirection:'column'
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
});

export default DonationDetailsPayment;
