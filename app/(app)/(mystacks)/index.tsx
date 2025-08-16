import { View, StyleSheet, Alert, Linking, ScrollView } from "react-native";
import { Image } from "expo-image";
import { 
  imgHomeAppointments,
  imgHomeTranslator,
  imgHomeEmergencyCall,
  imgHomeNearbyHealthCenters,
  imgHomeChildren,
  imgHomePregnancy,
  imgHomeWhatsappHotline,
  imgHomeSrhr,
  imgHomeMain,
  imgHomeDoctorAppointment,
} from "@/assets/images/images";
import MainTile from "@/components/MainTile";
import { color } from "@/assets/theme";
import {
  keyAppointments,
  keyTranslator,
  keyEmergencyCall,
  keyHealthCenters,
  keyChildren,
  keyPregnancy,
  keyWhatsappHotline,
  keySrhr,
  doctorAppointment
} from "@/constants";
import HomeHeraLegend from "@/components/HomeHeraLegend";
import { router } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "@/hooks/useTranslation";
import numbers from "@/assets/data/phonenumbers.json";
import * as Localization from 'expo-localization';

export default function Index() {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const emergencyCall = () => {
    const locals = Localization.getLocales();
    const result = locals[0].regionCode;

    numbers.data.forEach(element => {
      if (
        element.Country.ISOCode.toLowerCase() ===
        result?.toLowerCase()
      ) {
        Linking.openURL('tel:' + element.Ambulance.All[0]);
      }
    });
  }

  const mainTiles = [
    {
      title: t('home_screen_my_appointments_title'),
      tileKey: keyAppointments,
      image: imgHomeAppointments,
      textColor: color.primary,
      backgroundColor: "#fff",
      requireSignedIn: true,
      onPressHandler: () => router.push('/appointments'),
    },
    {
      title: t('home_screen_translator_title'),
      tileKey: keyTranslator,
      image: imgHomeTranslator,
      textColor: color.primary,
      backgroundColor: "#fff",
      requireSignedIn: false,
      onPressHandler: () => router.push('/translator-screen'),
    },
    {
      title: t('home_screen_emergency_call_title'),
      tileKey: keyEmergencyCall,
      image: imgHomeEmergencyCall,
      textColor: color.red,
      backgroundColor: color.emergencyred,
      requireSignedIn: false,
      onPressHandler: () => emergencyCall(),
    },
    {
      title: t('home_screen_nearby_health_centers_title'),
      tileKey: keyHealthCenters,
      image: imgHomeNearbyHealthCenters,
      textColor: color.primary,
      backgroundColor: "#fff",
      requireSignedIn: false,
      onPressHandler: () => router.push('/near-health-centers-screen'),
    },
    {
      title: t('home_screen_my_children_title'),
      tileKey: keyChildren,
      image: imgHomeChildren,
      textColor: color.primary,
      backgroundColor: "#fff",
      requireSignedIn: true,
      onPressHandler: () => {router.push('/children')},
    },
    {
      title: t('home_screen_my_pregnancy_title'),
      tileKey: keyPregnancy,
      image: imgHomePregnancy,
      textColor: color.primary,
      backgroundColor: "#fff",
      requireSignedIn: true,
      onPressHandler: () => router.push('/pregnancy-info-screen'),
    },
    {
      title: t('home_screen_whatsapp_hotline_title'),
      tileKey: keyWhatsappHotline,
      image: imgHomeWhatsappHotline,
      textColor: color.green,
      backgroundColor: "#fff",
      requireSignedIn: false,
      onPressHandler: () => Linking.openURL(`https://wa.me/13613147388`),
    },
    {
      title: t('home_screen_shrh_title'),
      tileKey: keySrhr,
      image: imgHomeSrhr,
      textColor: color.primary,
      backgroundColor: "#fff",
      requireSignedIn: false,
      onPressHandler: () => {router.push('/srhr')},
    },
    {
      title: t('home_screen_doctor_appointment'),
      tileKey: doctorAppointment,
      image: imgHomeDoctorAppointment,
      textColor: color.primary,
      backgroundColor: "#fff",
      requireSignedIn: false,
      onPressHandler: () => {router.push('/doctor-appointment')}
    },
  ];
  return (
    <View style={{ flex: 1 }}>
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{
          alignItems: "center",
          minHeight: '100%'
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{position: 'absolute', top: 50, left: 20, zIndex: 100}}>
          <Ionicons name="menu" size={32} color="white" onPress={() => navigation.dispatch(DrawerActions.openDrawer)} />
        </View>
        <View style={{width: '100%', height: 420}}>
          <Image source={imgHomeMain} style={{width: '100%', height: '100%'}}/>
          <HomeHeraLegend />
        </View>
        <View style={styles.linesContainer}>
          <View style={styles.line}>
            {mainTiles.slice(0,3).map((item, index) => (
              <MainTile
                image={item.image}
                title={item.title} 
                tileKey={item.tileKey}
                textColor={item.textColor}
                backgroundColor={item.backgroundColor}
                requireSignedIn={item.requireSignedIn}
                key={item.tileKey}
                onPress={item.onPressHandler}/>
            ))}
          </View>
          <View style={styles.line}>
            {mainTiles.slice(3,6).map((item, index) => (
              <MainTile
                image={item.image}
                title={item.title} 
                tileKey={item.tileKey}
                textColor={item.textColor}
                backgroundColor={item.backgroundColor}
                requireSignedIn={item.requireSignedIn}
                key={item.tileKey}
                onPress={item.onPressHandler}/>
            ))}
          </View>
          <View style={styles.line}>
            {mainTiles.slice(6,9).map((item, index) => (
              <MainTile
                image={item.image}
                title={item.title} 
                tileKey={item.tileKey}
                textColor={item.textColor}
                backgroundColor={item.backgroundColor}
                requireSignedIn={item.requireSignedIn}
                key={item.tileKey}
                onPress={item.onPressHandler}/>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  linesContainer: {
    flex:1,
    top: -50,
    width: '100%',
    paddingHorizontal: 16,
    gap: 9,
  },
  line: {
    flexDirection: 'row',
    width: '100%',
    // marginVertical: 8,
    gap: 9,
  }
});
