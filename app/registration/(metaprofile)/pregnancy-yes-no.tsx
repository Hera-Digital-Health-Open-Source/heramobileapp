import { SafeAreaView, View , Text, ScrollView, StyleSheet} from "react-native";
import { GlobalStyles, Spacing } from "@/assets/theme";
import Button, { ButtonStyles } from "@/components/Button";
import { useTranslation } from "@/hooks/useTranslation";
import { useRouter } from "expo-router";
import { useProfileStore } from "@/store/profileStore";

export default function PregnancyYesNo(){
  const router = useRouter();
  const { t } = useTranslation();
  const { userProfile } = useProfileStore();

  const pregnancyInfo = (
    userProfile?.gender === 'MALE' 
      ? t('your_pregnancy_screen_question_text_male') 
      : t('your_pregnancy_screen_question_text_female')
    ) + " " + t('your_pregnancy_our_app_can_help')

  const handleIsPregnant = (isPregnant: boolean) => {
    if(isPregnant){
      router.push('/registration/pregnancy-info');
    } else {
      router.push('/'); // Go to home page
    }
  }

  return (
    <SafeAreaView style={{flex:1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <View style={{gap: Spacing.small}}>
          <Text style={GlobalStyles.HeadingText}>{t('your_pregnancy_screen_toolbar_title')}</Text>
          <Text style={GlobalStyles.NormalText}>{pregnancyInfo}</Text>
        </View>
        <View style={styles.yesNoContainer}>
          <View style={styles.yesNoButtonsContainer}>
            <Button
              style={{flex: 1}}
              buttonType={ButtonStyles.UNFILLED}
              label={t('your_pregnancy_screen_answer_yes_button')}
              onPress={() => handleIsPregnant(true)}
            />
            <Button
              style={{flex: 1}}
              buttonType={ButtonStyles.UNFILLED}
              label={t('your_pregnancy_screen_answer_no_button')}
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
    // marginTop: Spacing.xxlarge
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