import Button, { ButtonStyles } from "@/components/Button";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { GlobalStyles, Spacing } from "@/assets/theme";
import { imgDoctorAppointmentMain, imgFamily } from "@/assets/images/images";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Linking } from "react-native";

export default function DoctorAppointment() {
  const info = `Did you know? There is a hotline with Arabic speakers to help you make free doctor's appointment in Turkey at public clinics and hospitals`;

  const openPhoneApp = () => {
    const phoneNumber = '182';
    const url = `tel:${phoneNumber}`;
  
    Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        alert("Phone calls are not supported on this device.");
      }
    })
    .catch((err) => console.error("An error occurred", err));
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        <View style={{flex:1, gap: Spacing.large}}>
          <Text style={GlobalStyles.HeadingText}>Doctor’s Appointment</Text>
          <Text style={GlobalStyles.NormalText}>{info}</Text>
          <Image source={imgDoctorAppointmentMain} style={{width: 330, height: 330, marginHorizontal: 'auto'}} />
        </View>
        <Button
            // style={{flex: 1}}
            buttonType={ButtonStyles.FILLED}
            label="Call Hotline Now"
            onPress={openPhoneApp}
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