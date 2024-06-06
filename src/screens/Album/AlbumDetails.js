import React, {useEffect, useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {
  FontFamily,
  Color,
  FontSize,
  Border,
  ScaleDimention,
} from '../../GlobalStyles';
import Banner from './components/banner';
import ImageLayoutMore from '../Home/components/imageLayoutMore';
import CustomModal from '../../components/customModal';
import ImageView from 'react-native-image-viewing';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {get} from '../../services/api';
import {useSelector} from 'react-redux';
import {APP_ALBUM} from '../../services/config';
import Loader from '../../components/loader';
import ImageLayout2 from '../Home/components/imageLayout2';
import ImageLayout1 from '../Home/components/imageLayout1';
import HTMLContent from '../../components/htmlContent';
import ImageLayoutThree from '../Home/components/imageLayout3';
import ImageLayoutTwoAboveOne from '../Home/components/imageLayout3';
import ImageLayout4 from '../Home/components/imageLayout4';
const {height, width} = ScaleDimention;
// export const images = [
//   require('../../assets/images/rectangle-1121.png'),

//   require('../../assets/images/rectangle-101.png'),

//   require('../../assets/images/rectangle-1011.png'),

//   require('../../assets/images/rectangle-101.png'),

//   require('../../assets/images/rectangle-1012.png'),
// ];
const AlbumsDetails = () => {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const {t} = useTranslation();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const session = useSelector(state => state.session);
  const config = useSelector(state => state.config.configUrls);
  const [images, setimages] = useState([]);
  const route = useRoute();
  const {_id} = route.params;
  useEffect(() => {
    if (session.isLoggedIn) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const AlbumsDetails = await get(
      `${config?.UrlBasePath}/${APP_ALBUM}/${_id}`,
      // `${APP_ALBUM}/${_id}`,
      session?.user?.token,
    );
    setData(AlbumsDetails.Albums);
    console.log('banner-----', AlbumsDetails.Albums.bannerimages);
    setIsLoading(false);
  };

  const appendBaseUrlToImages = async (imagesArray, baseUrl) => {
    return imagesArray.map(imageName => {
      return {uri: `${baseUrl}/${imageName}`}; // Append base URL to the URI
    });
  };

  _openImageViewer = async imgs => {
    const imageList = await appendBaseUrlToImages(imgs, config?.imagebasePath);
    setimages(imageList);
    setIsVisible(true);
  };

  console.log('data?.albumimages.length--', data?.albumimages.length);

  return (
    <SafeAreaView style={{flex: 1, width: width}}>
      <ScrollView
        style={{flex: 1, width: width}}
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.headerConatiner}>
            <Image
              style={styles.backIcon}
              resizeMode="cover"
              source={require('../../assets/images/iconexlightleft-2.png')}
            />
            <Text style={styles.events1}>{data?.title}</Text>
          </TouchableOpacity>
          {isLoading ? (
            <Loader />
          ) : (
            <View style={{width: width, marginTop: 15}}>
              <Banner banner={data?.bannerimages} />
              <View style={styles.contentContainer}>
                <Text style={styles.title}>{data?.title}</Text>
                {/* <Text style={styles.description}>{data?.description}</Text> */}
                {data?.description ? (
                  <HTMLContent htmlContent={data?.description} />
                ) : null}
              </View>
              {data?.albumimages.length >= 5 && (
                <ImageLayoutMore
                  images={data?.albumimages}
                  imagePath={config?.imagebasePath}
                  onPress={() => _openImageViewer(data?.albumimages)}
                />
              )}

              {data?.albumimages.length === 4 && (
                <ImageLayout4
                  images={data?.albumimages}
                  imagePath={config?.imagebasePath}
                  onPress={() => _openImageViewer(data?.albumimages)}
                />
              )}

              {data?.albumimages.length === 3 && (
                <ImageLayoutTwoAboveOne
                  images={data?.albumimages}
                  imagePath={config?.imagebasePath}
                  onPress={() => _openImageViewer(data?.albumimages)}
                />
              )}

              {data?.albumimages.length === 2 && (
                <ImageLayout2
                  images={data?.albumimages}
                  imagePath={config?.imagebasePath}
                  onPress={() => _openImageViewer(data?.albumimages)}
                />
              )}
              {data?.albumimages.length === 1 && (
                <ImageLayout1
                  images={data?.albumimages}
                  imagePath={config?.imagebasePath}
                  onPress={() => _openImageViewer(data?.albumimages)}
                />
              )}
            </View>
          )}
          {/* Image view modal */}

          <ImageView
            images={images}
            imageIndex={0}
            visible={isVisible}
            keyExtractor={(imageSrc, index) => imageSrc + index}
            onRequestClose={() => setIsVisible(false)}
          />
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
    paddingBottom:10
  },
  headerConatiner: {
    flexDirection: 'row',
    marginTop: '5%',
    marginLeft: '5%',
    alignItems: 'flex-start',
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
  title: {
    fontFamily: FontFamily.helvetica,
    fontSize: FontSize.size_xl,
    lineHeight: 23,
    fontWeight: '400',
    alignSelf: 'flex-start',
    color: Color.colorGray_300,
    marginVertical: 10,
    paddingTop: 10,
  },
  description: {
    fontFamily: FontFamily.helvetica,
    fontSize: FontSize.size_xs,
    lineHeight: 14,
    fontWeight: '400',
    color: Color.colorGray_300,
  },
});

export default AlbumsDetails;
