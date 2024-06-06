import { Dimensions } from "react-native";

/* fonts */
export const FontFamily = {
  helvetica: "Helvetica",
  montserratMedium: "Montserrat-Medium",
  robotoLight: "Roboto-Light",
  helveticaLight: "Helvetica Light",
  robotoRegular: "Roboto-Regular",
};
/* font sizes */
export const FontSize = {
  size_3xs: 10,
  size_xs: 12,
  size_xl: 20,
  size_base: 16,
  size_mini: 15,
  size_sm: 14,
  size_xxl: 24,
};
/* Colors */
export const Color = {
  colorWhitesmoke_100: "#f9f9f9",
  colorWhitesmoke_200: "#f8f8f8",
  colorWhitesmoke_300: "rgba(249, 249, 249, 0.59)",
  colorDarkgray_100: "#9c9c9c",
  colorBlack: "#000",
  colorDimgray_100: "#666",
  colorDimgray_200: "#646464",
  colorGainsboro_100: "#e2e2e2",
  colorGainsboro_200: "#d9d9d9",
  colorGainsboro_300: "rgba(217, 217, 217, 0)",
  colorGainsboro_400: "rgba(217, 217, 217, 0.29)",
  colorGainsboro_500: "rgba(217, 217, 217, 0.71)",
  colorGray_100: "#8d8d8d",
  colorGray_200: "#828282",
  colorGray_300: "#2b2b2b",
  colorGray_400: "rgba(252, 252, 252, 0)",
  colorGray_500: "rgba(2, 2, 2, 0.3)",
  colorKhaki: "#f9dc5c",
  colorDarkred_100: "#9e0000",
  colorSilver_100: "rgba(194, 194, 194, 0)",
};
/* border radiuses */
export const Border = {
  br_11xl: 30,
  br_8xs: 5,
  br_xl: 20,
  br_3xs: 10,
  br_4xl: 23,
};

let scaleFactor = Dimensions.get("screen").scale / Dimensions.get("window").scale

export const ScaleDimention={
 height : Dimensions.get("window").height * scaleFactor,
 width : Dimensions.get("window").width * scaleFactor
}