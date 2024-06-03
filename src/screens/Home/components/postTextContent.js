
// import React,{useState} from 'react';
// import { View, StyleSheet, Image, Text, TouchableHighlight,Dimensions } from 'react-native';
// import { FontFamily, Color, FontSize} from "../../../GlobalStyles";
// import {ScaleDimention} from '../../../GlobalStyles';
// import { useTranslation } from 'react-i18next';
// import { formatDate } from '../../../utils';
// const {height, width} = ScaleDimention;
// const PostTextContent = ({description,date}) => {
// 	const { t } = useTranslation();
// 	const [expanded, setExpanded] = useState(false);

// 	const toggleExpand = () => {
// 	  setExpanded(!expanded);
// 	};
  
// 	return (
// 		<View style={styles.container}>
// 			<View  style={styles.arrangementsNeedsToContainer}>
// 				<Text
// 					style={styles.arrangementsClr}
// 					numberOfLines={expanded ? 2 : 5}
// 				>{description}</Text>
// 				<TouchableHighlight onPress={toggleExpand}><Text style={styles.seeMore}>{t('screens.Home.see more')}</Text></TouchableHighlight>
// 			</View>
// 			<View style={styles.dateContainer}>
// 				<Image
// 					style={styles.iconexlightcalendar}
// 					resizeMode="cover"
// 					source={require("../../../assets/images/iconexlightcalendar2.png")}
// 				/>
// 				<Text style={styles.text1}>
// 					{formatDate(date)}
// 					{/* 23/01/2024 */}
// 					</Text>
// 			</View>
// 		</View>
// 	);
// };

// const styles = StyleSheet.create({
// 	container: {
// 		flexDirection: 'column',
// 		marginHorizontal:20,
// 		width: width-40
// 	},
// 	arrangementsNeedsToContainer: {
// 		width: width-60,
// 		fontFamily: FontFamily.helvetica,
// 	},
// 	arrangementsClr: {
// 		color: Color.colorBlack,
// 		fontSize: FontSize.size_xs,
// 	},
// 	seeMore: {
// 		fontSize: FontSize.size_3xs,
// 		color: Color.colorDarkgray_100,
// 	},
// 	dateContainer:{
// 		flexDirection: 'row', alignItems: 'center' ,paddingVertical:5
// 	},
// 	text1: {
// 		color: Color.colorDimgray_100,
// 		fontSize: FontSize.size_xs,
// 		fontFamily: FontFamily.helvetica,
// 	},
// 	iconexlightcalendar: {
// 		height: 24,
// 		width: 24
// 	}
// });


// export default PostTextContent;


// import React, { useState } from 'react';
// import { View, StyleSheet, Image, Text, TouchableHighlight, Dimensions, TouchableOpacity } from 'react-native';
// import { FontFamily, Color, FontSize } from "../../../GlobalStyles";
// import { ScaleDimention } from '../../../GlobalStyles';
// import { useTranslation } from 'react-i18next';
// import { formatDate } from '../../../utils';
// import HTMLContent from '../../../components/htmlContent';

// const { height, width } = ScaleDimention;

// const PostTextContent = ({ description, date }) => {
//     const { t } = useTranslation();
//     const [expanded, setExpanded] = useState(false);

//     // Calculate the number of lines in the description
//     // const descriptionLines = description.length;
//     const toggleExpand = () => {
//         setExpanded(!expanded);
//     };

//     return (
//         <View style={styles.container}>
//             <View style={styles.arrangementsNeedsToContainer}>
//                 {/* <Text
//                     style={styles.arrangementsClr}
//                     numberOfLines={expanded ? undefined : 2} // Expand to all lines if expanded, otherwise show 2 lines
//                 >{description}</Text> */}
//                   <HTMLContent htmlContent={expanded
//                   ? description
//                   : description.substring(0, 300)} />
//                 {/* Conditionally render "See more" based on the number of lines */}
//                 {description.length > 300 && (
//                     <TouchableOpacity onPress={toggleExpand}>
//                         <Text style={styles.seeMore}>
//                             {expanded ? t('screens.Home.see less') : t('screens.Home.see more')}
//                         </Text>
//                     </TouchableOpacity>
//                 )}
//             </View>
//             <View style={styles.dateContainer}>
//                 <Image
//                     style={styles.iconexlightcalendar}
//                     resizeMode="cover"
//                     source={require("../../../assets/images/iconexlightcalendar2.png")}
//                 />
//                 <Text style={styles.text1}>
//                     {formatDate(date)}
//                 </Text>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'column',
//         marginHorizontal: 20,
//         width: width - 40
//     },
//     arrangementsNeedsToContainer: {
//         width: width - 60,
//         fontFamily: FontFamily.helvetica,
//     },
//     arrangementsClr: {
//         color: Color.colorBlack,
//         fontSize: FontSize.size_xs,
//     },
//     seeMore: {
//         fontSize: FontSize.size_3xs,
//         color: Color.colorDarkgray_100,
//     },
//     dateContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingVertical: 5
//     },
//     text1: {
//         color: Color.colorDimgray_100,
//         fontSize: FontSize.size_xs,
//         fontFamily: FontFamily.helvetica,
//     },
//     iconexlightcalendar: {
//         height: 24,
//         width: 24
//     }
// });

// export default PostTextContent;




import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { FontFamily, Color, FontSize } from "../../../GlobalStyles";
import { ScaleDimention } from '../../../GlobalStyles';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../../../utils';
import HTMLContent from '../../../components/htmlContent';

const { width } = ScaleDimention;

const PostTextContent = ({ description, date }) => {
    const { t } = useTranslation();
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <View style={styles.container}>
            <View style={styles.descriptionContainer}>
                <HTMLContent htmlContent={expanded ? description : description.substring(0, 300)+( description.length > 300?'...':'')} />
                {/* Conditionally render "See more" based on the number of lines */}
                {description.length > 300 && (
                    <TouchableOpacity onPress={toggleExpand}>
                        <Text style={styles.seeMore}>
                            {expanded ? t('screens.Home.see less') : t('screens.Home.see more')}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.dateContainer}>
                <Image
                    style={styles.iconexlightcalendar}
                    resizeMode="cover"
                    source={require("../../../assets/images/iconexlightcalendar2.png")}
                />
                <Text style={styles.text1}>
                    {formatDate(date)}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        width: width - 40
    },
    descriptionContainer: {
        width: '100%',
        fontFamily: FontFamily.helvetica,
    },
    seeMore: {
        fontSize: FontSize.size_3xs,
        color: Color.colorDarkgray_100,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5
    },
    text1: {
        color: Color.colorDimgray_100,
        fontSize: FontSize.size_xs,
        fontFamily: FontFamily.helvetica,
    },
    iconexlightcalendar: {
        height: 24,
        width: 24
    }
});

export default PostTextContent;
