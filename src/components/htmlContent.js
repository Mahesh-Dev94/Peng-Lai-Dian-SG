import React from 'react';
import { View } from 'react-native';
import RenderHtml from 'react-native-render-html';
import {Color, ScaleDimention } from '../GlobalStyles';

const {width} = ScaleDimention;

const HTMLContent = ({ htmlContent }) => {
  const source = {
    html: htmlContent,
  };

  return (
      <RenderHtml
        contentWidth={width}
        source={source}
        enableExperimentalMarginCollapsing={true}
        htmlParserOptions={{ decodeEntities: true }}
        baseStyle={{
          color:Color.colorDimgray_200, // Set text color based on dark mode
        }}
      />
  );
};

export default HTMLContent;