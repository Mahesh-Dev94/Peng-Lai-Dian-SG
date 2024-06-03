import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import {Color, FontSize, FontFamily, Border} from '../../GlobalStyles';
import CustomButton from '../../components/commonButton';
import CustomInput from '../../components/commonInputBottomBorder';
import CustomModal from '../../components/customModal';
import {useNavigation} from '@react-navigation/native';
import {ScaleDimention} from '../../GlobalStyles';
import {useTranslation} from 'react-i18next';
import {ForgotPost, post, requestMediaMetaInfo} from '../../services/api';
import {
  API_Token,
  FORGET_PASSWORD,
  LOGIN,
  RESEND_OTP,
  RESET_PASSWORD,
  VERIFY_OTP,
} from '../../services/config';
import {Controller, useForm, useFieldArray} from 'react-hook-form';
import Loader from '../../components/loader';
import {formatDate, headersWithAuth, showToast} from '../../utils';
import {persistLogin} from '../../Redux/Reducers/sessionSlice';
import {useDispatch, useSelector} from 'react-redux';
import CustomOTPField from '../../components/customOtpField';

const {height, width} = ScaleDimention;
// const {width} = Dimensions.get('window');
const SignIn = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    // defaultValues: {Email: 'ishwar.chand@pearsystem.in',Password:"Admin@123"},
  });
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const language = useSelector(state => state.language.selectedLanguage);
  const config = useSelector(state => state.config.configUrls);
  const {t} = useTranslation();
  const [isLoading, setisLoading] = useState(false);
  const [isSecure, setIsSecure] = useState(true);
  const [ForgetEmail, setForgetEmail] = useState('');

  const [emailError, setEmailError] = useState({message: '', type: 'error'});
  const [OtpError, setOtpError] = useState({message: '', type: 'error'});
  const [ChangeError, setChangeError] = useState({message: '', type: 'error'});

  const [isForgotModalVisible, setIsForgotModalVisible] = useState(false);
  const [isForgotOTPModalVisible, setIsForgotOTPModalVisible] = useState(false);
  const [isForgotChangeModalVisible, setIsChangeModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [otp, setOtp] = useState('');
  const [invalidError, setInvalidErr] = useState('');

  // console.log('configconfig---',config)

  const handleSignIn = async data => {
    setisLoading(true);
    try {
      const payload = {
        email: data.Email,
        password: data.Password,
        language: language,
      };
      // console.log('payload---',payload)
      const signInUser = await post(`${config?.UrlBasePath}/${LOGIN}`, payload); //LOGIN  //`${API_BASE_URL}/${endpoint}`
      // console.log('signInUser----', signInUser);
      if (signInUser.success) {
        showToast('success', signInUser.message);
        dispatch(persistLogin(signInUser));
        // navigation.navigate('MainDrawer');
      } else {
        showToast('success', signInUser.message);
      }
    } catch (error) {
      console.log('error---', error);
      showToast('error', error?.message);
    }
    setisLoading(false);
  };

  const handleForgotPassword = async data => {
    console.log('payload---', emailError, ForgetEmail);
    if (ForgetEmail === '') {
      setEmailError({
        message: t('screens.SignIn.Email Id is required'),
        type: 'error',
      });
      return;
    }
    setisLoading(true);
    const payload = {
      email: ForgetEmail,
    };

    const forgotPasswordUser = await ForgotPost(
      `${config?.UrlBasePath}/${FORGET_PASSWORD}`,
      payload,
    );
    console.log('forgotPasswordUser----', forgotPasswordUser);
    if (forgotPasswordUser.status === 200) {
      setEmailError({
        message: forgotPasswordUser?.data?.message,
        type: 'success',
      });
      
        setIsForgotModalVisible(false);
        setTimeout(() => {
        setIsForgotOTPModalVisible(true);
        // setForgetEmail('');
        setEmailError({message: '', type: 'success'});
      }, 400);
    } else {
      setEmailError({
        message: forgotPasswordUser?.data?.message,
        type: 'error',
      });
    }
    setisLoading(false);
  };

  const handleForgetEmailChange = text => {
    setForgetEmail(text);
    // Email validation logic
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(text)) {
      setEmailError({
        message: t('screens.SignIn.Invalid Email Id'),
        type: 'error',
      });
    } else {
      setEmailError({message: '', type: 'error'});
    }
  };

  // Function to handle OTP changes
  const handleOtpChange = newOtp => {
    setOtp(newOtp);
    console.log('newOtp32---', newOtp);
  };

  const resendOtp = async () => {
    const payload = {
      email: ForgetEmail,
    };
    setisLoading(true);
    console.log('resend OTP---', payload);
    const resendOtp = await ForgotPost(
      `${config?.UrlBasePath}/${FORGET_PASSWORD}`,
      payload,
    );
    console.log('resendOtp---', resendOtp);
    if (resendOtp.status === 200) {
      setOtpError({message: resendOtp?.data?.message, type: 'success'});
    } else {
      setOtpError({message: resendOtp?.data?.message, type: 'error'});
    }
    setisLoading(false);
  };

  const _onOTPVerify = async () => {
    console.log('otp---', otp);
    if (otp.length === 6) {
      setisLoading(true);
      const payload = {
        email: ForgetEmail,
        resetPasswordOTP: otp.toString(),
      };
      console.log('otp verify----', payload);
      const verify = await ForgotPost(
        `${config?.UrlBasePath}/${VERIFY_OTP}`,
        payload,
      );
      console.log('resendOtp---', verify);
      if (verify.status === 200) {
        setOtpError({message: verify?.data?.message, type: 'success'});
        setIsForgotOTPModalVisible(false);
        setTimeout(() => {
          setIsChangeModalVisible(true);
          setOtpError({message: '', type: 'success'});
        }, 400);

      } else {
        setOtpError({message: verify?.data?.message, type: 'error'});
      }
      setisLoading(false);
    } else {
      // showToast('error', 'Please Enter Correct Otp!');
      setOtpError({
        message: t('screens.SignIn.Please Enter Correct Otp!'),
        type: 'error',
      });
    }
  };

  const _onHandleNewPassWord = txt => {
    setNewPassword(txt);
  };

  const _onHandleConfirmPassWord = txt => {
    setConfirmPassword(txt);
  };

  const _onChangePassword = async () => {
    if (newPassword === '') {
      setChangeError({
        message: t('screens.SignIn.New Password is required'),
        type: 'error',
      });
      return;
    }
    if (confirmPassword === '') {
      setChangeError({
        message: t('screens.SignIn.Confirm Password is required'),
        type: 'error',
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      setChangeError({
        message: t('screens.SignIn.Passwords do not match'),
        type: 'error',
      });
      return;
    }
    setisLoading(true);
    const payload = {
      email: ForgetEmail,
      password: newPassword,
    };
    console.log('resetPassword----', payload);
    const resetPassword = await ForgotPost(
      `${config?.UrlBasePath}/${RESET_PASSWORD}`,
      payload,
    );

    if (resetPassword?.status === 200) {
      setChangeError({message: resetPassword?.data?.message, type: 'success'});
      setTimeout(() => {
        setIsChangeModalVisible(false);
        setForgetEmail('');

      }, 200);
    } else {
      setChangeError({message: resetPassword?.data?.message, type: 'error'});
    }
    setisLoading(false);
  };

  return (
    <SafeAreaView style={{ width: width, flex: 1 }}>
    <KeyboardAvoidingView style={{flex: 1}}>
    <View style={styles.signInOption1}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.pldLogo1}
          resizeMode="cover"
          source={require('../../assets/images/PLDLogo.png')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonSubContainer}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 30,
            }}>
            <CustomInput
              style={styles.input}
              label={t('screens.SignIn.Email_Id')}
              placeholder={t('screens.SignIn.Enter')+' '+ t('screens.SignIn.Email Id')}
              control={control}
              name="Email"
              textContentType="emailAddress"
              // value={'ishwar.chand@pearsystem.in'}
              rules={{
                required: t('screens.SignIn.Email Id is required'),
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: t('screens.SignIn.Invalid Mail address'),
                },
              }}
              errors={errors}
            />
            {/* <CustomInput style={styles.input} placeholder={t('screens.SignIn.Email Id')} /> */}
            <View style={{width: '100%', alignItems: 'flex-end'}}>
              <CustomInput
                style={styles.input}
                label={t('screens.SignIn.Password')}
                placeholder={t('screens.SignIn.Enter')+' '+t('screens.SignIn.Password')}
                control={control}
                name="Password"
                rules={{required: t('screens.SignIn.Password is required')}}
                errors={errors}
                secureTextEntry={isSecure}
              />
              {/* <CustomInput style={styles.input} placeholder={t('screens.SignIn.Password')} /> */}
              <TouchableOpacity onPress={() => setIsForgotModalVisible(true)}>
                <Text style={styles.forgotPassword}>
                  {t('screens.SignIn.Forgot password ?')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsSecure(!isSecure)}
                style={styles.iconexfilledhide}>
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
          </View>
          <CustomButton
            style={styles.L2Button}
            onPress={handleSubmit(handleSignIn)}>
            <Text style={styles.L2ButtonLbl}>
              {t('screens.SignIn.Sign In')}
            </Text>
          </CustomButton>
          <CustomButton
            style={{marginTop: -8}}
            onPress={() => navigation.goBack()}>
            <Text style={[styles.dontHaveAnContainer, styles.emailIdClr]}>
              <Text style={styles.dontHaveAn}>
                {' '}
                {t('screens.SignIn.Don’t have an account ?')}
              </Text>
              <Text style={styles.signUp}>{t('screens.SignIn.Sign up')}</Text>
            </Text>
          </CustomButton>
        </View>
      </View>
      {/* Forgot Password Modal */}
      <CustomModal
        isVisible={isForgotModalVisible}
        onClose={() => setIsForgotModalVisible(false)}>
        <View
          style={{
            flexDirection: 'column',
            marginHorizontal: '3%',
            marginVertical: '10%',
            borderRadius: 20,
            backgroundColor: Color.colorWhitesmoke_100,
          }}>
            {isLoading && <Loader />}
          <View
            style={{
              paddingHorizontal: 15,
              paddingVertical: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => setIsForgotModalVisible(false)}
              style={styles.headerConatiner}>
              <Image
                style={styles.backIcon}
                resizeMode="cover"
                source={require('../../assets/images/iconexlightleft-2.png')}
              />
            </TouchableOpacity>
            <View style={styles.popupLblContainer}>
              <Text style={styles.fogetPassLbl}>
                {' '}
                {t('screens.SignIn.Forgot your password?')}
              </Text>
              <Text style={styles.fogetPassLbl2}>
                {t(
                  'screens.SignIn.Please enter the email you would like your password reset information sent to',
                )}
              </Text>
            </View>

            <TextInput
              value={ForgetEmail}
              onChangeText={txt => handleForgetEmailChange(txt)}
              placeholder={t('screens.SignIn.Email Id')}
              style={[styles.input, styles.f_p_E_input]}
              textContentType="emailAddress"
              placeholderTextColor="#888"
            />
            {emailError.message ? (
              <Text
                style={[
                  styles.error,
                  emailError.type === 'success' ? {color: 'green'} : null,
                ]}>
                {emailError.message}
              </Text>
            ) : null}
            <CustomButton
              style={styles.L2Button}
              onPress={() => handleForgotPassword()}>
              <Text style={styles.L2ButtonLbl}>
                {t('screens.SignIn.Request password')}
              </Text>
            </CustomButton>

            <CustomButton
              style={{
                height: 20,
                width: 282,
              }}
              onPress={() => setIsForgotModalVisible(false)}>
              <Text style={[styles.dontHaveAnContainer, styles.emailIdClr]}>
                <Text style={styles.signUp}>
                  {t('screens.SignIn.Back to Sign in')}
                </Text>
              </Text>
            </CustomButton>
          </View>
        </View>
      </CustomModal>

      {/* Forgot Password OTP verification Modal */}
      <CustomModal
        isVisible={isForgotOTPModalVisible}
        onClose={() => setIsForgotOTPModalVisible(false)}>
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
            {isLoading && <Loader />}
          <View
            style={{
              width: 316,
              paddingHorizontal: 15,
              paddingVertical: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => setIsForgotOTPModalVisible(false)}
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
              style={{width: 250, height: 43, color: Color.colorDimgray_200}}
              onChangeText={handleOtpChange}
            />
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
              style={{width: 220, marginVertical: 15}}
              onPress={resendOtp}>
              <Text style={[styles.dontHaveAnContainer, styles.emailIdClr]}>
                <Text style={styles.signUp}>
                  {t('screens.SignUp.Resend OTP')}
                  <Text style={styles.signIn}>
                    {' '}
                    {t('screens.SignUp.Click here ?')}
                  </Text>
                </Text>
              </Text>
            </CustomButton>

            <CustomButton style={styles.L2Button} onPress={_onOTPVerify}>
              <Text style={styles.L2ButtonLbl}>
                {' '}
                {t('screens.SignUp.Submit')}
              </Text>
            </CustomButton>
            <TouchableOpacity
              onPress={() => setIsForgotOTPModalVisible(false)} >
            <Text style={[styles.dontHaveAnContainer, styles.emailIdClr]}>
                <Text style={[styles.signUp,{ textDecorationLine: 'underline',
    lineHeight:15}]}>
                  {t('screens.SignIn.Back to login')}
                </Text>
              </Text>
              </TouchableOpacity>
          </View>
        </View>
      </CustomModal>

      {/* Change Password Modal */}
      <CustomModal
        isVisible={isForgotChangeModalVisible}
        onClose={() => setIsChangeModalVisible(false)}>
        <View
          style={{
            flexDirection: 'column',
            marginHorizontal: '3%',
            marginVertical: '10%',
            borderRadius: 20,
            backgroundColor: Color.colorWhitesmoke_100,
          }}>
            {isLoading && <Loader />}
          <View
            style={{
              paddingHorizontal: 15,
              paddingVertical: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => setIsChangeModalVisible(false)}
              style={styles.headerConatiner}>
              <Image
                style={styles.backIcon}
                resizeMode="cover"
                source={require('../../assets/images/iconexlightleft-2.png')}
              />
            </TouchableOpacity>
            <View style={styles.popupLblContainer}>
              <Text style={styles.fogetPassLbl}>
                {' '}
                {t('screens.SignIn.Change Password')}
              </Text>
            </View>

            <TextInput
              value={newPassword}
              onChangeText={_onHandleNewPassWord}
              placeholder={t('screens.SignIn.New Password')}
              style={[styles.input, styles.f_p_E_input]}
              textContentType="password"
              secureTextEntry={true}
              placeholderTextColor="#888"
            />
            <TextInput
              value={confirmPassword}
              onChangeText={_onHandleConfirmPassWord}
              placeholder={t('screens.SignIn.Confirm Password')}
              style={[styles.input, styles.f_p_E_input]}
              textContentType="password"
              placeholderTextColor="#888"
            />
            {ChangeError.message ? (
              <Text style={[styles.error,ChangeError.type==='success'?{color:'green'}:null]}>{ChangeError.message}</Text>
            ) : null}
            <CustomButton style={styles.L2Button} onPress={_onChangePassword}>
              <Text style={styles.L2ButtonLbl}>
                {t('screens.SignIn.Change Password')}
              </Text>
            </CustomButton>
          </View>
        </View>
      </CustomModal>

      {isLoading && <Loader />}
    </View>
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
    width: width,
  },
  imageContainer: {
    flex: 1.8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  pldLogo1: {
    width: 168,
    height: 193,
    margin: 40,
  },

  buttonContainer: {
    width: width,
    flex: 3,
    backgroundColor: Color.colorWhitesmoke_100,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 60,
  },
  buttonSubContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,  //55,
    width: 282,
    // padding: 10,
    marginBottom: 25,
  },
  popupLblContainer: {
    width: 282,
    justifyContent: 'center',
    alignItems: 'center',
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
  dontHaveAnContainer: {
    fontSize: FontSize.size_sm,
    textAlign: 'center',
  },
  emailIdClr: {
    color: Color.colorDimgray_200,
    // textAlign: 'center',
  },
  dontHaveAn: {
    fontFamily: FontFamily.helvetica,
  },
  signUp: {
    fontWeight: '700',
    fontFamily: FontFamily.helvetica,
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
  f_p_E_input: {
    backgroundColor: Color.colorGainsboro_200, // Gray background color
    borderRadius: 10, // Border radius
    borderWidth: 1, // Border width
    borderColor: '#CCCCCC', // Border color
    fontSize: 16, // Font size
    color: Color.colorDimgray_200, // Text color
  },
  error: {
    marginTop: -10,
    color: 'red',
    marginBottom: 10,
  },
});

export default SignIn;
