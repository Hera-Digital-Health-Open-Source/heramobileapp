import { StyleSheet, View, Text, Pressable, StyleProp, ViewStyle, TextStyle } from "react-native";
import { GlobalStyles } from "@/assets/theme";

export enum ButtonStyles{
  FILLED = 1,
  UNFILLED = 2,
  PLAIN = 3
}

type Props = {
  style?: StyleProp<ViewStyle>;
  buttonType?: ButtonStyles;
  label: string;
  onPress?: () => void;
}
export default function Button({style, label, buttonType, onPress}: Props){
  let buttonStyle: ViewStyle;
  let textStyle: TextStyle;

  if(buttonType == ButtonStyles.FILLED){
    buttonStyle = GlobalStyles.Button;
    textStyle = GlobalStyles.ButtonText;
  } else if(buttonType == ButtonStyles.UNFILLED){
    buttonStyle = GlobalStyles.ButtonALT;
    textStyle = GlobalStyles.ButtonTextALT;
  } else if(buttonType == ButtonStyles.PLAIN){
    buttonStyle = GlobalStyles.ButtonBasic;
    textStyle = GlobalStyles.ButtonTextALT;
  }else {
    buttonStyle = GlobalStyles.Button;
    textStyle = GlobalStyles.ButtonText;
  }

  return (
    <View style={style}>
      <Pressable onPress={onPress} style={buttonStyle}>
        <Text style={textStyle}>{label}</Text>
      </Pressable>
    </View>
  );
}