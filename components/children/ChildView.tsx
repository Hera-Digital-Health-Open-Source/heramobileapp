import { SafeAreaView, View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { GlobalStyles, Spacing } from "@/assets/theme";
import { useEffect, useState } from "react";
import DateModalPicker from "@/components/DateModalPicker";
import DropDownPicker from "@/components/DropDownPicker";
import Checkbox from "@/components/CheckBox";
import Button, { ButtonStyles } from "@/components/Button";
import { useRouter } from "expo-router";
import Child from "@/models/Child";
import Vaccine from "@/models/Vaccine";
import { useHttpClient } from "@/context/HttpClientContext";
import { useAuthStore } from '@/store/authStore';
import { useTranslation } from "@/hooks/useTranslation";

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
  const { session } = useAuthStore();
  const [takenVaccines, setTakenVaccines] = useState<string[]>([]);
  const {t} = useTranslation();
  const router = useRouter();

  const info = !introduceText ? t('child_info_screen_description'): '';
  const enableActionButton = childName.length > 0 && gender.length > 0 && (gender === 'MALE' || gender == 'FEMALE');
  const title = child ? t('edit_a_child_screen_toolbar_title') : t('add_a_child_screen_toolbar_title');

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
    
    const response = await sendRequestFetch<{}>({
      url: url,
      method: method,
      headers: {
        'Accept-Language': 'en',
        'Content-Type': 'application/json',
        Authorization: 'Token ' + session,
      },
      data: payloadData,
    });

    if(response.isTokenExpired){
      return router.replace('/auth/login');
    }
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
    if(!vaccines){
      return;
    }

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

    if(result.isTokenExpired){
      return router.replace('/auth/login');
    }

    const vaccines = result.data!;
    setVaccines(vaccines);
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
            <Text style={GlobalStyles.NormalText}>{t('add_a_child_screen_name_hint')}</Text>
            <TextInput
              style={GlobalStyles.InputBoxStyle}
              onChangeText={(t) => setChildName(t)}
              value={childName}
              keyboardType="default"
            />
          </View>
          <View style={{gap: Spacing.medium}}>
            <Text style={GlobalStyles.NormalText}>{t('add_a_child_screen_date_of_birth_hint')}</Text>
            <DateModalPicker initialDate={childBrithDate} onDateSelected={(date)=>setChildBirthDate(date)} />
          </View>
          <View style={{gap: Spacing.medium}}>
            <Text style={GlobalStyles.NormalText}>{t('edit_a_child_screen_toolbar_gender_title')}</Text>
            <DropDownPicker 
              items={[
                {key: 'n/a', label: ''},
                {key: 'MALE', label: t('gender_dropdown_male_text')},
                {key: 'FEMALE', label: t('gender_dropdown_female_text')}
              ]}
              initialKeySelection={gender}
              onItemSelectionChanged={(key) => setGender(key)} 
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={GlobalStyles.NormalText}>{t('add_a_child_screen_past_vaccinations_title')}</Text>
            <ScrollView style={{height: '100%'}}>
              {child && vaccines && vaccines.map( (vaccine, index) => (
                <Checkbox
                  key={index}
                  initIsChecked={child?.past_vaccinations.filter(t => t == vaccine.id).length === 1}
                  label={vaccine.name}
                  onChange={(val) => {handleTakeVaccine(vaccine.name, val)}}
                />
              ))}
              {!child && vaccines && vaccines.map( (vaccine, index) => (
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
          label={child ? t('general_save_button') : t('general_add_button')}
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