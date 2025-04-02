import { imgLoginMain } from "@/assets/images/images";
import { Image } from "expo-image";
import { View , Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import DropDownPicker from "@/components/DropDownPicker"; 
import CountryModalPicker from "@/components/CountryModalPicker";
import { GlobalStyles } from "@/assets/theme";
import Button, {ButtonStyles} from "@/components/Button";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import { Platform } from "react-native";
import Auth0, { useAuth0, User } from 'react-native-auth0';
import CloudflareTurnstile from "@/components/login/CloudflareTurnstile";
import { useHttpClient } from "@/context/HttpClientContext";


export default function Login(){
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [selectedCountryCallingCode, setSelectedCountryCallingCode] = useState<string | null>("+90");
  const [mobileNumber, setMobileNumber] = useState<string | undefined>(undefined);
  const [completeMobileNumber, setCompleteMobileNumber] = useState<string | undefined>(undefined);
  const [isRegisterMode, setIsRegisterMode] = useState(true);
  const {setSession, setIsProfileCreated, setCompletePhoneNumber: setCPhoneNumber, session } = useAuth();
  const { authorize, user, error, getCredentials } = useAuth0();
  const [showCaptcha, setShowCaptcha] = useState(false);
  const {sendRequestFetch} = useHttpClient();

  const languages = [
    {label: 'Arabic', key: 'ar'},
    {label: 'English', key: 'en'},
    {label: 'Turkish', key: 'tr'},
  ];

  useEffect(() => {
    if(selectedCountryCallingCode && mobileNumber){
      setCompleteMobileNumber(`${selectedCountryCallingCode}${mobileNumber}`);
    }
  }, [selectedCountryCallingCode, mobileNumber]);

  useEffect(() => {
    if(error){
      console.log('login.tsx: Error in logging in: ', error);
    }
  }, [error]);

  const extractProvider = (user: User) => {
    const provider = user.sub!.split('|')[0];
    const uid = user.sub!.split('|')[1]; //The format of user.sub is: provider|uid
    if(provider.toLowerCase() === 'sms'){
      return `${user.name}`;
    } else if(provider.toLowerCase().indexOf('google') > -1){
      return `${user.email}|${uid}`;
    } else if(  provider.toLowerCase().indexOf('apple') > -1){
      return `apple|${uid}`;
    } else {
      console.log('login.tsx: Unknown provider: ', provider);
      return undefined;
    }
  }

  useEffect(() => {
    if(user){
      const handleUser = async () => {
        const userCredentials = await getCredentials();
        if(!userCredentials){
          return;
        }
        const accessToken = userCredentials.idToken;

        const user_identifier = extractProvider(user);
        if(!user_identifier){
          return;
        }
        setCPhoneNumber(user_identifier);
        const response = await sendRequestFetch<{token: string, is_new_user: boolean, user_id: number, user_profile: string}>({
          url: '/otp_auth/auth0_authentication/',
          method: 'POST',
          data: {
            phone_number: user_identifier,
          },
          headers: {
            'Accept-Language': 'en',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
        })
        if(response.error){
          console.log('login.tsx: Error in fetching user profile: ', response.error);
          return;
        }
        if(response.data){
          setSession(response.data.token);
          if(response.data.user_profile){
            setIsProfileCreated(true);
            router.replace('/');
          } else if(response.data.is_new_user) {
            setIsProfileCreated(false);
            router.replace('/registration/user-details');
          } else {
            return;
          }
        }
      }

      handleUser();
    }
  }, [user]);


  const handleRequestOtp = async (captchaToken: string) => {
    if(completeMobileNumber){
      setCPhoneNumber(completeMobileNumber);
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

  const handleOtherMethods = async() => {
    try {
      await authorize();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={{alignItems: 'flex-end', padding: 16}}>
          <Button 
            buttonType={ButtonStyles.PLAIN}
            label={isRegisterMode ? "Login" : "Register"}
            onPress={()=>setIsRegisterMode((prev) => !prev)}
          />
        </View>
        <View style={styles.loginContainer}>
          <Image source={imgLoginMain} style={{width: 93, height:86}} />
          <View style={styles.loginInputsContainer}>
            <Text>Language</Text>
            <DropDownPicker 
              items={languages}
              style={{marginTop: 8}}
              // label={languages.filter(l => l.key===selectedLanguage)[0].label} 
              initialKeySelection={selectedLanguage}
              onItemSelectionChanged={(key) => setSelectedLanguage(key)}
            />
            <Text style={{marginTop: 16}}>Contact Number</Text>
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
                placeholder="Phone Number"
                keyboardType="number-pad"
              />
            </View>
            <View style={styles.loginButtonsContainer}>
              <Button
                label={isRegisterMode ? "Register" : "Login"}
                onPress={() => setShowCaptcha(true)}
              />
              <Text style={{width:'100%', textAlign: 'center', marginTop: 12, marginBottom: 12}}>-- OR --</Text>
              <Button
                label={"Try another methods"}
                onPress={handleOtherMethods}
                buttonType={ButtonStyles.UNFILLED}
              />
              {/* <Button
                label={"Login with Apple"}
                onPress={()=>{}}
              /> */}
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