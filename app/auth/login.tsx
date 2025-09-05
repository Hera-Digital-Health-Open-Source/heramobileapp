import { imgBoarding02, imgHeraIcon } from "@/assets/images/images";
import { Image } from "expo-image";
import { View , Text, StyleSheet, Pressable, Alert, Keyboard, ScrollView, Image as RNImage} from "react-native";
import { useEffect, useState } from "react";
import DropDownPicker from "@/components/DropDownPicker"; 
import { Colors, GlobalStyles, Spacing } from "@/assets/theme";
import Button, {ButtonStyles} from "@/components/Button";
import { RelativePathString, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useTranslation } from "@/hooks/useTranslation";
import { useI18n } from "@/context/I18nContext";
import {useAuth0, Auth0Provider, Credentials} from 'react-native-auth0';
import { useAuthStore } from "@/store/authStore";
import { useProfileStore } from "@/store/profileStore";
import { useHttpClient } from '@/context/HttpClientContext';
import { UserProfile } from "@/interfaces/IUserProfile";

function TextLink({pathname, params}: {pathname: string, params: {uri: string, title: string}}){
  const router = useRouter();

  return (
    <Pressable 
      onPress={() => {
        router.push({
          pathname: pathname as RelativePathString,
          params: params
        })
      }}
    >
      <Text style={[GlobalStyles.NormalText, {fontSize: 8, color: Colors.disabled}]}>{params.title}</Text>
    </Pressable>
  )
}

