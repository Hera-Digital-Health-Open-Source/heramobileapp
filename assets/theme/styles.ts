// import {StyleSheet, TextStyle, I18nManager} from 'react-native';
import { StyleSheet } from "react-native";

export const Spacing = {
  small: 4,
  medium: 8,
  large: 16,
  xlarge: 24,
  xxlarge: 32,
};

// export const fontSize = {
//   small: 10,
//   medium: 12,
//   large: 14,
//   extra: 16,
// };

export const color = {
  primary: '#68207E',
  background: '#F2F2F2',
  white: '#FFFFFF',
  black: '#000000',
  hint: '#7E7E7E',
  toolbartext: '#191919',
  disabled: '#C6C6C6',
  disabledtext: '#727172',
  red: '#FF4646',
  emergencyred: '#F1C2C2',
  blue: '#C0DCFF',
  green: '#0B8D3C',
  whatsappgreen: '#D5FEE4',
  purple: '#800080',
};

const InputBoxStyle = {
  height: 48,
  paddingHorizontal: 10,
  paddingVertical: 11,
  borderRadius: 10,
  borderColor: '#eee',
  borderWidth: 1,
  alignItems: 'center' as 'center', // Explicitly specify the type (not as a string)
}

const ButtonBasic = {
  height: 48,
  justifyContent: 'center' as 'center',
  marginVertical: 8,
}

const Button = {
  ...ButtonBasic,
  borderRadius: 24,
  backgroundColor: color.primary,
  shadowColor: color.black,
  shadowOpacity: 0.2,
  elevation: 6,
  shadowOffset: {
    height: 1,
    width: 1,
  },
};

const ButtonALT = {
  ...Button,
  backgroundColor: color.white,
};

const ButtonDisabled = {
  ...Button,
  backgroundColor: color.disabled,
  fontFamily: 'Roboto-Bold',
};



const ButtonTextBasic = {
  fontWeight: "700" as "700",
  textAlign: 'center' as 'center',
  fontSize: 20,
  fontFamily: 'Roboto-Bold',
}

const ButtonText = {
  ...ButtonTextBasic,
  color: color.white,
};

const ButtonTextALT = {
  ...ButtonText,
  color: color.primary,
};

const ButtonTextDisabled = {
  ...ButtonText,
  color: color.disabledtext,
  fontFamily: 'Roboto-Bold',
};

const NormalText = {
  fontFamily: 'Roboto-Medium',
  fontSize: 18,
  color: color.black,
}

const SubHeadingText = {
  ...NormalText,
  fontFamily: 'Roboto-ExtraBold',
  fontSize: 24,
  color: color.primary,
}

const HeadingText = {
  ...NormalText,
  fontFamily: 'Roboto-Black',
  fontSize: 32,
  color: color.primary,
}


const WhiteContainerNoHorizontalPadding = {
  backgroundColor: color.white,
  flex: 1,
};

const WhiteContainer = {
  backgroundColor: color.white,
  flex: 1,
  paddingHorizontal: 16,
};

export const GlobalStyles = StyleSheet.create({
  InputBoxStyle,
  Button,
  ButtonALT,
  ButtonText,
  ButtonTextALT,
  ButtonBasic,
  ButtonDisabled,
  ButtonTextDisabled,
  NormalText,
  HeadingText,
  SubHeadingText,
  WhiteContainerNoHorizontalPadding,
  WhiteContainer,
  ButtonTextBasic,
  // Spacing,
});

// const FULL = {
//   flex: 1,
//   backgroundColor: color.backgroundColor,
// };

// const SAFE_AREA_VIEW = {
//   backgroundColor: color.white,
// };

// const SPLASH_CONTAINER = {
//   backgroundColor: color.background,
//   justifyContent: 'center',
//   alignItems: 'center',
//   flex: 1,
// };

// const LOGIN_CONTAINER = {
//   backgroundColor: color.background,
//   flex: 1,
//   padding: 30,
//   justifyContent: 'center',
// };

