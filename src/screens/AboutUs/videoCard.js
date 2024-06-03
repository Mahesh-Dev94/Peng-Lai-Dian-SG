import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import {FontFamily, ScaleDimention} from '../../GlobalStyles';
import {Text} from 'react-native-paper';
import YoutubePlayer from "react-native-youtube-iframe";

const {height, width} = ScaleDimention;

const VideoCard = ({videoUrl,title}) => {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);
  const videoId = videoUrl.match(/[?&]v=([^&]+)/)[1];
  return (
    <View style={styles.container}>

     <YoutubePlayer
        height={'100%'}
        width={'100%'}
        play={playing}
        videoId={videoId}
        onChangeState={onStateChange}
        webViewStyle={{borderRadius:20}}
      />

      <View style={styles.textContainer}>
        <Text style={styles.textLbl}>
          {title}
          </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    width: width - 50,
    height: 203,
    borderRadius: 10,
    // overflow: 'hidden', // Prevent video stretching
  },
  video: {
    width: '100%',
    height: '100%',
	borderRadius: 10,
  },
  playContainer: {
    position: 'absolute',
    zIndex: 999,
    top: '50%',
    left: '50%',
    transform: [{translateX: -25}, {translateY: -25}],
    width: 51,
    height: 53,
    borderRadius: 50,
    backgroundColor: '#17171788',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: 23,
    height: 30,
  },
  textContainer: {
    position: 'absolute',
    bottom: -15,
    width: '90%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    elevation: 4,
    shadowOpacity: 1,
    borderRadius: 10,
    // Semi-transparent background
  },
  textLbl:{
	fontFamily:FontFamily.helvetica,
	fontSize:12,
	fontWeight:'400',
	lineHeight:14
  }
});

export default VideoCard;
