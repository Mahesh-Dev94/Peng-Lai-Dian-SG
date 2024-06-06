import * as React from 'react';
import { Text } from 'react-native';

const HtmlText = ({htmlContent,style}) => (
	<Text style={style} dangerouslySetInnerHTML={{ __html: htmlContent }} />
);
export default HtmlText