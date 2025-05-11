import { StyleSheet, SafeAreaView, Text, TextInput, View, Alert } from "react-native";
import { GlobalStyles, Spacing } from "@/assets/theme";
import GenderSwitcher from "@/components/GenderSwitcher";
import { useEffect, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Button, { ButtonStyles } from "@/components/Button";
import { router } from "expo-router";
import { useRegistration } from "@/context/RegistrationContext";
import { UserProfile } from "@/context/AuthContext";
import { useTranslation } from "@/hooks/useTranslation";
import DropDownPicker from "../DropDownPicker";
import { useI18n } from "@/context/I18nContext";
import { useHttpClient } from "@/context/HttpClientContext";
import { useAuth } from "@/context/AuthContext";

export default function ProfileView({profile} : { profile? : UserProfile}){
  const now = new Date();
  const date18YearsAgo = new Date();
  date18YearsAgo.setFullYear(now.getFullYear() - 18);

  const {t} = useTranslation();
  const { setAppLanguage, locale } = useI18n();
  const [selectedName, setSelectedName] = useState('');
  const [selectedDateOfBirth, setSelectedDateOfBirth] = useState(date18YearsAgo);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedGender, setSelectedGender] = useState<'MALE' | 'FEMALE' | undefined>(undefined);
  const {setGender, setName, setDateOfBirth} = useRegistration();
  const {sendRequestFetch} = useHttpClient();
  const {session, userId, setProfile} = useAuth();

  useEffect(() => {
    if(profile){
      setSelectedName(profile.name);
      setSelectedDateOfBirth(new Date(profile.date_of_birth));
      setSelectedGender(profile.gender);
    }
  }, [profile]);

  const enableContinue = selectedName.length > 0 && selectedGender !== undefined;

  const updateUserProfile = async () => {
    const response = await sendRequestFetch<{}>({
      url: `/user_profiles/${userId}/`,
      method: 'PATCH',
      data: {
        name: selectedName,
        gender: selectedGender,
        date_of_birth: selectedDateOfBirth.toISOString().split("T")[0],
        language_code: locale,
      },
      headers: {
        'Accept-Language': 'en',
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Token ' + session,
      },
    });

    if(response.error){
      Alert.alert("Update Profile", "Failed! Please check the internet connection and try again.");
    }
  };

  const handleContinueSave = async () => {
    if(!profile){
      setGender(selectedGender);
      setName(selectedName);
      setDateOfBirth(selectedDateOfBirth);
      router.push('/registration/terms-of-use');
    } else {
      await updateUserProfile();
      setProfile(JSON.stringify({
        name: selectedName,
        gender: selectedGender,
        date_of_birth: selectedDateOfBirth.toISOString().split("T")[0],
        language_code: locale,
        time_zone: profile.time_zone
      }))
    }
  }

  const setCurrentLanguage = async (language: string) => {
    await setAppLanguage(language as 'ar' | 'en' | 'tr');
  }

  const languages = [
    {label: t('language_dropdown_arabic_text'), key: 'ar'},
    {label: t('language_dropdown_english_text'), key: 'en'},
    {label: t('language_dropdown_turkish_text'), key: 'tr'},
  ];

  return (
    <View style={styles.container}>
      <View style={{gap: Spacing.small}}>
        <Text style={GlobalStyles.HeadingText}>Your Details</Text>
        <Text style={GlobalStyles.NormalText}>Great! Please fill up your remaining details.</Text>
      </View>
      <View style={{gap: Spacing.medium}}>
        <Text style={GlobalStyles.NormalText}>{t('my_profile_screen_gender_title')}</Text>
        <GenderSwitcher initialGender={profile?.gender} onGenderChanged={(newGender) => {setSelectedGender(newGender)}} />
      </View>
      <View style={{gap: Spacing.medium}}>
        <Text style={GlobalStyles.NormalText}>{t('my_profile_screen_name_hint')}</Text>
        <TextInput
          style={GlobalStyles.InputBoxStyle}
          onChangeText={(t) => setSelectedName(t)}
          value={selectedName}
          placeholder="Your name"
          keyboardType="default"
        />
      </View>
      <View style={{gap: Spacing.medium}}>
        <Text style={GlobalStyles.NormalText}>{t('my_profile_screen_date_of_birth_hint')}</Text>
        <TextInput
          onPress={() => setShowDatePicker((prev) => !prev)}
          style={GlobalStyles.InputBoxStyle}
          // onChangeText={(t) => setName(t)}
          value={selectedDateOfBirth.toLocaleDateString()}
          placeholder="Your birth date"
        />
      </View>
      {profile && (
        <View style={{gap: Spacing.medium}}>
          <Text style={GlobalStyles.NormalText}>{t('home_screen_language_dropdown_hint')}</Text>
          <DropDownPicker 
            items={languages}
            style={{padding: 1}}
            // label={languages.filter(l => l.key===selectedLanguage)[0].label} 
            initialKeySelection={locale}
            onItemSelectionChanged={(key) => setCurrentLanguage(key)}
          />
        </View>
      )}
      {enableContinue 
        ? (<Button buttonType={ButtonStyles.FILLED} label={profile ? t('general_save_button') : t('complete_profile_screen_continue_button')} onPress={handleContinueSave}/>) 
        : (<Button buttonType={ButtonStyles.DISABLED} label={profile ? t('general_save_button') : t('complete_profile_screen_continue_button')} onPress={handleContinueSave} />) 
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