import { StyleSheet, SafeAreaView, Text, TextInput, View } from "react-native";
import { GlobalStyles, Spacing } from "@/assets/theme";
import GenderSwitcher from "@/components/GenderSwitcher";
import { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Button, { ButtonStyles } from "@/components/Button";

export default function UserDetails(){
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        <View style={{gap: Spacing.small}}>
          <Text style={GlobalStyles.HeadingText}>Your Details</Text>
          <Text style={GlobalStyles.NormalText}>Great! Please fill up your remaining details.</Text>
        </View>
        <View style={{gap: Spacing.medium}}>
          <Text style={GlobalStyles.NormalText}>Gender</Text>
          <GenderSwitcher />
        </View>
        <View style={{gap: Spacing.medium}}>
          <Text style={GlobalStyles.NormalText}>Name</Text>
          <TextInput
            style={GlobalStyles.InputBoxStyle}
            onChangeText={(t) => setName(t)}
            value={name}
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
            value={date.toLocaleDateString()}
            placeholder="Your birth date"
          />
        </View>
        <Button buttonType={ButtonStyles.FILLED} label="Continue" />
        {showDatePicker && (
          <DateTimePickerModal
            isVisible={showDatePicker}
            mode="date"
            onConfirm={(date) => {setDate(date);setShowDatePicker(false);}}
            onCancel={() => setShowDatePicker(false)}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.large,
    gap: Spacing.large,
    marginTop: Spacing.xxlarge
  }
});