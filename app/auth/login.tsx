import { imgLoginMain } from "@/assets/images/images";
import { Image } from "expo-image";
import { View , Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Alert} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import DropDownPicker from "@/components/DropDownPicker"; 
import CountryModalPicker from "@/components/CountryModalPicker";
import { GlobalStyles } from "@/assets/theme";
import Button, {ButtonStyles} from "@/components/Button";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import { Platform } from "react-native";
import CloudflareTurnstile from "@/components/login/CloudflareTurnstile";
import { useHttpClient } from "@/context/HttpClientContext";
import { useTranslation } from "@/hooks/useTranslation";
import { useI18n } from "@/context/I18nContext";

export default function Login(){
  const [selectedCountryCallingCode, setSelectedCountryCallingCode] = useState<string | null>("+90");
  const [mobileNumber, setMobileNumber] = useState<string | undefined>(undefined);
  const [completeMobileNumber, setCompleteMobileNumber] = useState<string | undefined>(undefined);
  const [isRegisterMode, setIsRegisterMode] = useState(true);
  const {setSession, setCompletePhoneNumber: setCPhoneNumber, session, requestOtp } = useAuth();
  const [showCaptcha, setShowCaptcha] = useState(false);
  const {sendRequestFetch} = useHttpClient();
  const { t } = useTranslation();
  const { setAppLanguage } = useI18n();

  const languages = [
    {label: t('language_dropdown_arabic_text'), key: 'ar'},
    {label: t('language_dropdown_english_text'), key: 'en'},
    {label: t('language_dropdown_turkish_text'), key: 'tr'},
  ];

  const setCurrentLanguage = async (language: string) => {
    await setAppLanguage(language as 'ar' | 'en' | 'tr');
  }

  useEffect(() => {
    if(selectedCountryCallingCode && mobileNumber){
      setCompleteMobileNumber(`${selectedCountryCallingCode}${mobileNumber}`);
    }
  }, [selectedCountryCallingCode, mobileNumber]);

  const handleRequestOtp = async (captchaToken: string) => {
    if(completeMobileNumber){
      setCPhoneNumber(completeMobileNumber);
      const response = await requestOtp(completeMobileNumber, captchaToken);
      if(response){
        console.log('login.tsx: Requested OTP successfully');
        router.push('/auth/otp-screen');
      } else {
        Alert.alert("OTP Request", "Failed! Please check the internet connection and try again.");
      }
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={{alignItems: 'flex-end', padding: 16}}>
          <Button 
            buttonType={ButtonStyles.PLAIN}
            label={isRegisterMode ? t('login_screen_login_button') : t('login_screen_signup_button')}
            onPress={()=>setIsRegisterMode((prev) => !prev)}
          />
        </View>
        <View style={styles.loginContainer}>
          <Image source={imgLoginMain} style={{width: 93, height:86}} />
          <View style={styles.loginInputsContainer}>
            <Text>{t('login_screen_select_language_dropdown_hint')}</Text>
            <DropDownPicker 
              items={languages}
              style={{marginTop: 8}}
              // label={languages.filter(l => l.key===selectedLanguage)[0].label} 
              initialKeySelection={'en'}
              onItemSelectionChanged={(key) => setCurrentLanguage(key)}
            />
            <Text style={{marginTop: 16}}>{t('login_screen_phone_number_hint')}</Text>
            <View style={{flexDirection: 'row', gap: 8 , alignContent: 'space-between', marginTop: 8}}>
              <CountryModalPicker
                style={{width:75}}
                preferredCountries={['TR', 'US']}
                defaultCallingCode="+90"
                onCountrySelectionChanged={(v) => setSelectedCountryCallingCode(v)}
              />
              <TextInput
                style={[GlobalStyles.InputBoxStyle, {flex:1}]}
                onChangeText={(t) => setMobileNumber(t)}
                value={mobileNumber}
                placeholder={t('login_screen_phone_number_hint')}
                keyboardType="number-pad"
              />
            </View>
            <View style={styles.loginButtonsContainer}>
              <Button
                label={isRegisterMode ? t('login_screen_signup_button') : t('login_screen_login_button')}
                onPress={() => setShowCaptcha(true)}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      <CloudflareTurnstile
        show={showCaptcha}
        setIsShow={setShowCaptcha}
        successFn={async (token) => {
          await handleRequestOtp(token);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loginButtonsContainer:{
    marginTop: 26,
  },
  loginContainer: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    // backgroundColor: '#faa'
  },
  loginInputsContainer: {
    marginTop: 32,
    width: '100%',
    alignSelf: 'flex-start',
  }
})