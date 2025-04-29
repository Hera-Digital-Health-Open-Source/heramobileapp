import { View, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";
import { heraIcon } from "@/assets/images/images";
import { useTranslation } from "@/hooks/useTranslation";

export default function HomeHeraLegend(){
  const { t } = useTranslation();

  return (
    <View style={styles.legendContainer}>
      <View style={styles.headerContainer}>
        <Image source={heraIcon} style={{width: 38, height: 35, marginRight: 10}} />
        <Text style={styles.headerText}>{t('visit_hera_web_screen_toolbar_title')}</Text>
      </View>
      <Text style={styles.bodyText}>{t('home_screen_legend')}</Text>
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
  headerText: {
    fontSize: 45,
    fontFamily: 'Roboto-Medium',
    color: '#fff',
  },
  bodyText: {
    fontSize: 26,
    fontFamily: 'Robot-Medium',
    color: '#fff',
    marginTop: 8,
  }
});
