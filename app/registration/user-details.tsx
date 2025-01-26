import { StyleSheet, SafeAreaView, Text, TextInput, View } from "react-native";
import { GlobalStyles, Spacing } from "@/assets/theme";
import GenderSwitcher from "@/components/GenderSwitcher";
import { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Button, { ButtonStyles } from "@/components/Button";
import { router } from "expo-router";
import { useRegistration } from "@/context/RegistrationContext";


export default function UserDetails(){
  const [selectedName, setSelectedName] = useState('');
  const [selectedDateOfBirth, setSelectedDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | undefined>(undefined);
  const {setGender, setName, setDateOfBirth} = useRegistration();

  const enableContinue = selectedName.length > 0 && selectedGender !== undefined;

  const handleContinue = () => {
    setGender(selectedGender);
    setName(selectedName);
    setDateOfBirth(selectedDateOfBirth);
    router.push('/registration/terms-of-use');
  }

  return (
    <SafeAreaView style={{flex:1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <View style={{gap: Spacing.small}}>
          <Text style={GlobalStyles.HeadingText}>Your Details</Text>
          <Text style={GlobalStyles.NormalText}>Great! Please fill up your remaining details.</Text>
        </View>
        <View style={{gap: Spacing.medium}}>
          <Text style={GlobalStyles.NormalText}>Gender</Text>
          <GenderSwitcher initialGender={undefined} onGenderChanged={(newGender) => {setSelectedGender(newGender)}} />
        </View>
        <View style={{gap: Spacing.medium}}>
          <Text style={GlobalStyles.NormalText}>Name</Text>
          <TextInput
            style={GlobalStyles.InputBoxStyle}
            onChangeText={(t) => setSelectedName(t)}
            value={selectedName}
            placeholder="Your name"
            keyboardType="default"
          />
        </View>
        <View style={{gap: Spacing.medium}}>
          <Text style={GlobalStyles.NormalText}>Date of Birth</Text>
          <TextInput
            onPress={() => setShowDatePicker((prev) => !prev)}
            style={GlobalStyles.InputBoxStyle}
            // onChangeText={(t) => setName(t)}
            value={selectedDateOfBirth.toLocaleDateString()}
            placeholder="Your birth date"
          />
        </View>
        {enableContinue 
          ? (<Button buttonType={ButtonStyles.FILLED} label="Continue" onPress={handleContinue}/>) 
          : (<Button buttonType={ButtonStyles.DISABLED} label="Continue" />) 
        }
        
        {showDatePicker && (
          <DateTimePickerModal
            isVisible={showDatePicker}
            mode="date"
            onConfirm={(date) => {setSelectedDateOfBirth(date);setShowDatePicker(false);}}
            onCancel={() => setShowDatePicker(false)}
          />
        )}
      </View>
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