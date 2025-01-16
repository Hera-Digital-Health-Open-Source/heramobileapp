import { imgLoginMain } from "@/assets/images/images";
import { Image } from "expo-image";
import { View , Text, StyleSheet, TextInput, Pressable} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import DropDownPicker from "@/components/DropDownPicker"; 
import CountryModalPicker from "@/components/CountryModalPicker";
import { GlobalStyles } from "@/assets/theme";
import Button, {ButtonStyles} from "@/components/Button";

export default function Login(){
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [selectedCountryCallingCode, setSelectedCountryCallingCode] = useState<string | null>(null);
  const [mobileNumber, setMobileNumber] = useState<string | undefined>(undefined);
  const [completeMobileNumber, setCompleteMobileNumber] = useState<string | undefined>(undefined);
  const [isRegisterMode, setIsRegisterMode] = useState(true);

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

  return (
    <SafeAreaView style={{flex: 1}}>
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
            label={languages.filter(l => l.key===selectedLanguage)[0].label} 
            initialKeySelection={selectedLanguage}
            onItemSelectionChanged={(key) => setSelectedLanguage(key)}
          />
          <Text style={{marginTop: 8}}>Contact Number</Text>
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
              onPress={()=>alert("hello button!")}
            />
            <Text style={{width:'100%', textAlign: 'center', marginTop: 12}}>-- OR --</Text>
          </View>
        </View>
      </View>
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
    marginTop: 8,
    width: '100%',
    alignSelf: 'flex-start',
  }
})