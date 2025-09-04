import { SafeAreaView, View , Text, StyleSheet} from "react-native";
import { GlobalStyles, Spacing } from "@/assets/theme";
import Button, { ButtonStyles } from "@/components/Button";
import { useEffect, useState } from "react";
import DateModalPicker from "@/components/DateModalPicker";
import DropDownPicker from "@/components/DropDownPicker";
import { useRouter } from "expo-router";
import { RequestConfig, useHttpClient } from "@/context/HttpClientContext";
import { useAuthStore } from '@/store/authStore';
import IPregnancy from "@/interfaces/IPregnancy";
import { useTranslation } from "@/hooks/useTranslation";

export default function PregnancyView({introduceText, pregnancy, isInRegistrationProcess} : {introduceText: string, pregnancy? : IPregnancy, isInRegistrationProcess: boolean}){
  const [pregnancyCalculationMethod, setPregnancyCalculationMethod] = useState<'lastMenstrualDate' | 'pregnancyWeek' | undefined>(undefined);
  const [lastMenstrualDate, setLastMenstrualDate] = useState<Date | undefined>(undefined);
  const [prenatalVisits, setPrenatalVisits] = useState<string>("");
  const [pregnancyWeek, setPregnancyWeek] = useState<string>("");
  const {sendRequestFetch} = useHttpClient();
  const {session} = useAuthStore();
  const {t} = useTranslation();
  const router = useRouter();

  const info = !introduceText ? t('your_pregnancy_screen_description_1') : introduceText;
  const enableContinue = (pregnancyCalculationMethod === 'lastMenstrualDate' && lastMenstrualDate && prenatalVisits && prenatalVisits !== '-1') || 
                          (pregnancyCalculationMethod === 'pregnancyWeek' && pregnancyWeek && pregnancyWeek !== '-1' && prenatalVisits && prenatalVisits !== '-1')
  const pregnancyWeekItems = [{key: '-1', label: ''}, ...Array.from({ length: 42 }, (_, i) => i + 1).map(i => ({key: String(i), label: String(i)}))];

  useEffect(() => {
    if(pregnancy){
      setLastMenstrualDate(!pregnancy.declared_pregnancy_week ? new Date(pregnancy.declared_date_of_last_menstrual_period) : undefined);
      setPrenatalVisits(pregnancy.declared_number_of_prenatal_visits+"");
      setPregnancyWeek(pregnancy.declared_pregnancy_week);
      setPregnancyCalculationMethod(pregnancy.declared_pregnancy_week ? 'pregnancyWeek' : 'lastMenstrualDate');
    }
  }, [pregnancy]);

  const flipPregnancyCalculationMethod = (calculationMethod: 'lastMenstrualDate' | 'pregnancyWeek') => {
    setPregnancyCalculationMethod(calculationMethod);
  };

  const addSavePregnancy = async () => {
    let method: 'PATCH' | 'POST';
    let url: string;
    let requestConfig: RequestConfig;

    if(pregnancy){
      url = `/pregnancies/${pregnancy.id}/`;
      method = 'PATCH'
    } else {
      url = `/pregnancies/`;
      method = 'POST'
    }
  
    const data = {
      declared_pregnancy_week: !pregnancyWeek ? null : pregnancyWeek,
      declared_date_of_last_menstrual_period: !pregnancyWeek ? lastMenstrualDate?.toISOString().split('T')[0] : null,
      declared_number_of_prenatal_visits: prenatalVisits,
    };

    requestConfig = {
      url: url,
      method: method,
      data: data,
      headers: {
        'Accept-Language': 'en',
        'Content-Type': 'application/json',
        Authorization: 'Token ' + session
      }
    };

    const response = await sendRequestFetch<null>(requestConfig);

    if(response.isTokenExpired){
      return router.replace('/auth/login');
    }

    if(response.error){
      console.log(response.error)
    } else {
      if(pregnancy || !isInRegistrationProcess){
        router.back();
      } else {
        router.push('/registration/pregnancy-info-complete')
      }
    }
  }

  return(
    <SafeAreaView style={{flex:1, backgroundColor: '#fff'}}>
      <View style={{flex: 1, gap: Spacing.large}}>
        <View style={styles.container}>
          <View style={{gap: Spacing.small}}>
            <Text style={GlobalStyles.HeadingText}>{t('my_pregnancy_screen_toolbar_title')}</Text>
            <Text style={GlobalStyles.NormalText}>{info}</Text>
          </View>
          <View style={{flex: 1}}>
            <View style={{gap: Spacing.small}}>
              <Button
                buttonType={ pregnancyCalculationMethod === 'lastMenstrualDate' ? ButtonStyles.FILLED : ButtonStyles.UNFILLED}
                label={t('my_pregnancy_screen_menstrual_title')}
                onPress={() => flipPregnancyCalculationMethod('lastMenstrualDate')}
              />
              <Text style={[GlobalStyles.ButtonTextALT, { alignSelf: 'center'}]}>
                {t('your_pregnancy_screen_or_word')}
              </Text>
              <Button
                buttonType={ pregnancyCalculationMethod === 'pregnancyWeek' ? ButtonStyles.FILLED : ButtonStyles.UNFILLED}
                label={t('my_pregnancy_screen_pregnancy_week_title')}
                onPress={() => flipPregnancyCalculationMethod('pregnancyWeek')}
              />
            </View>
            <View style={{marginTop: Spacing.xlarge}}>
              {pregnancyCalculationMethod === 'lastMenstrualDate' && (
                <View style={{marginTop: Spacing.xlarge, gap: Spacing.xlarge}}>
                  <View style={{gap: Spacing.medium}}>
                    <Text style={GlobalStyles.NormalText}>{t('my_pregnancy_screen_menstrual_title')}</Text>
                    <DateModalPicker
                      initialDate={lastMenstrualDate}
                      onDateSelected={(date)=> {
                        setLastMenstrualDate(date);
                        setPregnancyWeek("");
                      }} 
                    />
                  </View>
                  <View style={{gap: Spacing.medium}}>
                    <Text style={GlobalStyles.NormalText}>{t('your_pregnancy_screen_prenatal_visits_title')}</Text>
                    <DropDownPicker
                      initialKeySelection={prenatalVisits}
                      items={[
                        {key: '-1', label: ''},
                        {key: '0', label: '0'},
                        {key: '1', label: '1'},
                        {key: '2', label: '2'},
                        {key: '3', label: '3'},
                        {key: '4', label: '4'}
                      ]}
                      onItemSelectionChanged={(key) => setPrenatalVisits(key)}
                    />
                  </View>
                </View>
              )}
              {pregnancyCalculationMethod === 'pregnancyWeek' && (
                <View style={{marginTop: Spacing.xlarge, gap: Spacing.xlarge}}>
                  <View style={{gap: Spacing.medium}}>
                    <Text style={GlobalStyles.NormalText}>{t('my_pregnancy_screen_pregnancy_week_title')}</Text>
                    <DropDownPicker
                      initialKeySelection={pregnancyWeek}
                      items={pregnancyWeekItems}
                      onItemSelectionChanged={(key) => {
                        setPregnancyWeek(key);
                        setLastMenstrualDate(undefined);
                      }}
                    />
                  </View>
                  <View style={{gap: Spacing.medium}}>
                    <Text style={GlobalStyles.NormalText}>{t('your_pregnancy_screen_prenatal_visits_title')}</Text>
                    <DropDownPicker
                      initialKeySelection={prenatalVisits}
                      items={[
                        {key: '-1', label: ''},
                        {key: '0', label: '0'},
                        {key: '1', label: '1'},
                        {key: '2', label: '2'},
                        {key: '3', label: '3'},
                        {key: '4', label: '4'}
                      ]}
                      onItemSelectionChanged={(key) => setPrenatalVisits(key)}
                    />
                  </View>
                </View>
              )}
            </View>
          </View>
          {(pregnancy || !isInRegistrationProcess) && (
            <Button
              buttonType={ enableContinue ? ButtonStyles.FILLED : ButtonStyles.DISABLED}
              label={t('general_save_button')}
              onPress={enableContinue ? addSavePregnancy : () => {}}
            /> 
          )}
          {isInRegistrationProcess && (
            <Button
              buttonType={ enableContinue ? ButtonStyles.FILLED : ButtonStyles.DISABLED}
              label={t('otp_screen_continue_button')}
              onPress={enableContinue ? addSavePregnancy : () => {}}
            /> 
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.large,
    // marginTop: Spacing.xxlarge,
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