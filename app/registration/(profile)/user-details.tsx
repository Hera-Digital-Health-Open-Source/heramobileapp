import { StyleSheet, SafeAreaView, Text, TextInput, View } from "react-native";
import { GlobalStyles, Spacing } from "@/assets/theme";
import GenderSwitcher from "@/components/GenderSwitcher";
import { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Button, { ButtonStyles } from "@/components/Button";
import { router } from "expo-router";
import { useRegistration } from "@/context/RegistrationContext";
import ProfileView from "@/components/profile/ProfileView";

export default function UserDetails(){
  // const now = new Date();
  // const date18YearsAgo = new Date();
  // date18YearsAgo.setFullYear(now.getFullYear() - 18);

  // const [selectedName, setSelectedName] = useState('');
  // const [selectedDateOfBirth, setSelectedDateOfBirth] = useState(date18YearsAgo);
  // const [showDatePicker, setShowDatePicker] = useState(false);
  // const [selectedGender, setSelectedGender] = useState<'male' | 'female' | undefined>(undefined);
  // const {setGender, setName, setDateOfBirth} = useRegistration();

  // const enableContinue = selectedName.length > 0 && selectedGender !== undefined;

  // const handleContinue = () => {
  //   setGender(selectedGender);
  //   setName(selectedName);
  //   setDateOfBirth(selectedDateOfBirth);
  //   router.push('/registration/terms-of-use');
  // }

  return (
    <SafeAreaView style={{flex:1, backgroundColor: '#fff'}}>
      <ProfileView profile={undefined}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: Spacing.large,
    gap: Spacing.large,
    marginTop: Spacing.xxlarge
  }
});