export default function Login(){
  const [selectedCountryCallingCode, setSelectedCountryCallingCode] = useState<string | null>("+90");
  const [mobileNumber, setMobileNumber] = useState<string | undefined>(undefined);
  const [completeMobileNumber, updateFullMobileNumber] = useState<string | undefined>(undefined);
  const [imageSize, setImageSize] = useState({ width: 200, height: 200 });
  const { userProfile, setUserProfile } = useProfileStore();
  const { t } = useTranslation();
  const { setAppLanguage, locale } = useI18n();
  const router = useRouter();
  const { authorize, error, getCredentials, clearSession } = useAuth0();
  const { sendRequestFetch } = useHttpClient();
  const { fullMobileNumber, setSession, setIdToken, setUserId, userId, session, setFullMobileNumber} = useAuthStore();

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
      console.log(`----- Credentials are received from authStore: ${JSON.stringify(session).substring(0,40)}...`);
      router.replace('/');
    }
  }, [session, userProfile]);

  // Get the original image dimensions
  useEffect(() => {
    RNImage.getSize(
      RNImage.resolveAssetSource(imgBoarding02).uri,
      (width, height) => {
        // Scale down if image is too large, but maintain aspect ratio
        const maxWidth = 300;
        const aspectRatio = width / height;
        
        if (width > maxWidth) {
          setImageSize({
            width: maxWidth,
            height: maxWidth / aspectRatio
          });
        } else {
          setImageSize({ width, height });
        }
      },
      (error) => {
        console.log('Error getting image size:', error);
        // Fallback to default size
        setImageSize({ width: 200, height: 200 });
      }
    );
  }, []);

  
  useEffect(() => {
    if(selectedCountryCallingCode && mobileNumber){
      updateFullMobileNumber(`${selectedCountryCallingCode}${mobileNumber}`);
    }
  }, [selectedCountryCallingCode, mobileNumber]);

  const patchUserProfile = async (
    userProfile: UserProfile, 
    theSession: string,
    theIdToken: string,
    theUserId: number
  ) => {
    const response = await sendRequestFetch<{}>({
      url: `/user_profiles/${theUserId}/`,
      method: "PATCH",
      data: userProfile,
      headers: {
        "Accept-Language": "en",
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: 'Bearer ' + theSession,
        'Id-Authorization': 'Bearer ' + theIdToken
      },
    });

    if(response.isTokenExpired){
      return router.replace('/auth/login');
    }

    if (response.error) {
      Alert.alert(
        t('connection_error_title'),
        t('connection_error_message')
      );
    }
  };

  const ensureCredentials = async () => {
    try {
      // Try to reuse existing credentials
      const currentCredentials = await getCredentials();
      if(currentCredentials){
        return currentCredentials;
      } else {
        throw new Error('No current credentials');
      }
    } catch (err) {
      console.warn("No valid credentials found, authorizing...", err);

      // Run login flow
      await authorize({
        audience: process.env.EXPO_PUBLIC_API_IDENTIFIER,
        scope: 'openid offline_access email', // include other API scopes as needed
      });

      // Fetch and return the fresh credentials
      return await getCredentials();
    }
  }

  const handleLogin = async () => {
    try{      
      const credentials = await ensureCredentials();
      if (!credentials){
        Alert.alert("Authentication Failed", "Auth process couldn't be completed, make sure your are connected to the internet");
        return;
      }
      console.log(`----- Credentials are received from auth0: ${credentials ? JSON.stringify(credentials).substring(0,40) : ''}...`);

      if(credentials && credentials.idToken){
        const response = await sendRequestFetch<{
          token: string,
          is_new_user: boolean,
          user_id: number,
          user_profile: UserProfile,
          uid: string
        }>({
          url: '/otp_auth/auth0_authentication/',
          method: 'POST',
          headers: {
            'Accept-Language': 'en',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + credentials.accessToken,
            'Id-Authorization': 'Bearer ' + credentials.idToken
          },
        });

        if(response.isTokenExpired){
          await clearSession();
          return router.replace('/auth/login');
        }

        if(response.error){
          console.log('Error in login.tsx: ', response.error);
          return;
        }
        if(response.data){
          // setSession(response.data.token);
          setSession(credentials.accessToken);
          setIdToken(credentials.idToken);
          setUserId(response.data.user_id);
          setFullMobileNumber(response.data.uid);
          if(response.data.user_profile){
            if(response.data.user_profile.language_code !== locale){
              response.data.user_profile.language_code = locale as 'tr' | 'en' | 'ar';
              await patchUserProfile(
                response.data.user_profile,
                response.data.token,
                credentials.idToken,
                response.data.user_id
              );
            }
            setUserProfile(response.data.user_profile);
            router.replace('/');
          } else if(response.data.is_new_user) {
            router.replace('/registration/user-details');
          } else {
            return;
          }
        }
      }
    } catch (e){
      console.log(`Error when login: ${e}`);
    }
  }

  return (
    <>
      <StatusBar hidden={true} />
      <View style={{flex: 1, backgroundColor: Colors.primary}}>
        <ScrollView 
          style={{flex: 1}} 
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
          <View style={styles.headerContainer}>
              <RNImage
                source={imgBoarding02} 
                style={{
                  width: imageSize.width,
                  height: imageSize.height,
                }} 
                resizeMode="contain"
              />
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Image source={imgHeraIcon} style={{width: 90, height:150/250 * 90}}/>
                <Text style={[GlobalStyles.HeadingText, {left: -Spacing.standard}]}>{t('hera_official_name')}</Text>
              </View>
            <View style={styles.changeLanguageContainer}>
              <View>
              <Text style={
                  {
                    textAlign: 'left',
                    marginTop: Spacing.large,
                    marginBottom: Spacing.medium, 
                    ...GlobalStyles.NormalText
                  }
                }
              >
                {t('login_screen_select_language_dropdown_hint')}
              </Text>
              <DropDownPicker 
                items={languages}
                style={{marginTop: 8}}
                initialKeySelection={locale}
                onItemSelectionChanged={(key) => setCurrentLanguage(key)}
              />
              </View>
            </View>
          </View>
          <View style={{flex: 1, minHeight: 100, backgroundColor: '#fff'}} />
          <View style={styles.footerContainer}>
            <Text style={[GlobalStyles.HeadingText, {color: '#fff', textAlign: 'center'}]}>{t('login_screen_welcome')}</Text>
            <Text style={[GlobalStyles.NormalText, {color: '#ddd', textAlign: 'center'}]}>{t('login_screen_introduce_hera')}</Text>
            <View style={{marginTop: Spacing.large, gap: Spacing.standard}}>
              <Button
                buttonType={ButtonStyles.UNFILLED}
                label={t('login_screen_get_started')}
                onPress={async () => {
                  Keyboard.dismiss();
                  handleLogin();
                }}
              />
              <View style={
                {
                  flexDirection: 'row',
                  gap: Spacing.medium,
                  alignItems: 'center',
                  justifyContent: 'center',
                }
              }>
                <TextLink 
                  pathname="/auth/web-view-screen"
                  params={{ uri: `https://heradigitalhealth.org/${locale}/data-protection-policy/`, title: t('privacy_policy_toolbar_title')}}
                />
                <Text style={{fontSize: 8, color: Colors.disabled}}>|</Text>
                <TextLink 
                  pathname="/auth/web-view-screen"
                  params={{ uri: `https://heradigitalhealth.org/${locale}/terms-and-conditions/`, title: t('terms_of_use_toolbar_title')}}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    // paddingHorizontal: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 20,
    gap: Spacing.xlarge
    // paddingBottom: 40,
  },
  changeLanguageContainer: {
    paddingHorizontal: Spacing.large,
    width: '100%',
    alignSelf: 'flex-start',
  },
  footerContainer: {
    backgroundColor: Colors.primary,
    // flex:1,
    padding: Spacing.large,
    height: 280,
    borderTopRightRadius: Spacing.xxlarge,
    borderTopLeftRadius: Spacing.xxlarge,
    gap: Spacing.large,
    marginTop: -50
  }
})