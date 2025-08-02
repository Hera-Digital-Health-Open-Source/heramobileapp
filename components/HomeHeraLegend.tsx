import { View, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";
import { heraIcon } from "@/assets/images/images";
import { useTranslation } from "@/hooks/useTranslation";
import { GlobalStyles } from "@/assets/theme";

export default function HomeHeraLegend(){
  const { t } = useTranslation();

  return (
    <View style={styles.legendContainer}>
      <View style={styles.headerContainer}>
        <Image source={heraIcon} style={{width: 38, height: 35, marginRight: 10}} />
        <Text style={styles.titleText}>{t('visit_hera_web_screen_toolbar_title')}</Text>
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
    width: '60%',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  }
});
