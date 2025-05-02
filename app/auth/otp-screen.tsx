import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import {OtpInput} from 'react-native-otp-entry';
import { useAuth } from '@/context/AuthContext';
import Button, { ButtonStyles } from '@/components/Button';
import { router } from 'expo-router';
import CloudflareTurnstile from "@/components/login/CloudflareTurnstile";

const OTPScreen = () => {
  const [otp, setOtp] = useState('');
  const {completePhoneNumber, requestOtp, validateOtp, profile} = useAuth();
  const [showCaptcha, setShowCaptcha] = useState(false);

  const handleResendOTP = async (captchaToken: string) => {
    if(completePhoneNumber){
      const response = await requestOtp(completePhoneNumber, captchaToken);
      if(response){
        console.log('login.tsx: Requested OTP successfully');
        setOtp('');
      } else {
        console.error('login.tsx: Could not requested OTP! something went wrong!');
      }
    }
  }

  const handleSubmit = async () => {
    const result  = await validateOtp(otp, completePhoneNumber);
    if (result){
      if(profile){
        router.replace('/');
      } else {
        router.replace('/registration/(profile)/user-details');
      }
    } else {
      Alert.alert("OTP Validation", "Failed! Please, request another OTP and try again.");
      // console.error('otp-screen: somthing went wrong! could not validate the OTP code!');
    }
  }

  // const handleSubmit = async () => {
  //   const auth0 = new Auth0({
  //     domain: process.env.EXPO_PUBLIC_AUTH0_DOMAIN!,
  //     clientId: process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID!,
  //   });
    
  //   const credentials = await auth0.auth.loginWithSMS({
  //     phoneNumber: completePhoneNumber, // The same phone number used in the previous step
  //     code: otp,              // The OTP entered by the user
  //   });

  //   if(credentials && credentials.idToken){
  //     const response = await sendRequestFetch<{token: string, is_new_user: boolean, user_id: number, user_profile: string}>({
  //       url: '/otp_auth/auth0_authentication/',
  //       method: 'POST',
  //       data: {
  //         phone_number: completePhoneNumber,
  //       },
  //       headers: {
  //         'Accept-Language': 'en',
  //         'Content-Type': 'application/json',
  //         Authorization: 'Bearer ' + credentials.idToken,
  //       },
  //     })
  //     if(response.error){
  //       console.log('login.tsx: Error in fetching user profile: ', response.error);
  //       return;
  //     }
  //     if(response.data){
  //       setSession(response.data.token);
  //       if(response.data.user_profile){
  //         setIsProfileCreated(true);
  //         router.replace('/');
  //       } else if(response.data.is_new_user) {
  //         setIsProfileCreated(false);
  //         router.replace('/registration/user-details');
  //       } else {
  //         return;
  //       }
  //     }
  //   }
  // };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.title}>OTP</Text>
      <Text style={styles.subtitle}>Type in the OTP we sent on your mobile number!</Text>
      
      <OtpInput numberOfDigits={6} onTextChange={setOtp} />

      <View style={styles.buttonsContainer}>
        <Button
          style={{flex: 1}}
          buttonType={ButtonStyles.UNFILLED}
          label={'Resend OTP'}
          onPress={handleSubmit}
        />
        <Button 
          style={{flex: 1}}
          buttonType={otp.length < 6 ? ButtonStyles.DISABLED : ButtonStyles.FILLED}
          label={'Enter Pin'}
          onPress={otp.length < 6 ? () => {} : () => handleSubmit()}
        />
      </View>
      <CloudflareTurnstile
        show={showCaptcha}
        setIsShow={setShowCaptcha}
        successFn={async (token) => {
          await handleResendOTP(token);
        }}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A1B9A', // Purple
  },
  subtitle: {
    fontSize: 16,
    color: '#6A6A6A',
    textAlign: 'center',
    marginVertical: 10,
  },
  otpInput: {
    width: '80%',
    height: 100,
  },
  otpBox: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
  },
  otpBoxFocused: {
    borderColor: '#6A1B9A',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    marginTop: 20,
  },
  resendButton: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    alignItems: 'center',
  },
  resendText: {
    color: '#6A1B9A',
    fontWeight: 'bold',
  },
  submitButton: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 10,
    backgroundColor: '#6A1B9A',
    borderRadius: 8,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default OTPScreen;
