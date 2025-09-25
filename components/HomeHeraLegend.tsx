import { View, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";
import { heraIcon } from "@/assets/images/images";
import { useTranslation } from "@/hooks/useTranslation";
import { GlobalStyles, Spacing } from "@/assets/theme";

export default function HomeHeraLegend(){
  const { t, locale } = useTranslation();

  return (
    <View style={[styles.legendContainer, locale === 'tr' ? {width: '72%'} : {}]}>
      <View style={styles.headerContainer}>
        <Image source={heraIcon} style={{width: 38, height: 35, marginRight: 10}} />
        <Text style={styles.titleText}>{t('hera_official_name')}</Text>
      </View>
      <Text style={styles.headerText}>{t('home_screen_legend')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  legendContainer: {
    position: 'absolute',
    top: 100,
    left: 16,
    width: '63%',
    borderRadius: Spacing.small,
    padding: Spacing.large,
    backgroundColor: 'rgba(0, 0, 0, 0.3)' // Semi-transparent black overlay
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.medium
  },
  titleText: {
    ...GlobalStyles.TitleText,
    color: '#fff'
  },
  headerText: {
    fontSize: 28,
    fontFamily: 'Robot-Medium',
    color: '#fff',
    marginTop: 8,
    textAlign: 'left',
    // writingDirection: 'rtl'
  }
});
