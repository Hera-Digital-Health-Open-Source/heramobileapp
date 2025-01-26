import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import {OtpInput} from 'react-native-otp-entry';
import { useAuth } from '@/context/AuthContext';
import Button, { ButtonStyles } from '@/components/Button';
import { router } from 'expo-router';


const OTPScreen = () => {
  const [otp, setOtp] = useState('');
  const {validateOtp, isProfileCreated, errorMessage} = useAuth();

  useEffect(() => {
    console.log(`otp-screen.tsx: isProfileCreated: ${isProfileCreated}`);
    if(isProfileCreated !== undefined){
      if(isProfileCreated){
        router.replace('/');
      } else {
        router.replace('/registration/user-details');
      }
    }
  }, [isProfileCreated]);

  const handleResendOTP = () => {
    // Logic for resending OTP
    console.log('Resend OTP clicked');
  };

  // const getOnBoardingProgresses = async (userId: number) => {
  //   const response = await sendRequest<{
  //     has_filled_children_info: boolean,
  //     has_filled_pregnancy_status: boolean,
  //     has_filled_profile: boolean
  //   }>({
  //     url: '/onboarding_progresses/' + userId + '/',
  //     method: 'GET',
  //     headers: {
  //       'Accept-Language': 'en',
  //       Authorization: 'Token ' + session!,
  //     },
  //   });
  //   if (onboardingRes.data.has_filled_children_info === true) {
  //     yield call(saveString, 'onboardingprogress', '3');
  //     yield put(
  //       VerifyOtpActions.verifyOtpSuccess({
  //         userId,
  //         onboardingProgress: 3,
  //         authToken: res.data.token,
  //       }),
  //     );
  //   } else if (onboardingRes.data.has_filled_pregnancy_status === true) {
  //     yield call(saveString, 'onboardingprogress', '2');
  //     yield put(
  //       VerifyOtpActions.verifyOtpSuccess({
  //         userId,
  //         onboardingProgress: 2,
  //         authToken: res.data.token,
  //       }),
  //     );
  //   } else if (onboardingRes.data.has_filled_profile === true) {
  //     yield call(saveString, 'onboardingprogress', '1');
  //     yield put(
  //       VerifyOtpActions.verifyOtpSuccess({
  //         userId,
  //         onboardingProgress: 1,
  //         authToken: res.data.token,
  //       }),
  //     );
  //   } else {
  //     yield put(
  //       VerifyOtpActions.verifyOtpSuccess({
  //         userId,
  //         onboardingProgress: 0,
  //         authToken: res.data.token,
  //       }),
  //     );
  //   }
  // };

  const handleSubmit = async () => {
    const response = await validateOtp(otp);
    if(!response){
      // show error message
      console.log(`otp-screen.tsx: Error when validating OTP: ${errorMessage}`);
    }
  };

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
