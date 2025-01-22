import { SafeAreaView, View , Text, ScrollView, StyleSheet} from "react-native";
import { GlobalStyles, Spacing } from "@/assets/theme";
import Button, { ButtonStyles } from "@/components/Button";
import { useState } from "react";

// const PregnancyInfo = ({onSelect} : {onSelect: (isByLastMenstrualDate: boolean) => void}) => {
//   const [pregnancyCalculationMethod, setPregnancyCalculationMethod] = useState<'lastMenstrualDate' | 'pregnancyWeek' | undefined>(undefined);
//   const info = `Alright! Let’s fill in the details and we will assist you by adding important doctor visit dates into “My Appointments”!`;

//   return (
//     <View style={{flex: 1, gap: Spacing.large}}>
//       <View style={{gap: Spacing.small}}>
//         <Text style={GlobalStyles.HeadingText}>Pregnancy</Text>
//         <Text style={GlobalStyles.NormalText}>{info}</Text>
//       </View>
//       <View style={{}}>
//         <View style={{}}>
//           <Button
//             buttonType={ pregnancyCalculationMethod === 'lastMenstrualDate' ? ButtonStyles.FILLED : ButtonStyles.UNFILLED}
//             label="Enter Last Menstrual Date"
//             onPress={() => setPregnancyCalculationMethod('lastMenstrualDate')}
//           />
//           <Button
//             buttonType={ pregnancyCalculationMethod === 'pregnancyWeek' ? ButtonStyles.FILLED : ButtonStyles.UNFILLED}
//             label="Enter Pregnancy Week"
//             onPress={() => setPregnancyCalculationMethod('pregnancyWeek')}
//           />
//         </View>
//       </View>
//     </View>
//   );
// }

export default function PregnancyYesNo(){
  const [isPregnant, setIsPregnant] = useState<boolean | undefined>(undefined);

  const areYouPregnant = `Are you pregnant? Our app can help you go through your pregnancy journey.`;

  const handleIsPregnant = (isPregnant: boolean) => {
    if(isPregnant){
      //redirect
    } else {
      // setIsPregnant(true);
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