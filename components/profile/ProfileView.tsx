import {
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  View,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { GlobalStyles, Spacing } from "@/assets/theme";
import GenderSwitcher from "@/components/GenderSwitcher";
import { useEffect, useState } from "react";
import Button, { ButtonStyles } from "@/components/Button";
import { useRouter } from "expo-router";
import { useRegistration } from "@/context/RegistrationContext";
import { useTranslation } from "@/hooks/useTranslation";
import DropDownPicker from "../DropDownPicker";
import { useI18n } from "@/context/I18nContext";
import { useHttpClient } from "@/context/HttpClientContext";
import { useAuthStore, UserProfile } from "@/store/authStore";
import DateModalPicker from "../DateModalPicker";

export default function ProfileView({ profile }: { profile?: UserProfile }) {
  const now = new Date();
  const date18YearsAgo = new Date();
  date18YearsAgo.setFullYear(now.getFullYear() - 18);

  const { t } = useTranslation();
  const { setAppLanguage, locale } = useI18n();
  const [selectedName, setSelectedName] = useState("");
  const [selectedDateOfBirth, setSelectedDateOfBirth] = useState(date18YearsAgo);
  const [selectedGender, setSelectedGender] = useState<"MALE" | "FEMALE" | undefined>(undefined);
  const { setGender, setName, setDateOfBirth } = useRegistration();
  const { sendRequestFetch } = useHttpClient();
  const { session, userId, setUserProfile } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (profile) {
      setSelectedName(profile.name);
      setSelectedDateOfBirth(new Date(profile.date_of_birth));
      setSelectedGender(profile.gender);
    }
  }, [profile]);

  const enableContinue =
    selectedName.length > 0 && selectedGender !== undefined;

  const updateUserProfile = async (useSpecificLanguage: string | null = null) => {
    const response = await sendRequestFetch<{}>({
      url: `/user_profiles/${userId}/`,
      method: "PATCH",
      data: {
        name: selectedName,
        gender: selectedGender,
        date_of_birth: selectedDateOfBirth.toISOString().split("T")[0],
        language_code: useSpecificLanguage ? useSpecificLanguage : locale,
      },
      headers: {
        "Accept-Language": "en",
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token " + session,
      },
    });

    if(response.isTokenExpired){
      return router.replace('/auth/login');
    }

    if (response.error) {
      Alert.alert(
        "Update Profile",
        "Failed! Please check the internet connection and try again."
      );
    }
  };

  const handleContinueSave = async () => {
    if (!profile) {
      setGender(selectedGender);
      setName(selectedName);
      setDateOfBirth(selectedDateOfBirth);
      router.push("/registration/terms-of-use");
    } else {
      await updateUserProfile();
      setUserProfile(
        {
          name: selectedName,
          gender: selectedGender!,
          date_of_birth: selectedDateOfBirth.toISOString().split("T")[0],
          language_code: locale as 'en' | 'tr' | 'ar',
          time_zone: profile.time_zone,
        }
      );
    }
  };

  const setCurrentLanguage = async (language: string) => {
    await updateUserProfile(language as "ar" | "en" | "tr");
    setUserProfile(
      {
        name: selectedName,
        gender: selectedGender!,
        date_of_birth: selectedDateOfBirth.toISOString().split("T")[0],
        language_code: language as 'en' | 'tr' | 'ar',
        time_zone: profile?.time_zone!, // profile?.time_zone is garanteed to have a valid value.
      }
    );
    await setAppLanguage(language as "ar" | "en" | "tr");
    
    // For non-Arabic languages, show a brief confirmation since the app doesn't restart
    if (language !== 'ar') {
      // Wait a brief moment for the translation to take effect
      setTimeout(() => {
        Alert.alert(t("language_changed_successfully"));
      }, 100);
    }
  };

  const languages = [
    { label: t("language_dropdown_arabic_text"), key: "ar" },
    { label: t("language_dropdown_english_text"), key: "en" },
    { label: t("language_dropdown_turkish_text"), key: "tr" },
  ];

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ gap: Spacing.large, flex: 1 }}>
          <View style={{ gap: Spacing.small }}>
            <Text style={GlobalStyles.HeadingText}>
              {t("my_profile_screen_toolbar_title")}
            </Text>
            <Text style={GlobalStyles.NormalText}>
              {profile
                ? t("my_profile_screen_toolbar_description2")
                : t("my_profile_screen_toolbar_description1")}
            </Text>
          </View>
          <View style={{ gap: Spacing.medium }}>
            <Text style={GlobalStyles.NormalText}>
              {t("my_profile_screen_gender_title")}
            </Text>
            <GenderSwitcher
              initialGender={profile?.gender}
              onGenderChanged={(newGender) => {
                setSelectedGender(newGender);
              }}
            />
          </View>
          <View style={{ gap: Spacing.medium }}>
            <Text style={GlobalStyles.NormalText}>
              {t("my_profile_screen_name_hint")}
            </Text>
            <TextInput
              style={GlobalStyles.InputBoxStyle}
              onChangeText={(t) => setSelectedName(t)}
              value={selectedName}
              placeholder="Your name"
              keyboardType="default"
            />
          </View>
          <View style={{ gap: Spacing.medium }}>
            <Text style={GlobalStyles.NormalText}>
              {t("my_profile_screen_date_of_birth_hint")}
            </Text>
            {/* <TextInput
              onPress={() => setShowDatePicker((prev) => !prev)}
              style={GlobalStyles.InputBoxStyle}
              // onChangeText={(t) => setName(t)}
              value={selectedDateOfBirth.toLocaleDateString()}
              placeholder="Your birth date"
            /> */}
            <DateModalPicker initialDate={selectedDateOfBirth} onDateSelected={(date)=>setSelectedDateOfBirth(date)} />
          </View>
          {profile && (
            <View style={{ gap: Spacing.medium }}>
              <Text style={GlobalStyles.NormalText}>
                {t("home_screen_language_dropdown_hint")}
              </Text>
              <DropDownPicker
                items={languages}
                style={{ padding: 1 }}
                // label={languages.filter(l => l.key===selectedLanguage)[0].label}
                initialKeySelection={locale}
                onItemSelectionChanged={(key) => setCurrentLanguage(key)}
              />
            </View>
          )}

          <View style={{ padding: 10, flex: 1 }}></View>

          {enableContinue ? (
            <Button
              buttonType={ButtonStyles.FILLED}
              label={
                profile
                  ? t("general_save_button")
                  : t("complete_profile_screen_continue_button")
              }
              onPress={handleContinueSave}
            />
          ) : (
            <Button
              buttonType={ButtonStyles.DISABLED}
              label={
                profile
                  ? t("general_save_button")
                  : t("complete_profile_screen_continue_button")
              }
              onPress={handleContinueSave}
            />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: Spacing.large,
    marginTop: Spacing.large,
    flex: 1,
  },
});
