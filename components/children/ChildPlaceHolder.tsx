import { Colors, Spacing } from "@/assets/theme";
import Child from "@/interfaces/IChild";
import { AntDesign } from "@expo/vector-icons";
import { View, StyleSheet, Text, StyleProp, ViewStyle, Pressable } from "react-native";

type Props = {
  child: Child;
  style: StyleProp<ViewStyle>;
  onPress: (childId: number) => void;
}

export default function ChildPlaceHolder ({child, style, onPress}: Props) {
  return (
    <Pressable onPress={() => onPress(child.id)}>
      <View style={[styles.childPlaceHolderContainer, style]}>
        <Text style={styles.childName}>{child.name}</Text>
        <AntDesign name={"caretright"} size={16} color={"#999"} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  childPlaceHolderContainer: {
    borderRadius: 24,
    backgroundColor: Colors.background,
    padding: Spacing.large,
    flexDirection: 'row',
    alignItems: 'center'
  },
  childName: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: Colors.primary,
    flex: 1,
  }
});