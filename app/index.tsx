import { FlatList, Text, View, StyleSheet } from "react-native";
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
  keySrhr
} from "@/constants";

export default function Index() {
  const mainTiles = [
    {title: "My Appointments", tileKey: keyAppointments, image: imgHomeAppointments, textColor: color.primary, backgroundColor: "#fff", requireSignedIn: true},
    {title: "My Translator", tileKey: keyTranslator, image: imgHomeTranslator, textColor: color.primary, backgroundColor: "#fff", requireSignedIn: false},
    {title: "Emergency Call", tileKey: keyEmergencyCall, image: imgHomeEmergencyCall, textColor: color.red, backgroundColor: color.emergencyred, requireSignedIn: false},
    {title: "Nearby Health Centers", tileKey: keyHealthCenters, image: imgHomeNearbyHealthCenters, textColor: color.primary, backgroundColor: "#fff", requireSignedIn: false},
    {title: "My Children", tileKey: keyChildren, image: imgHomeChildren, textColor: color.primary, backgroundColor: "#fff", requireSignedIn: true},
    {title: "My Pregnancy", tileKey: keyPregnancy, image: imgHomePregnancy, textColor: color.primary, backgroundColor: "#fff", requireSignedIn: true},
    {title: "Free Advice Online", tileKey: keyWhatsappHotline, image: imgHomeWhatsappHotline, textColor: color.green, backgroundColor: "#fff", requireSignedIn: false},
    {title: "Sexual Reproductive Health", tileKey: keySrhr, image: imgHomeSrhr, textColor: color.primary, backgroundColor: "#fff", requireSignedIn: false},
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
      <View style={{width: '100%', height: 420}}>
        <Image source={imgHomeMain} style={{width: '100%', height: '100%'}}/>
        <Text style={{position: 'absolute', top: 30, left:30, fontSize: 45, fontFamily: 'Roboto-Medium', color:'#fff' }}>HERA</Text>
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
              key={item.tileKey}/>
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
              key={item.tileKey}/>
          ))}
        </View>
        <View style={styles.line}>
          {mainTiles.slice(6,8).map((item, index) => (
            <MainTile
              image={item.image}
              title={item.title} 
              tileKey={item.tileKey}
              textColor={item.textColor}
              backgroundColor={item.backgroundColor}
              requireSignedIn={item.requireSignedIn}
              key={item.tileKey}/>
          ))}
        </View>
      </View>
    </View>
  );
}

{/* <FlatList
        numColumns={3}
        style={{width: '100%', padding: 16, top:-50, height: 300, backgroundColor: '#aaa'}}
        data={mainTiles}
        renderItem={({item, index}) => (
          <MainTile
            image={item.image}
            title={item.title} 
            tileKey={item.tileKey}
            textColor={item.textColor}
            backgroundColor={item.backgroundColor}
            requireSignedIn={item.requireSignedIn}
            key={item.tileKey}/>
        )} 
      /> */}

const styles = StyleSheet.create({
  linesContainer: {
    flex:1,
    top: -50,
  },
  line: {
    flexDirection: 'row',
    width: '100%',
  }
});
