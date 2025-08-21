import { SafeAreaView, View , Text, ScrollView, StyleSheet} from "react-native";
import { GlobalStyles, Spacing } from "@/assets/theme";
import Button, { ButtonStyles } from "@/components/Button";
import { useState } from "react";
import { useRouter } from "expo-router";


export default function PregnancyYesNo(){
  const router = useRouter();
  const [isPregnant, setIsPregnant] = useState<boolean | undefined>(undefined);

  const areYouPregnant = `Are you pregnant? Our app can help you go through your pregnancy journey.`;

  const handleIsPregnant = (isPregnant: boolean) => {
    if(isPregnant){
      router.push('/registration/pregnancy-info');
    } else {
      router.push('/'); // Go to home page
    }
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        <View style={{gap: Spacing.small}}>
          <Text style={GlobalStyles.HeadingText}>Pregnancy</Text>
          <Text style={GlobalStyles.NormalText}>{areYouPregnant}</Text>
        </View>
        <View style={styles.yesNoContainer}>
          <View style={styles.yesNoButtonsContainer}>
            <Button
              style={{flex: 1}}
              buttonType={ButtonStyles.UNFILLED}
              label="Yes"
              onPress={() => handleIsPregnant(true)}
            />
            <Button
              style={{flex: 1}}
              buttonType={ButtonStyles.UNFILLED}
              label="No"
              onPress={() => handleIsPregnant(false)}
            />
          </View>
        </View> 
          {/* <Button 
            style={styles.continueButton}
            buttonType={isPregnant ? ButtonStyles.FILLED : ButtonStyles.DISABLED}
            label="Continue"
          /> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.large,
    marginTop: Spacing.xxlarge
  },
  continueButton: {
    position: 'absolute',
    bottom: 0,
    left:Spacing.large,
    right: Spacing.large
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