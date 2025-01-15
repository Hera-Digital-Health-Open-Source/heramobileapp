import { View, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";
import { heraIcon } from "@/assets/images/images";

export default function HomeHeraLegend(){
  return (
    <View style={styles.legendContainer}>
      <View style={styles.headerContainer}>
        <Image source={heraIcon} style={{width: 38, height: 35, marginRight: 10}} />
        <Text style={styles.headerText}>HERA</Text>
      </View>
      <Text style={styles.bodyText}>Helping individuals in Turkey navigate their journey to a healthy family!</Text>
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
