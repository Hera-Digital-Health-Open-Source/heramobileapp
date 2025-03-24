import { color, Spacing } from "@/assets/theme";
import { Pressable, Text, StyleProp, ViewStyle, StyleSheet } from "react-native";

type Props = {
  label: string;
  style?: StyleProp<ViewStyle>; 
  onPress?: () => void;
}

export default function MarkAsDoneButton({style, onPress, label}: Props){
  return (
    <Pressable onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 36,
    justifyContent: 'center',
    borderColor: color.primary,
    borderWidth: 1,
    borderRadius: Spacing.medium
  },
  text: {
    fontWeight: "700",
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    color: color.primary,
  }
})