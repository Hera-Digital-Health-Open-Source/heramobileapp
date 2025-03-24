import { SafeAreaView, View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { GlobalStyles, Spacing } from "@/assets/theme";
import { useEffect, useState } from "react";
import DateModalPicker from "@/components/DateModalPicker";
import DropDownPicker from "@/components/DropDownPicker";
import Checkbox from "@/components/CheckBox";
import Button, { ButtonStyles } from "@/components/Button";
import { router } from "expo-router";
import Child from "@/models/Child";
import Vaccine from "@/models/Vaccine";
import { useHttpClient } from "@/context/HttpClientContext";
import { useAuth } from "@/context/AuthContext";

function getVaccineId(vaccines: Vaccine[], vaccineName: string) {
  if (vaccines) {
    const [filtered] = vaccines.filter(e => e.name === vaccineName);
    return filtered.id;
  }
}

export default function ChildView({introduceText, child} : {introduceText: string, child? : Child}){
  const [childName, setChildName] = useState('');
  const [childBrithDate, setChildBirthDate] = useState<Date>(new Date());
  const [gender, setGender] = useState<string>('n/a');
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const { sendRequestFetch } = useHttpClient();
  const { session } = useAuth();
  const [takenVaccines, setTakenVaccines] = useState<string[]>([]);

  const info = !introduceText ? `Alright! Let’s fill in the details and we will assist you by adding important doctor visit dates into “My Appointments”!`: '';
  const enableActionButton = childName.length > 0 && gender.length > 0 && (gender === 'MALE' || gender == 'FEMALE');
  const title = child ? "Edit a Child" : "Add a Child";

  const addSaveChild = async () => {
    const takenVaccineIds = takenVaccines.map(v => getVaccineId(vaccines, v)!);
    let payloadData: Child;
    let method: 'PUT' | 'POST';
    let url: string;
  
    if(child){
      child!.name = childName;
      child!.date_of_birth = childBrithDate.toISOString().split('T')[0];
      child!.gender = gender === 'MALE' ? 'MALE' : 'FEMALE';
      child!.past_vaccinations = takenVaccineIds;
      url = `/children/${child!.id}/`;
      payloadData = child;
      method = 'PUT';
    } else {
      url = `/children/`;
      payloadData = {
        id: 0,
        name: childName,
        date_of_birth: childBrithDate.toISOString().split('T')[0],
        gender: gender === 'MALE' ? 'MALE' : 'FEMALE',
        past_vaccinations: takenVaccineIds,
      };
      method = 'POST';
    }
    
    await sendRequestFetch<{}>({
      url: url,
      method: method,
      headers: {
        'Accept-Language': 'en',
        'Content-Type': 'application/json',
        Authorization: 'Token ' + session,
      },
      data: payloadData,
    });
  };

  const handleAddSaveChild = async () => {
    await addSaveChild();
    router.back();
  }

  const handleTakeVaccine = (vaccine_name: string, is_taken: boolean) => {
    if(is_taken){
      setTakenVaccines([...takenVaccines, vaccine_name]);
    } else {
      setTakenVaccines(takenVaccines.filter(d => d !== vaccine_name));
    }
  }

  const prepareTakenVaccines = () => {
    if(child){
      const tmp: string[] = [];
    
      for(let vaccine of vaccines){
        if(child.past_vaccinations.filter(p => p === vaccine.id).length > 0){
          tmp.push(vaccine.name);
        }
      }
      setTakenVaccines([...takenVaccines, ...tmp]);
    }
  }

  const getVaccines = async () => {
    // setRefreshing(true);
    let result = await sendRequestFetch<Vaccine[]>({
      url: '/vaccines/',
      method: 'GET',
      headers: {
        'Accept-Language': 'en',
        Authorization: 'Token ' + session,
      },
    });

    const vaccines = result.data!;
    setVaccines(vaccines);

    // setRefreshing(false);
  };

  useEffect(() => {
    getVaccines();
  }, []);

  useEffect(() => {
    if(child){
      setChildName(child.name);
      setChildBirthDate(new Date(child.date_of_birth));
      setGender(child.gender);
      prepareTakenVaccines();
    }
  }, [child]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <View style={{gap: Spacing.large}}>
          <Text style={GlobalStyles.HeadingText}>{title}</Text>
          <Text style={GlobalStyles.NormalText}>{info}</Text>
        </View>

        <View style={{gap: Spacing.xlarge, flex: 1}}>
          <View style={{gap: Spacing.medium}}>
            <Text style={GlobalStyles.NormalText}>Child Name</Text>
            <TextInput
              style={GlobalStyles.InputBoxStyle}
              onChangeText={(t) => setChildName(t)}
              value={childName}
              placeholder="Child name"
              keyboardType="default"
            />
          </View>
          <View style={{gap: Spacing.medium}}>
            <Text style={GlobalStyles.NormalText}>Date of Birth</Text>
            <DateModalPicker initialDate={childBrithDate} onDateSelected={(date)=>setChildBirthDate(date)} />
          </View>
          <View style={{gap: Spacing.medium}}>
            <Text style={GlobalStyles.NormalText}>Gender</Text>
            <DropDownPicker 
              items={[
                {key: 'n/a', label: ''},
                {key: 'MALE', label: 'Male'},
                {key: 'FEMALE', label: 'Female'}
              ]}
              initialKeySelection={gender}
              onItemSelectionChanged={(key) => setGender(key)} 
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={GlobalStyles.NormalText}>Past Vaccinations</Text>
            <ScrollView style={{height: '100%'}}>
              {child && vaccines.map( (vaccine, index) => (
                <Checkbox
                  key={index}
                  initIsChecked={child?.past_vaccinations.filter(t => t == vaccine.id).length === 1}
                  label={vaccine.name}
                  onChange={(val) => {handleTakeVaccine(vaccine.name, val)}}
                />
              ))}
              {!child && vaccines.map( (vaccine, index) => (
                <Checkbox
                  key={index}
                  initIsChecked={false}
                  label={vaccine.name}
                  onChange={(val) => {handleTakeVaccine(vaccine.name, val)}}
                />
              ))}
            </ScrollView>
          </View>
        </View>
        <Button
          buttonType={ enableActionButton ? ButtonStyles.FILLED : ButtonStyles.DISABLED}
          label={child ? "Save" : "Add"}
          onPress={() => handleAddSaveChild()}
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