import Button, { ButtonStyles } from "@/components/Button";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { GlobalStyles, Spacing } from "@/assets/theme";
import { imgPregnancyInfoComplete } from "@/assets/images/images";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useTranslation } from "@/hooks/useTranslation";

export default function PregnancyInfoComplete() {
  const router = useRouter();
  const { t } = useTranslation();

  const info = `${t('your_pregnancy_screen_description_3')} ${t('your_pregnancy_screen_description_4')}`;
  
  return (
    <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        <View style={{flex:1, gap: Spacing.large}}>
          <Text style={GlobalStyles.HeadingText}>{t('your_pregnancy_screen_toolbar_title')}</Text>
          <Text style={GlobalStyles.NormalText}>{info}</Text>
          <Image source={imgPregnancyInfoComplete} style={{width: 278, height: 400, marginHorizontal: 'auto'}} />
        </View>
        <Button
          style={styles.continueButton}
          label={t('your_pregnancy_screen_proceed_button')}
          buttonType={ButtonStyles.FILLED}
          onPress={() => router.replace('/registration/child-info')}
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