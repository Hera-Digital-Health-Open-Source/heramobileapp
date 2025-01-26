import { SafeAreaView, View , Text, StyleSheet} from "react-native";
import { GlobalStyles, Spacing } from "@/assets/theme";
import Button, { ButtonStyles } from "@/components/Button";
import { useState } from "react";
import DateModalPicker from "@/components/DateModalPicker";
import DropDownPicker from "@/components/DropDownPicker";
import { router } from "expo-router";
import { useHttpClient } from "@/context/HttpClientContext";
import { useAuth } from "@/context/AuthContext";

export default function PregnancyInfo(){
  const [pregnancyCalculationMethod, setPregnancyCalculationMethod] = useState<'lastMenstrualDate' | 'pregnancyWeek' | undefined>(undefined);
  const [lastMenstrualDate, setLastMenstrualDate] = useState<Date>(new Date());
  const [prentalVisits, setPrentalVisits] = useState<string>("");
  const [pregnancyWeek, setPregnancyWeek] = useState<string>("");
  const {sendRequest} = useHttpClient();
  const {session} = useAuth();

  const info = `Alright! Let’s fill in the details and we will assist you by adding important doctor visit dates into “My Appointments”!`;
  const enableContinue = (pregnancyCalculationMethod === 'lastMenstrualDate' && lastMenstrualDate && prentalVisits && prentalVisits !== '-1') || 
                          (pregnancyCalculationMethod === 'pregnancyWeek' && pregnancyWeek && pregnancyWeek !== '-1' && prentalVisits && prentalVisits !== '-1')
  const pregnancyWeekItems = [{key: '-1', label: ''}, ...Array.from({ length: 42 }, (_, i) => i + 1).map(i => ({key: String(i), label: String(i)}))];

  const flipPregnancyCalculationMethod = (calculationMethod: 'lastMenstrualDate' | 'pregnancyWeek') => {
    setPregnancyCalculationMethod(calculationMethod);
    setPrentalVisits("");
    setPregnancyWeek("");
    setLastMenstrualDate(new Date());
  };

  const handleContinue = async () => {
    const response = await sendRequest<null>({
      url: '/pregnancies/',
      method: 'POST',
      data: {
        declared_pregnancy_week: pregnancyWeek === '' ? null : pregnancyWeek,
        declared_date_of_last_menstrual_period: pregnancyWeek === '' ? lastMenstrualDate.toISOString().split('T')[0] : null,
        declared_number_of_prenatal_visits: prentalVisits,
      },
      headers: {
        'Accept-Language': 'en',
        Authorization: 'Token ' + session
    }});

    if(response.error){
      console.log(response.error)
    } else {
      router.push('/registration/pregnancy-info-complete')
    }
  }

  return (
    <SafeAreaView style={{flex:1, backgroundColor: '#fff'}}>
      <View style={{flex: 1, gap: Spacing.large}}>
        <View style={styles.container}>
          <View style={{gap: Spacing.small}}>
            <Text style={GlobalStyles.HeadingText}>Pregnancy</Text>
            <Text style={GlobalStyles.NormalText}>{info}</Text>
          </View>
          <View style={{flex: 1}}>
            <View style={{}}>
              <Button
                buttonType={ pregnancyCalculationMethod === 'lastMenstrualDate' ? ButtonStyles.FILLED : ButtonStyles.UNFILLED}
                label="Enter Last Menstrual Date"
                onPress={() => flipPregnancyCalculationMethod('lastMenstrualDate')}
              />
              <Button
                buttonType={ pregnancyCalculationMethod === 'pregnancyWeek' ? ButtonStyles.FILLED : ButtonStyles.UNFILLED}
                label="Enter Pregnancy Week"
                onPress={() => flipPregnancyCalculationMethod('pregnancyWeek')}
              />
            </View>
            <View style={{marginTop: Spacing.xlarge}}>
              {pregnancyCalculationMethod === 'lastMenstrualDate' && (
                <View style={{marginTop: Spacing.xlarge, gap: Spacing.xlarge}}>
                  <View style={{gap: Spacing.medium}}>
                    <Text style={GlobalStyles.NormalText}>Select menstrual period</Text>
                    <DateModalPicker initialDate={lastMenstrualDate} onDateSelected={(date)=>setLastMenstrualDate(date)} />
                  </View>
                  <View style={{gap: Spacing.medium}}>
                    <Text style={GlobalStyles.NormalText}>How many prenatal visits have you done?</Text>
                    <DropDownPicker
                      initialKeySelection={prentalVisits}
                      items={[
                        {key: '-1', label: ''},
                        {key: '0', label: '0'},
                        {key: '1', label: '1'},
                        {key: '2', label: '2'},
                        {key: '3', label: '3'},
                        {key: '4', label: '4'}
                      ]}
                      onItemSelectionChanged={(key) => setPrentalVisits(key)}
                    />
                  </View>
                </View>
              )}
              {pregnancyCalculationMethod === 'pregnancyWeek' && (
                <View style={{marginTop: Spacing.xlarge, gap: Spacing.xlarge}}>
                  <View style={{gap: Spacing.medium}}>
                    <Text style={GlobalStyles.NormalText}>Select Pregnancy Week</Text>
                    <DropDownPicker
                      initialKeySelection={pregnancyWeek}
                      items={pregnancyWeekItems}
                      onItemSelectionChanged={(key) => setPregnancyWeek(key)}
                    />
                  </View>
                  <View style={{gap: Spacing.medium}}>
                    <Text style={GlobalStyles.NormalText}>How many prenatal visits have you done?</Text>
                    <DropDownPicker
                      initialKeySelection={prentalVisits}
                      items={[
                        {key: '-1', label: ''},
                        {key: '0', label: '0'},
                        {key: '1', label: '1'},
                        {key: '2', label: '2'},
                        {key: '3', label: '3'},
                        {key: '4', label: '4'}
                      ]}
                      onItemSelectionChanged={(key) => setPrentalVisits(key)}
                    />
                  </View>
                </View>
              )}
            </View>
          </View>
          <Button
            buttonType={ enableContinue ? ButtonStyles.FILLED : ButtonStyles.DISABLED}
            label="Continue"
            onPress={enableContinue ? handleContinue : () => {}}
          /> 
        </View>
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
    backgroundColor: '#fff',
  },
  continueButton: {
    position: 'absolute',
    bottom: 0,
    left:Spacing.large,
    right: Spacing.large
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