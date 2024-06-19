import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import {Color, FontFamily, Border, FontSize} from '../../GlobalStyles';
import CustomInput from '../../components/commonInput';
import CustomButton from '../../components/commonButton';
import DropdownComponent from '../../components/commonDropdown';
import DatePicker from 'react-native-date-picker';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {ScaleDimention} from '../../GlobalStyles';
import {Controller, useForm} from 'react-hook-form';
import CustomActionSheet from '../../components/customActionSheet';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';

import {COUNTRY, CURRENT_USER, UPDATE_USER} from '../../services/config';
import {get, putProfileUpdate} from '../../services/api';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {formatDate, getImageFullPath, showToast} from '../../utils';
import CustomInnerInput from '../../components/commonInputInnerInput';
import Loader from '../../components/loader';
import {persistUpdateUser, updateUser} from '../../Redux/Reducers/sessionSlice';
import {setRefresh} from '../../Redux/Reducers/refresh';
import CustomPhone from '../../components/customPhone';
import CountryPicker from 'react-native-country-picker-modal'
const {height, width} = ScaleDimention;
// const countryList = [
//   {label: 'India', value: 'India'},
//   {label: 'China', value: 'China'},
//   {label: 'Nepal', value: 'Nepal'},
// ];
const customTheme = {
  ...CountryPicker.defaultProps.theme,
  fontFamily: FontFamily.helvetica, // Define your custom font family here
  primaryColor: 'red', // Define your custom primary color here
  backgroundColor: 'white', // Define your custom background color here
  onBackgroundTextColor: 'black', // Define your custom text color here
  placeholderTextColor: 'gray', // Define your custom placeholder text color here
};
const Profile = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [_openActionsheet, setOpenActionSheet] = useState(false);
  const [logo, setLogo] = useState(null);
  const {t} = useTranslation();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const session = useSelector(state => state.session);
  const config = useSelector(state => state.config.configUrls);
  const refresh = useSelector(state => state.refresh.isRefresh);
  const [fileInfo, setFileInfo] = useState(null);
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('+65');
  const [countryCodePlaceholder, setCountryCodePlaceholder] = useState(t('screens.SignUp.(+91)'));
