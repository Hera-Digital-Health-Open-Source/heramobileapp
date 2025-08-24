import { Colors, Spacing } from "@/assets/theme";
import { Pressable, Text, StyleProp, ViewStyle, StyleSheet, TextStyle } from "react-native";
import { GlobalStyles } from "@/assets/theme";

type Props = {
  label: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
}

export default function MarkAsDoneButton({style, textStyle, onPress, label}: Props){
  return (
    <Pressable onPress={onPress} style={[styles.button, style]}>
      <Text style={[styles.text, textStyle]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    // ...GlobalStyles.ButtonALT,
    borderColor: Colors.primary, 
    borderWidth: 1,
    height: 36,
    justifyContent: 'center',
    borderRadius: Spacing.medium,
    minWidth: 110,
  },
  text: {
    fontWeight: "700",
    textAlign: 'center',
    fontSize: Spacing.large,
    fontFamily: 'Roboto-Bold',
    color: Colors.primary,
  }
})