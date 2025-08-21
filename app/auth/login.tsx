import { imgHeraIcon, imgLoginMain } from "@/assets/images/images";
import { Image } from "expo-image";
import { View , Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Alert} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import DropDownPicker from "@/components/DropDownPicker"; 
import CountryModalPicker from "@/components/CountryModalPicker";
import { GlobalStyles, Spacing } from "@/assets/theme";
import Button, {ButtonStyles} from "@/components/Button";
import { useRouter } from "expo-router";
import { Platform } from "react-native";
import CloudflareTurnstile from "@/components/login/CloudflareTurnstile";
import { useTranslation } from "@/hooks/useTranslation";
import { useI18n } from "@/context/I18nContext";
import Auth0 from 'react-native-auth0';

import { useAuthStore } from "@/store/authStore";

export default function Login(){
  const [selectedCountryCallingCode, setSelectedCountryCallingCode] = useState<string | null>("+90");
  const [mobileNumber, setMobileNumber] = useState<string | undefined>(undefined);
  const [completeMobileNumber, updateFullMobileNumber] = useState<string | undefined>(undefined);
  const [isRegisterMode, setIsRegisterMode] = useState(true);
  const { session, userProfile, setFullMobileNumber } = useAuthStore();
  const [showCaptcha, setShowCaptcha] = useState(false);
  const { t } = useTranslation();
  const { setAppLanguage, locale } = useI18n();
  const router = useRouter();

  const languages = [
    {label: t('language_dropdown_arabic_text'), key: 'ar'},
    {label: t('language_dropdown_english_text'), key: 'en'},
    {label: t('language_dropdown_turkish_text'), key: 'tr'},
  ];

  const setCurrentLanguage = async (language: string) => {
    await setAppLanguage(language as 'ar' | 'en' | 'tr');
  }
 
  // If the user is signed-in before and complete his profile,
  // Then re-route him to the home screen.
  useEffect(() => {
    if(session && userProfile){
      router.replace('/');
    }
  }, [session, userProfile]);

  
  useEffect(() => {
    if(selectedCountryCallingCode && mobileNumber){
      updateFullMobileNumber(`${selectedCountryCallingCode}${mobileNumber}`);
    }
  }, [selectedCountryCallingCode, mobileNumber]);

  const handleRequestOtp = async (captchaToken: string) => {
    if(completeMobileNumber){
      setFullMobileNumber(completeMobileNumber);
      const auth0 = new Auth0({
        domain: process.env.EXPO_PUBLIC_AUTH0_DOMAIN!,
        clientId: process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID!,
      });
      await auth0.auth.passwordlessWithSMS({
        phoneNumber: completeMobileNumber, 
      });
      router.push('/auth/otp-screen');
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={{alignItems: 'flex-end', padding: 16}}>
          <Button 
            buttonType={ButtonStyles.PLAIN}
            label={isRegisterMode ? t('login_screen_login_button') : t('login_screen_signup_button')}
            onPress={()=>setIsRegisterMode((prev) => !prev)}
          />
        </View>
        <View style={styles.loginContainer}>
          <Image source={imgHeraIcon} style={{width: 250, height:150}}/>
          <Text style={GlobalStyles.HeadingText}>{t('hera_official_name')}</Text>
          {/* <Text style={{...GlobalStyles.NormalText, marginTop: Spacing.large}}>{t('login_screen_title')}</Text> */}
          <View style={styles.loginInputsContainer}>
            <View>
            <Text style={{marginTop: Spacing.large, marginBottom: Spacing.medium, ...GlobalStyles.NormalText}}>{t('login_screen_select_language_dropdown_hint')}</Text>
            <DropDownPicker 
              items={languages}
              style={{marginTop: 8}}
              // label={languages.filter(l => l.key===selectedLanguage)[0].label} 
              initialKeySelection={locale}
              onItemSelectionChanged={(key) => setCurrentLanguage(key)}
            />
            </View>
            <View>
            <Text style={{marginTop: Spacing.large, marginBottom: Spacing.medium, ...GlobalStyles.NormalText}}>{t('login_screen_phone_number_hint')}</Text>
            <View style={{flexDirection: 'row', gap: 8 , alignContent: 'space-between', marginTop: 8}}>
              <CountryModalPicker
                style={{width:75}}
                preferredCountries={['TR', 'US']}
                defaultCallingCode="+90"
                onCountrySelectionChanged={(v) => setSelectedCountryCallingCode(v)}
              />
              <TextInput
                style={[GlobalStyles.InputBoxStyle, GlobalStyles.NormalText, {flex:1}]}
                onChangeText={(t) => setMobileNumber(t)}
                value={mobileNumber}
                placeholder={t('login_screen_phone_number_hint')}
                keyboardType="number-pad"
              />
            </View>
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
    paddingHorizontal: 16,
    alignItems: 'center',
    flex: 1,
  },
  loginInputsContainer: {
    marginTop: 32,
    width: '100%',
    gap: Spacing.large,
    alignSelf: 'flex-start',
  }
})