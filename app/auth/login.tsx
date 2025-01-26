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

export default function Login(){
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [selectedCountryCallingCode, setSelectedCountryCallingCode] = useState<string | null>("+90");
  const [mobileNumber, setMobileNumber] = useState<string | undefined>(undefined);
  const [completeMobileNumber, setCompleteMobileNumber] = useState<string | undefined>(undefined);
  const [isRegisterMode, setIsRegisterMode] = useState(true);
  const { requestOtp, errorMessage } = useAuth();

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

  // useEffect(() => {
  //   console.log(`In useEffect, showValidateOtp: ${showValidateOtp}`);
  //   if(showValidateOtp){
  //     // router.replace({pathname: '/otp-screen', params: {completeMobileNumber: completeMobileNumber}});
  //     router.replace('/auth');
  //   }
  // }, [showValidateOtp]);

  const handleRequestOtp = async () => {
    if(completeMobileNumber){
      const response = await requestOtp(completeMobileNumber);
      if(response){
        console.log('login.tsx: Requested OTP successfully');
        router.push('/auth/otp-screen');
      } else {
        //Show error message
        console.log('login.tsx: Error in requesting OTP: ', errorMessage);
      }
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
                onPress={handleRequestOtp}
              />
              <Text style={{width:'100%', textAlign: 'center', marginTop: 12, marginBottom: 12}}>-- OR --</Text>
              <Button
                label={"Login with Google"}
                onPress={()=>{}}
              />
              <Button
                label={"Login with Apple"}
                onPress={()=>{}}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
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