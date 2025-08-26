import Button, { ButtonStyles } from "@/components/Button";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { GlobalStyles, Spacing } from "@/assets/theme";
import { imgFamily } from "@/assets/images/images";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useTranslation } from "@/hooks/useTranslation";

export default function ChildInfo() {
  const { t } = useTranslation();
  const router = useRouter();

  const info = t('children_info_screen_description');

  return (
    <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>
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
              label={t('children_info_screen_done_button')}
              onPress={() => router.replace('/')}
            />
            <Button
              style={{flex: 1}}
              buttonType={ButtonStyles.FILLED}
              label={t('children_info_screen_add_a_child_button')}
              onPress={() => router.push('/registration/child-add')}
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