// const CONTAINER = {
//   backgroundColor: color.background,
//   flex: 1,
//   paddingHorizontal: 16,
//   paddingVertical: 32,
// };




// const HOME_CONTAINER = {
//   backgroundColor: color.background,
//   flex: 1,
//   paddingHorizontal: 16,
//   paddingTop: 16,
// };

// const WEBVIEW_CONTAINER = {
//   backgroundColor: color.background,
//   flex: 1,
// };

// const CONTAINER_NO_HORIZONTAL_PADDING = {
//   backgroundColor: color.background,
//   flex: 1,
//   paddingVertical: 32,
// };

// const CONTAINER_NO_PADDING = {
//   backgroundColor: color.background,
//   flex: 1,
// };

// const NOPADMARGIN = {
//   margin: 0,
//   paddingHorizontal: 0,
//   paddingVertical: 0,
//   color: color.black,
//   fontFamily: 'Roboto-Regular',
// };










// const TOOLBAR = {
//   padding: 16,
//   backgroundColor: color.white,
// };

// const TOOLBAR_TEXT = {
//   marginTop: 16,
//   textAlign: 'left',
//   color: color.toolbartext,
//   fontSize: 24,
//   fontWeight: '700',
//   fontFamily: 'Roboto-Bold',
// };

// const HOME_TOOLBAR = {
//   paddingHorizontal: 12,
//   paddingVertical: 16,
//   backgroundColor: color.white,
// };

// const TEXT = {
//   textAlign: 'left',
//   color: color.black,
//   fontSize: 16,
//   fontFamily: 'Roboto-Regular',
// };

// const ERROR_STYLE: TextStyle = {
//   fontSize: fontSize.medium,
//   color: color.red,
//   fontFamily: 'Roboto-Bold',
// };

// const ERROR_PLACEHOLDER: TextStyle = {
//   ...ERROR_STYLE,
//   borderWidth: 0,
//   height: 32,
//   fontFamily: 'Roboto-Regular',
// };

// const RTL = {
//   transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
// };

// const LOADING = {
//   width: 100,
//   height: 100,
//   borderRadius: 20,
// };

// const MODAL_TEXT = {
//   marginBottom: 15,
//   textAlign: 'center',
// };

// const CENTERED_VIEW = {
//   flex: 1,
//   justifyContent: 'center',
//   alignItems: 'center',
//   marginTop: 22,
// };

// const MODAL_VIEW = {
//   margin: 20,
//   backgroundColor: '#FFD480',
//   borderRadius: 20,
//   padding: 30,
//   paddingBottom: 15,
//   alignItems: 'center',
//   shadowColor: '#000',
//   shadowOffset: {
//     width: 0,
//     height: 2,
//   },
//   shadowOpacity: 0.25,
//   shadowRadius: 4,
//   elevation: 5,
// };

// export const styles = StyleSheet.create({
//   FULL,
//   SAFE_AREA_VIEW,
//   SPLASH_CONTAINER,
//   LOGIN_CONTAINER,
//   CONTAINER,
//   NOPADMARGIN,
//   BUTTON,
//   BUTTON_TEXT,
//   BUTTON_ALT,
//   BUTTON_TEXT_ALT,
//   TOOLBAR,
//   TOOLBAR_TEXT,
//   TEXT,
//   BUTTON_DISABLED,
//   BUTTON_TEXT_DISABLED,
//   ERROR_STYLE,
//   ERROR_PLACEHOLDER,
//   CONTAINER_NO_HORIZONTAL_PADDING,
//   CONTAINER_NO_PADDING,
//   HOME_CONTAINER,
//   WHITE_CONTAINER,
//   WHITE_CONTAINER_NO_HORIZONTAL_PADDING,
//   HOME_TOOLBAR,
//   WEBVIEW_CONTAINER,
//   RTL,
//   LOADING,
//   CENTERED_VIEW,
//   MODAL_VIEW,
//   MODAL_TEXT,
// });
