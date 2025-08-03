import { SafeAreaView, View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { GlobalStyles, Spacing } from "@/assets/theme";
import { useState } from "react";
import DateModalPicker from "@/components/DateModalPicker";
import DropDownPicker from "@/components/DropDownPicker";
import Checkbox from "@/components/CheckBox";
import Button, { ButtonStyles } from "@/components/Button";
import { router } from "expo-router";
import ChildView from "@/components/children/ChildView";

export default function ChildAdd(){
  // const [childName, setChildName] = useState('');
  // const [childBrithDate, setChildBirthDate] = useState<Date>(new Date());
  // const [gender, setGender] = useState('');

  // const info = `Alright! Let’s fill in the details and we will assist you by adding important doctor visit dates into “My Appointments”!`;
  // const enableContinue = childName.length > 0 && gender.length > 0;

  // return (
  //   <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
  //     <View style={styles.container}>
  //       <View style={{gap: Spacing.large}}>
  //         <Text style={GlobalStyles.HeadingText}>Add a Child</Text>
  //         <Text style={GlobalStyles.NormalText}>{info}</Text>
  //       </View>

  //       <View style={{gap: Spacing.xlarge, flex: 1}}>
  //         <View style={{gap: Spacing.medium}}>
  //           <Text style={GlobalStyles.NormalText}>Child Name</Text>
  //           <TextInput
  //             style={GlobalStyles.InputBoxStyle}
  //             onChangeText={(t) => setChildName(t)}
  //             value={childName}
  //             placeholder="Child name"
  //             keyboardType="default"
  //           />
  //         </View>
  //         <View style={{gap: Spacing.medium}}>
  //           <Text style={GlobalStyles.NormalText}>Date of Birth</Text>
  //           <DateModalPicker initialDate={childBrithDate} onDateSelected={(date)=>setChildBirthDate(date)} />
  //         </View>
  //         <View style={{gap: Spacing.medium}}>
  //           <Text style={GlobalStyles.NormalText}>Gender</Text>
  //           <DropDownPicker 
  //             items={[
  //               {key: 'n/a', label: ''},
  //               {key: 'male', label: 'Male'},
  //               {key: 'female', label: 'Female'}
  //             ]}
  //             initialKeySelection={'n/a'}
  //             onItemSelectionChanged={(key) => setGender(key)} 
  //           />
  //         </View>
  //         <View style={{flex: 1}}>
  //           <Text style={GlobalStyles.NormalText}>Past Vaccinations</Text>
  //           <ScrollView style={{height: '100%'}}>
  //             <Checkbox label="BCG (Bacille Calmette-Guérin)" initIsChecked={false} onChange={() => {}}/>
  //             <Checkbox label="DTP (Diphtheria, Tetanus, and Pertussis)" initIsChecked={false} onChange={() => {}}/>
  //             <Checkbox label="IPV (Inactivated Polio Vaccine)" initIsChecked={false} onChange={() => {}}/>
  //             <Checkbox label="Hib (Haemophilus influenzae type b)" initIsChecked={false} onChange={() => {}}/>
  //             <Checkbox label="Hepatitis B Vaccine" initIsChecked={false} onChange={() => {}}/>
  //           </ScrollView>
  //         </View>
  //       </View>
  //       <Button
  //         buttonType={ enableContinue ? ButtonStyles.FILLED : ButtonStyles.DISABLED}
  //         label="Continue"
  //         onPress={() => router.push('/registration/children')}
  //       /> 
  //     </View>
  //   </SafeAreaView>
  // );

  return (<ChildView introduceText="Add a child"/>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.large,
    marginTop: Spacing.xxlarge,
    gap: Spacing.xlarge,
    backgroundColor: '#fff',
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