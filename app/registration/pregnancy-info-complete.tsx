import Button, { ButtonStyles } from "@/components/Button";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { GlobalStyles, Spacing } from "@/assets/theme";
import { imgPregnancyInfoComplete } from "@/assets/images/images";
import { Image } from "expo-image";


export default function PregnancyInfoComplete() {
  const info = `During your pregnancy, it is important to visit your doctor at least 4 times. Your appointment dates have been added in “My Appointments”!`;

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        <View style={{flex:1, gap: Spacing.large}}>
          <Text style={GlobalStyles.HeadingText}>Pregnancy</Text>
          <Text style={GlobalStyles.NormalText}>{info}</Text>
          <Image source={imgPregnancyInfoComplete} style={{width: 278, height: 400, marginHorizontal: 'auto'}} />
        </View>
        <Button
          style={styles.continueButton}
          label="Proceed to Next Step"
          buttonType={ButtonStyles.FILLED}
          onPress={() => {}}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.large,
    marginTop: Spacing.xxlarge,
    gap: Spacing.xxlarge,
  },
  continueButton: {
    position: 'absolute',
    bottom: 0,
    left:Spacing.large,
    right: Spacing.large
  },
});