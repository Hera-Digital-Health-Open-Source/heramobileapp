import Button, { ButtonStyles } from "@/components/Button";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { GlobalStyles, Spacing } from "@/assets/theme";
import { imgFamily } from "@/assets/images/images";
import { Image } from "expo-image";


export default function ChildInfo() {
  const info = `Enter your child’s information and we will add their recommended vaccination dates on your calendar!`;

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        <View style={{flex:1, gap: Spacing.large}}>
          <Text style={GlobalStyles.HeadingText}>Child Info</Text>
          <Text style={GlobalStyles.NormalText}>{info}</Text>
          <Image source={imgFamily} style={{width: 330, height: 330, marginHorizontal: 'auto'}} />
        </View>
        <View style={styles.yesNoContainer}>
          <View style={styles.yesNoButtonsContainer}>
            <Button
              style={{flex: 1}}
              buttonType={ButtonStyles.UNFILLED}
              label="I'm done"
              onPress={() => {}}
            />
            <Button
              style={{flex: 1}}
              buttonType={ButtonStyles.FILLED}
              label="Add a Child"
              onPress={() => {}}
            />
          </View>
        </View> 
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
  yesNoContainer: {
    flex:1,
    justifyContent: 'center',
  },
  yesNoButtonsContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: Spacing.xlarge
  }
});