const [countryList,setcountryList]=useState([])

  useEffect(() => {
    if (isFocused) {
      if (session.isLoggedIn && config) {
        fetchData();
      }
    }
  }, [isFocused]);


  useEffect(() => {
    if (session.isLoggedIn && config) {
      fetchCountryList();
    }
  }, []);

  const fetchCountryList = async () => {
    const _countryList = await get(
      `${config?.UrlBasePath}/${COUNTRY}`,
      // `${APP_ALBUM}/${_id}`,
      session?.user?.token,
    );
    // console.log('countryList---',_countryList)
    setcountryList(_countryList.country);
  };






  const fetchData = async () => {
    setIsLoading(true);
    const currentUser = await get(
      `${config?.UrlBasePath}/${CURRENT_USER}`,
      session?.user?.token,
    );
    setData(currentUser?.user);
    console.log('currentUser----', currentUser);
   

    setValue('firstName', currentUser?.user.Firstname, {shouldValidate: true});
    setValue('LastName', currentUser?.user.Lastname, {shouldValidate: true});
    setValue('Mobilenumber', currentUser?.user.Mobilenumber, {shouldValidate: true});

    setValue('email', currentUser?.user.email, {shouldValidate: true});
    setValue('DOB', formatDate(currentUser?.user.DOB), {shouldValidate: true});
    setValue('Country', currentUser?.user.Country, {shouldValidate: true});
    setValue('Address', currentUser?.user.Address, {shouldValidate: true});
    setValue('MailAddress', currentUser?.user.MailAddress, {
      shouldValidate: true,
    });
    setLogo(
      getImageFullPath(config.imagebasePath, currentUser?.user.ProfileImage),
    );
    setIsLoading(false);
  };

  const _onSelectPhoto = async option => {
    try {
      if (option === 1) {
        // Check camera permissions
        // const cameraPermission = await checkCameraPermission();

        // Handle camera permissions
        // if (cameraPermission === RESULTS.GRANTED) {
        // Camera permission granted, launch camera
        _onlaunchCamera(option);
        // } else {
        // Camera permission not granted, request permission
        // const result = await requestCameraPermission();
        // if (result === RESULTS.GRANTED) {
        // Camera permission granted, launch camera
        // _onlaunchCamera(option);
        // } else {
        //   // Camera permission denied, handle accordingly
        //   console.warn('Camera permission denied');
        // }
        // }
      } else if (option === 2) {
        // Check photo library permissions
        // const photoLibraryPermission = await checkPhotoLibraryPermission();

        // Handle photo library permissions
        // if (photoLibraryPermission === RESULTS.GRANTED) {
        // Photo library permission granted, launch image library
        //   _onlaunchImageLibrary(option);
        // } else {
        // Photo library permission not granted, request permission
        // const result = await requestPhotoLibraryPermission();
        // if (result === RESULTS.GRANTED) {
        // Photo library permission granted, launch image library
        _onlaunchImageLibrary(option);
        // } else {
        //   // Photo library permission denied, handle accordingly
        //   console.warn('Photo library permission denied');
        // }
        // }
      }
    } catch (error) {
      console.error('Error checking permissions:', error);
    }
  };

  const _onlaunchCamera = () => {
    // launchCamera(
    //   {mediaType: 'photo', quality: 0.6, maxWidth: 200, maxHeight: 200},
    //   response => {
    //     if (!response.didCancel && !response.error) {
    //       console.log('response camera---', response);
    //       setFileInfo(response.assets[0])
    //       setLogo({uri:response.assets[0].uri});
    //       setOpenActionSheet(false);
    //       // _onUploadFile(response.assets[0]);
    //     }
    //   },
    // );
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      if (Platform.OS === 'android') {
        setLogo({uri: image.path});
        const fileName = image?.path?.split('/').pop();
        setFileInfo({
          uri: image.path, // Use the uri from the gallery response
          fileName: fileName, // Set the file name
          type: image.mime, // Set the file type
        });
        setOpenActionSheet(false);
      } else {
        setLogo({uri: 'file://'+image.path});
        const fileName = image?.path?.split('/').pop();
        setFileInfo({
          uri: 'file://'+image.path, // Use the uri from the gallery response
          fileName: fileName, // Set the file name
          type: image.mime, // Set the file type
        });
        setOpenActionSheet(false);
      }

      console.log(image);
    });
  };

  const _onlaunchImageLibrary = () => {
    // launchImageLibrary(
    //   {mediaType: 'photo', quality: 0.6, maxWidth: 200, maxHeight: 200},
    //   response => {
    //     if (!response.didCancel && !response.error) {
    //       console.log('response gallery---', response);
    //       setLogo({uri:response.assets[0].uri});
    //       setFileInfo(response.assets[0])
    //       setOpenActionSheet(false);
    //     }
    //   },
    // );

    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      if (Platform.OS === 'android') {
        setLogo({uri: image.path});
        const fileName = image?.path?.split('/').pop();
        setFileInfo({
          uri: image.path, // Use the uri from the gallery response
          fileName: fileName, // Set the file name
          type: image.mime, // Set the file type
        });
      } else {
        setLogo({uri: image.sourceURL});
        // const fileName = image?.filename;
        const fileName = image?.path?.split('/').pop();
        setFileInfo({
          uri: 'file://'+image.path, // Use the uri from the gallery response
          fileName: fileName, // Set the file name
          type: image.mime, // Set the file type
        });
      }
      setOpenActionSheet(false);
    });
  };

  // const checkCameraPermission = async () => {
  //   return Platform.select({
  //     ios: check(PERMISSIONS.IOS.CAMERA),
  //     android: check(PERMISSIONS.ANDROID.CAMERA),
  //   });
  // };

  // const requestCameraPermission = async () => {
  //   return Platform.select({
  //     ios: request(PERMISSIONS.IOS.CAMERA),
  //     android: request(PERMISSIONS.ANDROID.CAMERA),
  //   });
  // };

  // const checkPhotoLibraryPermission = async () => {
  //   return Platform.select({
  //     ios: check(PERMISSIONS.IOS.PHOTO_LIBRARY),
  //     android: check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE),
  //   });
  // };

  // const requestPhotoLibraryPermission = async () => {
  //   return Platform.select({
  //     ios: request(PERMISSIONS.IOS.PHOTO_LIBRARY),
  //     android: request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE),
  //   });
  // };

  const _onViewActivity = async Data => {
    setIsLoading(true);
    const formData = new FormData();
    let photo = null;
    if (fileInfo) {
      photo = {
        uri: fileInfo.uri, // Use the uri from the gallery response
        name: fileInfo.fileName, // Set the file name
        type: fileInfo.type, // Set the file type
      };
     
    }
    console.log('photo--',photo)
    formData.append('ProfileImage', photo);
    formData.append('Firstname', Data.firstName);
    formData.append('Lastname', Data.LastName);
    formData.append('Mobilenumber', Data.Mobilenumber);

    // formData.append('Address', Data.Address);
    formData.append('Country', Data.Country);
    formData.append('DOB', Data.DOB);
    formData.append('MailAddress', Data.MailAddress);
    const updateProfile = await putProfileUpdate(
      `${config?.UrlBasePath}/${UPDATE_USER}`,
      session?.user?.token,
      formData,
    );
    console.log('updateProfile===', updateProfile);
    setIsLoading(false);
    dispatch(persistUpdateUser(updateProfile?.users));
    // updateUser(updateProfile?.users);
    dispatch(setRefresh(!refresh));
    showToast('success', updateProfile.message);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
    <KeyboardAvoidingView style={{flex: 1}}>
      <ScrollView
        style={styles.profile}
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}>
        <View style={styles.profileChild} />
        <View style={styles.headerConatiner}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              style={styles.backIcon}
              resizeMode="cover"
              source={require('../../assets/images/iconexfilledburger.png')}
            />
          </TouchableOpacity>
          <Text style={styles.headerLabel}>
            {' '}
            {t('screens.Profile.Profile')}
          </Text>
        </View>

        {/* profile image */}
        <View style={styles.imageContainer}>
       { logo ? <Image
            style={styles.profileItem}
            resizeMode="cover"
            source={logo}
          />:null}
          <TouchableOpacity
            onPress={() => setOpenActionSheet(true)}
            style={styles.profileInner}>
            <Image
              style={styles.iconexlightedit1Layout}
              resizeMode="cover"
              source={require('../../assets/images/iconexlightedit-1.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.labelsContainer}>
          <View
            style={{
              marginBottom: 20,
              justifyContent: 'center',
              alignItems: 'center',
              width: 282,
            }}>
            {isLoading && <Loader />}
            <Text style={styles.ryanOngTypo}>
              {data?.Firstname} {data?.Lastname}
            </Text>
            <Text style={styles.beingfguhgmailcom}>{data?.email}</Text>
          </View>

          {/* <CustomInnerInput
            style={styles.input}
            placeholder={t('screens.Profile.Email ID')}
            control={control}
            name="email"
            // rules={{required: 'Email ID is required'}}
            errors={errors}
            editable={false}
            selectTextOnFocus={false}
          /> */}

           <CustomInnerInput
                style={styles.input}
                placeholder={t('screens.Profile.First Name')}
                control={control}
                name="firstName"
                rules={{ required: t('screens.Profile.First Name is required') }}
                errors={errors}
              />
              <CustomInnerInput
                style={styles.input}
                placeholder={t('screens.Profile.Last Name')}
                control={control}
                name="LastName"
                rules={{ required: t('screens.Profile.Last Name is required') }}
                errors={errors}
              />
          <View style={{width:282}}>
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
          </View>
         

          <TouchableOpacity onPress={() => setOpen(true)}>
            <CustomInnerInput
              style={[styles.input,{zIndex:0}]}
              placeholder={t('screens.Profile.Date of birth')}
              control={control}
              name="DOB"
              rules={{required: t('screens.Profile.DOB is required')}}
              errors={errors}
              editable={false}
              selectTextOnFocus={false}
              onPressIn={() => setOpen(true)}
            />
          </TouchableOpacity>
          <Controller
            control={control}
            name="Country" // Field name for React Hook Form
            rules={{required: t('screens.Profile.Country is required')}} // Add validation rules if needed
            render={({field}) => (
              <DropdownComponent
                data={countryList}
                placeholder={t('screens.Profile.Country')}
                values={field.value}
                valueField='country_name'
                labelField='country_name'
                onSelect={field.onChange}
                type="profile"
                search={true}
                error={errors.Country}
              />
            )}
          />

          {/* <CustomInnerInput
            style={[styles.input, {paddingBottom: 5}]}
            placeholder={t('screens.Profile.Address')}
            control={control}
            name="Address"
            rules={{required: t('screens.Profile.Address is required')}}
            errors={errors}
          /> */}

          <CustomInnerInput
            style={styles.input}
            placeholder={t('screens.Profile.Address')}
            control={control}
            name="MailAddress"
            rules={{
              required: t('screens.Profile.Address is required'),
              // pattern: {
              //   value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              //   message: t('screens.SignUp.Invalid Mail address'),
              // },
            }}
            errors={errors}
          />

          <CustomButton
            style={styles.L2Button}
            onPress={handleSubmit(_onViewActivity)}>
            <Text style={styles.L2ButtonLbl}>
              {t('screens.Profile.Update')}
            </Text>
          </CustomButton>

          <CustomButton
            style={styles.ActivityButton}
            onPress={() => navigation.navigate('Activities')}>
            <Text style={styles.viewActivities}>
              {' '}
              {t('screens.Profile.View Activities')}
            </Text>
            <Image
              style={styles.chevronDownIcon}
              resizeMode="cover"
              source={require('../../assets/images/chevrondown1.png')}
            />
          </CustomButton>

          <DatePicker
            modal
            open={open}
            date={new Date()}
            mode="date"
            onConfirm={date => {
              setOpen(false);
              setDate(date);
              setValue('DOB', formatDate(date), {shouldValidate: true});
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>
        <CustomActionSheet
          visible={_openActionsheet}
          onSelect={opt => _onSelectPhoto(opt)}
          onClose={param => setOpenActionSheet(false)}
        />
        <View style={{height: 90}}></View>
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
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profile: {
    borderRadius: Border.br_11xl,
    backgroundColor: Color.colorWhitesmoke_100,
    flex: 1,
  },
  profileChild: {
    top: 8,
    left: 8,
    right: 8,
    borderRadius: Border.br_xl,
    backgroundColor: Color.colorKhaki,
    width: width - 16,
    height: 195,
    position: 'absolute',
  },

  headerConatiner: {
    flexDirection: 'row',
    marginTop: '10%',
    marginLeft: '5%',
    alignItems: 'flex-start',
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
  profileItem: {
    top: '10%',
    width: 164,
    height: 164,
    position: 'absolute',
    borderRadius: 164,
    // borderWidth:2,
    // borderColor:Color.colorWhitesmoke_200,
    backgroundColor: Color.colorGainsboro_200,
  },
  imageContainer: {
    alignItems: 'center', // Center horizontally
    justifyContent: 'center',
    marginTop: '10%',
  },

  profileInner: {
    top: 125,
    right: '-14%',
    width: 35,
    height: 35,
    position: 'relative',
    backgroundColor: Color.colorKhaki,
    borderRadius: 35,
    zIndex: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconexlightedit1Layout: {
    width: 24,
    height: 24,
  },
  input: {
    height: 55,
    width: 282,
    // padding: 10,
    marginBottom: 20,
  },
  labelsContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '34%',
    marginHorizontal: '8%',
  },

  ryanOngTypo: {
    color: Color.colorGray_300,
    fontFamily: FontFamily.helvetica,
    fontSize: FontSize.size_xl,
  },

  beingfguhgmailcom: {
    color: Color.colorGray_300,
    fontFamily: FontFamily.helvetica,
    fontSize: FontSize.size_sm,
  },

  ActivityButton: {
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    backgroundColor: Color.colorDarkred_100,
    borderRadius: Border.br_3xs,
    height: 55,
    flexDirection: 'row',
    width: 282,
    marginTop: 10,
  },

  viewActivities: {
    fontFamily: FontFamily.helvetica,
    color: Color.colorWhitesmoke_100,
    fontSize: FontSize.size_xl,
    textAlign: 'left',
    width: '85%',
  },

  chevronDownIcon: {
    height: 28,
    width: 28,
  },
  L2Button: {
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    backgroundColor: Color.colorDarkred_100,
    borderRadius: Border.br_3xs,
    height: 55,
    width: 282,
    marginTop: 10,
  },

  L2ButtonLbl: {
    fontFamily: FontFamily.helvetica,
    color: Color.colorWhitesmoke_100,
    fontSize: FontSize.size_xl,
    fontWeight: '400',
    lineHeight: 23,
  },
});

export default Profile;
