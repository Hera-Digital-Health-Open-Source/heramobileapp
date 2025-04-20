import { View, StyleSheet } from "react-native";
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
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";


export default function Index() {
  // const {signOut} = useAuth();
  const navigation = useNavigation();

  const mainTiles = [
    {
      title: "My Appointments",
      tileKey: keyAppointments,
      image: imgHomeAppointments,
      textColor: color.primary,
      backgroundColor: "#fff",
      requireSignedIn: true,
      onPressHandler: () => router.push('/appointments'),
    },
    {
      title: "My Translator",
      tileKey: keyTranslator,
      image: imgHomeTranslator,
      textColor: color.primary,
      backgroundColor: "#fff",
      requireSignedIn: false,
      onPressHandler: () => router.push('/translator-screen'),
    },
    {
      title: "Emergency Call",
      tileKey: keyEmergencyCall,
      image: imgHomeEmergencyCall,
      textColor: color.red,
      backgroundColor: color.emergencyred,
      requireSignedIn: false,
      onPressHandler: () => {},
    },
    {
      title: "Nearby Health Centers",
      tileKey: keyHealthCenters,
      image: imgHomeNearbyHealthCenters,
      textColor: color.primary,
      backgroundColor: "#fff",
      requireSignedIn: false,
      onPressHandler: () => {},
    },
    {
      title: "My Children",
      tileKey: keyChildren,
      image: imgHomeChildren,
      textColor: color.primary,
      backgroundColor: "#fff",
      requireSignedIn: true,
      onPressHandler: () => {router.push('/children')},
    },
    {
      title: "My Pregnancy",
      tileKey: keyPregnancy,
      image: imgHomePregnancy,
      textColor: color.primary,
      backgroundColor: "#fff",
      requireSignedIn: true,
      onPressHandler: () => {},
    },
    {
      title: "Free Advice Online",
      tileKey: keyWhatsappHotline,
      image: imgHomeWhatsappHotline,
      textColor: color.green,
      backgroundColor: "#fff",
      requireSignedIn: false,
      onPressHandler: () => {},
    },
    {
      title: "Sexual Reproductive Health",
      tileKey: keySrhr,
      image: imgHomeSrhr,
      textColor: color.primary,
      backgroundColor: "#fff",
      requireSignedIn: false,
      onPressHandler: () => {router.push('/srhr')},
    },
    {
      title: "Make Doctor's Appointment",
      tileKey: doctorAppointment,
      image: imgHomeDoctorAppointment,
      textColor: color.primary,
      backgroundColor: "#fff",
      requireSignedIn: false,
      onPressHandler: () => {router.push('/doctor-appointment')}
    },
  ];
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: '#541'
      }}
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
