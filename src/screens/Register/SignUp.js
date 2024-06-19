import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { Color, Border, FontSize, FontFamily } from '../../GlobalStyles';
import CustomButton from '../../components/commonButton';
import CustomInput from '../../components/commonInputBottomBorder';
import CustomModal from '../../components/customModal';
import { useNavigation } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import DatePicker from 'react-native-date-picker';
import CustomPhone from '../../components/customPhoneRegister';
import CustomOTPField from '../../components/customOtpField';
import { ScaleDimention } from '../../GlobalStyles';
import { useTranslation } from 'react-i18next';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
// import { CountryPicker } from 'react-native-country-codes-picker';
import CountryPicker from 'react-native-country-picker-modal'
import { formatDate, headersWithAuth, showToast } from '../../utils';
import Loader from '../../components/loader';
import { post, requestMediaMetaInfo } from '../../services/api';
import { API_Token, REGISTER, RESEND_OTP, VERIFY_EMAIL } from '../../services/config';
import { useSelector } from 'react-redux';
const { height, width } = ScaleDimention;

const customTheme = {
  ...CountryPicker.defaultProps.theme,
  fontFamily: FontFamily.helvetica, // Define your custom font family here
  primaryColor: 'red', // Define your custom primary color here
  backgroundColor: 'white', // Define your custom background color here
  onBackgroundTextColor: 'black', // Define your custom text color here
  placeholderTextColor: 'gray', // Define your custom placeholder text color here
};
const SignUp = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch('Password'); // Get the value of the password field

  const { t } = useTranslation();
  const config = useSelector((state) => state.config.configUrls);
  const [isLoading, setisLoading] = useState(false);
  const [email, setEmail] = useState(null);
  const [otp, setOtp] = useState('')

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('+65');
  const [countryCodePlaceholder, setCountryCodePlaceholder] = useState(t('screens.SignUp.(+91)'));
  const [invalidError, setInvalidErr] = useState('')
  const [OtpError, setOtpError] = useState({message: '', type: 'error'});
  const [isSecure, setIsSecure] = useState(true);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const onSubmit = async (data) => {
    setisLoading(true);

    const optionArr = [];

    if (data.pdpa) {
      optionArr.push("pdpa");
    }
    if (data.term) {
      optionArr.push("term");
    }
    if (data.receive) {
      optionArr.push("receive");
    }

    const payload =
    {
      email: data.Email,
      password: data.Password,
      DOB: data.DOB,
      Firstname: data.firstName,
      Lastname: data.LastName,
      Mobilenumber: data.Mobilenumber,
      MailAddress: data?.MailAddress,
      CountryCode: countryCode,
      Option: optionArr,
    };
    setEmail(data.Email);
    console.log(data,'payload---',`${config?.UrlBasePath}/${REGISTER}`)
    const registerUser = await post(`${config?.UrlBasePath}/${REGISTER}`, payload)
    console.log('registerUser----', registerUser)
    if (registerUser.success) {
      showToast('success', registerUser.message);
      toggleModal();
    } else {
      console.log('success', registerUser.message)
      showToast('success', registerUser.message);
    }
    setisLoading(false);
  };

  const resendOtp = async () => {
    const payload = {
      "email": email
    }
    const resendOtp = await post(`${config?.UrlBasePath}/${RESEND_OTP}`, payload)
    console.log('resendOtp---',resendOtp)
    if (resendOtp.success) {
      showToast('success', resendOtp.message);
      setOtpError({message: resendOtp.message, type: 'success'});
   
    } else {
      // console.log('Failed---',resendOtp)
      showToast('error', resendOtp.message);
      setOtpError({message: resendOtp.message, type: 'error'});
    }
  }

  // Function to handle OTP changes
  const handleOtpChange = (newOtp) => {
    setOtp(newOtp);
    console.log('newOtp32---', newOtp)
  };

  const _onEmailVerify = async () => {
    console.log('otp---', otp)
    if (otp.length === 6) {
      const payload = {
        "email": email,
        "verificationOTP": otp
      }
      const verify = await post(`${config?.UrlBasePath}/${VERIFY_EMAIL}`, payload, API_Token)
      console.log('resendOtp---', verify)
      if (verify.success) {
        setInvalidErr('')
        setOtpError({message: verify.message, type: 'success'});
        toggleModal();
        navigation.goBack();
      } else {
        setInvalidErr(verify.message)
        setOtpError({message: verify.message, type: 'error'});

      }
      showToast('success', verify.message);
      
      // navigation.navigate('MainDrawer')
    } else {
      showToast('error', 'Please Enter Correct Otp!');
      setInvalidErr('Please Enter Correct Otp!')
      setOtpError({message:'Please Enter Correct Otp!', type: 'error'});

    }

  }

  return (
    <SafeAreaView style={{ width: width, flex: 1 }}>
         <KeyboardAvoidingView style={{flex: 1}}>
      <ScrollView style={{ flex: 1, width: width }} keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false}>
        <View style={styles.signInOption1}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.pldLogo1}
              resizeMode="cover"
              source={require('../../assets/images/PLDLogo.png')}
            />
          </View>
          <View style={styles.buttonContainer}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CustomInput
                 label={t('screens.SignUp.First Name')}
                 placeholder={t('screens.SignUp.Enter')+' '+ t('screens.SignUp.First Name')}

                style={styles.input}
                // placeholder={t('screens.SignUp.First Name')}
                control={control}
                name="firstName"
                rules={{ required: t('screens.SignUp.First Name is required') }}
                errors={errors}
              />
              <CustomInput
               label={t('screens.SignUp.Last Name')}
               placeholder={t('screens.SignUp.Enter')+' '+ t('screens.SignUp.Last Name')}
                style={styles.input}
                // placeholder={t('screens.SignUp.Last Name')}
                control={control}
                name="LastName"
                rules={{ required: t('screens.SignUp.Last Name is required') }}
                errors={errors}
              />
              <CustomInput
                 label={t('screens.SignUp.Email_Id')}
                 placeholder={t('screens.SignUp.Enter')+' '+ t('screens.SignUp.Email Id')}
                style={styles.input}
                // placeholder={t('screens.SignUp.Email Id')}
                control={control}
                textContentType="emailAddress"
                name="Email"
                rules={{
                  required: t('screens.SignUp.Email is required'),
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: t('screens.SignUp.Invalid email address')
                  }
                }}
                errors={errors}
              />
              <View style={{width: '100%', alignItems: 'flex-end'}}>
              <CustomInput
              label={t('screens.SignUp.Password')}
              placeholder={t('screens.SignUp.Enter')+' '+ t('screens.SignUp.Password')}
                style={styles.input}
                // placeholder={t('screens.SignUp.Password')}
                control={control}
                name="Password"
                rules={{ required: t('screens.SignUp.Password is required') }}
                errors={errors}
                secureTextEntry={isSecure}
              />
              <TouchableOpacity
                onPress={() => setIsSecure(!isSecure)}
                style={styles.iconexfilledhide}>
                {/* <Image
                  // style={styles.iconexfilledhide}
                  resizeMode="cover"
                  source={require('../../assets/images/iconexfilledhide.png')}
                /> */}
                { isSecure ?  <Image
                  // style={styles.iconexfilledhide}
                  resizeMode="cover"
                  source={require('../../assets/images/iconexfilledhide.png')}
              
                />:
                 <Image
                  style={{height:22,width:22}}
                  resizeMode="contain"
                  source={require('../../assets/images/secure.png')}
              
                />}
              </TouchableOpacity>
              </View>

              <CustomInput
               label={t('screens.SignUp.Confirm password')}
               placeholder={t('screens.SignUp.Enter')+' '+ t('screens.SignUp.Confirm password')}
                style={styles.input}
                // placeholder={t('screens.SignUp.Confirm password')}
                control={control}
                name="confirmPassword"
                // rules={{ required: t('screens.SignUp.Confirm password is required') }}
                rules={{ required: t('screens.SignUp.Confirm password is required'), validate: (value) => value === password || t('screens.SignUp.Passwords do not match') }}
                errors={errors}
                secureTextEntry={true}
              />
            
              <CustomPhone
                style={styles.input}
                placeholder={t('screens.SignUp.Phone No')}
                // countryCode={t('screens.SignUp.(+91)')}
                countryCode={countryCodePlaceholder}
                onSelectCountryCode={() => setShow(true)}
                control={control}
                name="Mobilenumber"
                rules={{ required: t('screens.SignUp.Mobile number is required') }}
                errors={errors}
              />
              <TouchableOpacity onPress={() => setOpen(true)}>
                <CustomInput
                 label={t('screens.SignUp.Date of birth')}
                 placeholder={t('screens.SignUp.Enter')+' '+t('screens.SignUp.Date of birth')}
                  style={styles.input}
                  // placeholder={t('screens.SignUp.Date of birth')}
                  control={control}
                  name="DOB"
                  rules={{ required: t('screens.SignUp.DOB is required') }}
                  errors={errors}
                  onPressIn={() => setOpen(true)}
                />
              </TouchableOpacity>
              <CustomInput
               label={t('screens.SignUp.Mailing Address')}
               placeholder={t('screens.SignUp.Enter')+' '+t('screens.SignUp.Mailing Address')}
                style={styles.input}
                // placeholder={t('screens.SignUp.Mailing Address')}
                control={control}
                
                name="MailAddress"
                textContentType="emailAddress"
                rules={{
                  required:t('screens.SignUp.Mail Address is required'),
                  // pattern: {
                  //   value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  //   message:t('screens.SignUp.Invalid Mail address')
                  // }
                }}
                errors={errors}
              />

              <View
                style={{
                  width: 282,
                  marginTop: -10,
                  marginBottom: 10,
                  alignItems: 'flex-start',
                }}>
                <Controller
                  control={control}
                  name="term"
                  defaultValue={false}
                  rules={{ required: t('screens.SignUp.You must agree to the Terms & Conditions') }}
                  render={({ field: { onChange, value } }) => (
                    <View style={styles.checkboxContainer}>
                      <CheckBox
                        value={value}
                        onValueChange={onChange}
                        style={styles.checkbox}
                        tintColors={{ false: Color.colorDimgray_200 ,true:Color.colorDarkred_100}}
                      />
                      <Text style={styles.label}>
                        {t('screens.SignUp.Terms & Conditions')}
                      </Text>
                    </View>
                  )}
                />
                {errors && errors['term'] && (
                  <Text
                    style={{
                      color: 'red',
                      marginTop: -10,
                      marginBottom: 10,
                      alignSelf: 'flex-start',
                      marginLeft: 10,
                    }}>
                    {/* {errors.agree.message} */}
                    {errors['term'].message}
                  </Text>
                )}

                <Controller
                  control={control}
                  name="pdpa"
                  defaultValue={false}
                  rules={{ required: t('screens.SignUp.You must agree to the PDPA') }}
                  render={({ field: { onChange, value } }) => (
                    <View style={styles.checkboxContainer}>
                      <CheckBox
                        // value={isSelectedPDPA}
                        // onValueChange={setSelectionPDPA}
                        value={value}
                        onValueChange={onChange}
                        tintColors={{ false: Color.colorDimgray_200 ,true:Color.colorDarkred_100}}
                        style={styles.checkbox}
                      />
                      <Text style={styles.label}>
                        {' '}
                        {t('screens.SignUp.PDPA')}
                      </Text>
                    </View>
                  )}
                />
                {errors && errors['pdpa'] && (
                  <Text
                    style={{
                      color: 'red',
                      marginTop: -10,
                      marginBottom: 10,
                      alignSelf: 'flex-start',
                      marginLeft: 10,
                    }}>
                    {/* {errors.agree.message} */}
                    {errors['pdpa'].message}
                  </Text>
                )}

                <Controller
                  control={control}
                  name="receive"
                  defaultValue={false}
                  // rules={{ required: 'You must agree to the Peng Lai Dian' }}
                  render={({ field: { onChange, value } }) => (
                    <View style={styles.checkboxContainer}>
                      <CheckBox
                        value={value}
                        onValueChange={onChange}
                        style={styles.checkbox}
                        tintColors={{ false: Color.colorDimgray_200,true:Color.colorDarkred_100 }}
                      />
                      <Text style={styles.label}>
                        {t(
                          'screens.SignUp.Receive event updates from Peng Lai Dian',
                        )}
                      </Text>
                    </View>
                  )}
                />
                {errors && errors['receive'] && (
                  <Text
                    style={{
                      color: 'red',
                      marginTop: -10,
                      marginBottom: 10,
                      alignSelf: 'flex-start',
                      marginLeft: 10,
                    }}>
                    {/* {errors.agree.message} */}
                    {errors['receive'].message}
                  </Text>
                )}
              </View>
            </View>

            <CustomButton
              style={styles.L2Button}
              onPress={handleSubmit(onSubmit)}
            // onPress={onSubmit}
            >
              <Text style={styles.L2ButtonLbl}>
                {' '}
                {t('screens.SignUp.Sign Up')}
              </Text>
            </CustomButton>
            <CustomButton
              style={{ width: 282, marginBottom: 15 }}
              onPress={() => navigation.goBack()}>
              <Text style={styles.alreadyHaveAnContainer}>
                <Text style={styles.alreadyHaveAn}>
                  {t('screens.SignUp.Already have an account ?')}
                </Text>
                <Text style={styles.signIn}>{t('screens.SignUp.Sign In')}</Text>
              </Text>
            </CustomButton>
          </View>
          {/* Forgot Password Modal */}
          <CustomModal isVisible={isModalVisible} onClose={toggleModal}>
            <View
              style={{
                flexDirection: 'column',
                marginHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 20,
                backgroundColor: Color.colorWhitesmoke_100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 316,
                  paddingHorizontal: 15,
                  paddingVertical: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={toggleModal}
                  style={styles.headerConatiner}>
                  <Image
                    style={styles.backIcon}
                    resizeMode="cover"
                    source={require('../../assets/images/iconexlightleft-2.png')}
                  />
                </TouchableOpacity>
                <Text style={styles.fogetPassLbl}>
                  {' '}
                  {t('screens.SignUp.E-mail verification')}
                </Text>
                <Text style={styles.fogetPassLbl2}>
                  {t('screens.SignUp.Enter your code here')}
                </Text>
                <CustomOTPField
                  style={{ width: 250, height: 43,color:Color.colorDimgray_200 }}
                  onChangeText={handleOtpChange}
                />
                {/* {invalidError ? <Text style={{
                  color: 'red',
                  marginTop: 5,
                  alignSelf: 'center',
                  // marginLeft: 10,
                }}>
                  {t('screens.SignUp.Invalid OTP')}
                </Text> : null} */}
                
                {OtpError.message ? (
              <Text
                style={{
                  color: OtpError.type === 'error' ? 'red' : 'green',
                  marginTop: 5,
                  alignSelf: 'center',
                  // marginLeft: 10,
                }}>
                {OtpError.message}
              </Text>
            ) : null}

                <CustomButton
                  style={{ width: 220, marginVertical: 15 }}
                  onPress={resendOtp}>
                  <Text style={[styles.dontHaveAnContainer, styles.emailIdClr]}>
                    <Text style={styles.signUp}>
                      {t('screens.SignUp.Resend OTP')}
                      <Text style={styles.signIn}>
                        {' '}{t('screens.SignUp.Click here ?')}
                      </Text>
                    </Text>
                  </Text>
                </CustomButton>

                <CustomButton
                  style={styles.L2Button}
                  onPress={_onEmailVerify}>
                  <Text style={styles.L2ButtonLbl}>
                    {' '}
                    {t('screens.SignUp.Submit')}
                  </Text>
                </CustomButton>
              </View>
            </View>
          </CustomModal>
          {/* Date picker */}
          <DatePicker
            modal
            open={open}
            date={new Date()}
            mode="date"
            onConfirm={date => {
              setOpen(false);
              setValue('DOB', formatDate(date), { shouldValidate: true });
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          {/* Country code picker */}
           {show && (
        <CountryPicker
          withFlag
          withFilter
          withCountryNameButton
          withAlphaFilter
          withCallingCode
          countryCode="IN"
          theme={customTheme}
          onSelect={(country) => {
            console.log(country);
            setCountryCode(country.callingCode[0]);
            setCountryCodePlaceholder(`(+${country.callingCode})`);
            setShow(false);
          }}
          onClose={() => {
            console.log('Country picker closed');
            setShow(false);
          }}
          translation="eng"
          visible={show}
        />
      )}

          {/* Loader */}
          {isLoading && <Loader />}
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  signInOption1: {
    backgroundColor: Color.colorKhaki,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageContainer: {
    flex: 2.2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  pldLogo1: {
    width: 168,
    height: 193,
    // marginVertical: 10,
  },

  input: {
    height: 45,
    width: 282,
    // padding: 10,
    marginBottom: 25,
    color:Color.colorDimgray_200
  },
  popupLblContainer: {
    width: 282,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonContainer: {
    width: width,
    flex: 2.8,
    backgroundColor: Color.colorWhitesmoke_100,
    // borderTopLeftRadius: 25,
    // borderTopRightRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  buttonSubContainer: {
    // width: width,
    // flex: 1,
    // marginTop: 40,
    // backgroundColor:'red'
  },
  L2Button: {
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    backgroundColor: Color.colorDarkred_100,
    borderRadius: Border.br_3xs,
    height: 55,
    width: 282,
    marginBottom: 20,
  },

  L2ButtonLbl: {
    fontFamily: FontFamily.helvetica,
    color: Color.colorWhitesmoke_100,
    fontSize: FontSize.size_xl,
    fontWeight: '400',
    lineHeight: 23,
  },

  iconexfilledhide: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: '7%',
    top: '22%',
  },
  forgotPassword: {
    fontSize: FontSize.size_xs,
    color: Color.colorBlack,
    width: 111,
    height: 18,
    fontFamily: FontFamily.helvetica,
    textAlign: 'right',
    marginRight: 10,
    marginTop: -20,
  },
  headerConatiner: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  backIcon: {
    height: 24,
    width: 24,
    marginRight: 5,
    marginTop: 3,
  },
  fogetPassLbl: {
    fontSize: FontSize.size_xl,
    color: Color.colorGray_300,
    fontFamily: FontFamily.helvetica,
    fontWeight: '700',
    lineHeight: 23,
    marginBottom: 10,
  },

  fogetPassLbl2: {
    fontSize: FontSize.size_xs,
    color: Color.colorDimgray_200,
    fontFamily: FontFamily.helvetica,
    fontWeight: '700',
    lineHeight: 14,
    marginBottom: 20,
    textAlign: 'center',
    alignItems: 'center',
  },

  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 5,
    // justifyContent: 'center',
    alignItems: 'center',
    width:282
  },
  checkbox: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    margin: 5,
    fontSize: FontSize.size_xs,
    color: Color.colorDimgray_200,
    fontFamily: FontFamily.helveticaLight,
    fontWeight: '400',
    lineHeight: 15,
  },

  alreadyHaveAnContainer: {
    fontSize: FontSize.size_mini,
    textAlign: 'center',
    color: Color.colorDimgray_200,
    marginBottom: 10,
  },

  alreadyHaveAn: {
    fontFamily: FontFamily.helvetica,
    color:Color.colorDimgray_200
  },
  signIn: {
    fontWeight: '700',
    fontFamily: FontFamily.helvetica,
    marginLeft: 3,
    color:Color.colorDimgray_200
  },
  signUp: {
    fontSize: 20,
    fontFamily: FontFamily.helvetica,
    fontWeight: '400',
    color:Color.colorDimgray_200
  },
  iconexfilledhide: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: '7%',
    top: '22%',
  },
});

export default SignUp;
