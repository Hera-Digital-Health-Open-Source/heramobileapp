import Button, { ButtonStyles } from "@/components/Button";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { color, GlobalStyles, Spacing } from "@/assets/theme";
import {AntDesign} from "@expo/vector-icons";
import { router } from "expo-router";

const ChildPlaceHolder = ({label}: {label: string}) => {
  return (
    <View style={styles.childPlaceHolderContainer}>
      <Text style={styles.childName}>{label}</Text>
      <AntDesign name={"caretright"} size={16} color={"#999"} />
    </View>
  );
}

export default function Children() {
  const info = `Enter your child’s information and we will add their recommended vaccination dates on your calendar!`;

  return (
    <SafeAreaView style={{flex:1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <View style={{flex:1, gap: Spacing.large}}>
          <Text style={GlobalStyles.HeadingText}>Child Info</Text>
          <Text style={GlobalStyles.NormalText}>{info}</Text>
          <ChildPlaceHolder label="Selma" />
        </View>
        <View style={styles.actionButtonsContainer}>
          <Button
            style={{flex: 1}}
            buttonType={ButtonStyles.UNFILLED}
            label="I'm done"
            onPress={() => router.replace('/')}
          />
          <Button
            style={{flex: 1}}
            buttonType={ButtonStyles.FILLED}
            label="Add a Child"
            onPress={() => {}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: Spacing.large,
    marginTop: Spacing.xxlarge,
    gap: Spacing.xxlarge,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: Spacing.xlarge
  },
  childPlaceHolderContainer: {
    height: 48,
    borderRadius: 24,
    backgroundColor: color.background,
    padding: Spacing.large,
    flexDirection: 'row',
  },
  childName: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: color.primary,
    flex: 1,
  }
});