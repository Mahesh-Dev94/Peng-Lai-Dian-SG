import * as React from 'react';
import { Avatar } from 'react-native-paper';

const AvatarComponent = ({src,size}) => (
  <Avatar.Image size={size} source={src} />
);
export default AvatarComponent