import { SafeAreaView, View , Text, ScrollView, StyleSheet} from "react-native";
import { GlobalStyles, Spacing } from "@/assets/theme";
import Button, { ButtonStyles } from "@/components/Button";
import CheckBox from "@/components/CheckBox";
import { useState } from "react";
import { useRegistration } from "@/context/RegistrationContext";
import { useHttpClient } from "@/context/HttpClientContext";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";


export default function PrivacyPolicy(){
  const [isAccept, setIsAccept] = useState(false);
  const {name, gender, dateOfBirth, setOnBoardingProgress} = useRegistration();
  const {sendRequest} = useHttpClient();
  const {session} = useAuth();

  const privacyPolicy = `Welcome to Hera, a mobile application designed to [brief description of app's function, e.g., "track your daily fitness activities"]. By accessing or using [App Name] (the "App"), you agree to comply with and be bound by the following terms and conditions ("Terms"). If you do not agree with these Terms, please do not use the App.

1. Eligibility You must be at least 13 years old to use this App. By agreeing to these Terms, you represent that you are 13 years of age or older, or if you are under 18, you have obtained parental or legal guardian consent to use this App.

2. Account Registration To access certain features of the App, you may need to create an account. You agree to provide accurate, current, and complete information during the registration process. You are responsible for maintaining the confidentiality of your account login details and for all activities that occur under your account.
3. Use of the App You agree to use the App only for lawful purposes and in accordance with these Terms. You may not use the App to:
Engage in any activity that violates any applicable laws, regulations, or third-party rights.
Interfere with or disrupt the operation of the App.
Upload or transmit harmful or unlawful content.
4. Privacy Your use of the App is also governed by our Privacy Policy, which outlines how we collect, use, and protect your personal information. Please review the Privacy Policy before using the App.
5. Subscription & Payments Certain features of the App may require a subscription or one-time payment. By subscribing, you agree to pay any applicable fees for the services. Payments are processed through [Payment Processor], and any issues with payments should be directed to their support team.
6. Termination We reserve the right to suspend or terminate your account if you violate these Terms or if we believe that your use of the App may harm other users or the App itself. Upon termination, your access to the App will be revoked, and you will not be entitled to any refund for any paid subscriptions.
7. Intellectual Property The App and all its content, including but not limited to text, images, graphics, and software, are owned by [Company Name] and are protected by intellectual property laws. You may not copy, modify, distribute, or create derivative works based on any part of the App without prior written permission.
8. Disclaimers The App is provided "as is" without warranties of any kind, either express or implied. We do not guarantee that the App will be error-free or uninterrupted. Use of the App is at your own risk.
9. Limitation of Liability To the maximum extent permitted by law, [Company Name] shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from or in connection with your use of the App.
10. Modifications to Terms We reserve the right to update or modify these Terms at any time. Any changes will be posted within the App or on our website. Your continued use of the App after such changes indicates your acceptance of the updated Terms.
11. Governing Law These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction]. Any disputes arising from or related to these Terms shall be resolved in the courts of [Jurisdiction].
12. Contact Us If you have any questions or concerns about these Terms, please contact us at [support@email.com] or visit our website at [www.appwebsite.com].`;

  const handleContinue = async () => {
    const response = await sendRequest<{}>({
      url: '/user_profiles/',
      method: 'POST',
      data: {
        name: name,
        gender: gender?.toUpperCase(),
        date_of_birth: dateOfBirth!.toISOString().split("T")[0],
        language_code: 'en',
        agree_to_terms_at: new Date().toISOString().split("T")[0],
      },
      headers: {
        'Accept-Language': 'en',
        Authorization: 'Token ' + session!,
      },
    });

    console.log(response.data);
    if(response.error){
      console.log(response.error)
    }
    if(response.data){
      await updateOnboardingProgresses();
      router.replace('/registration/pregnancy-yes-no');
    }
  };

  const updateOnboardingProgresses = async () => {
    const response = await sendRequest<{}>({
      url: '/onboarding_progresses/',
      method: 'POST',
      data: {
        has_filled_profile: true,
        has_filled_pregnancy_status: true, // No need to remember if user has filled this info
        has_filled_children_info: true, // No need to remember if user has filled this info
      },
      headers: {
        'Accept-Language': 'en',
        Authorization: 'Token ' + session!,
      },
    });

    console.log(response.data);
    if(response.error){
      console.log(response.error)
    }
  };

  return (
    <SafeAreaView style={{flex:1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <Text style={GlobalStyles.HeadingText}>Privacy Policy</Text>
        <ScrollView>
          <Text style={[GlobalStyles.NormalText, {textAlign: 'justify'}]}>{privacyPolicy}</Text>
          <CheckBox label="I have read and accept the Privacy Policy" initIsChecked={false} onChange={(v)=>{setIsAccept(v)}}/>
          <View style={{width: '100%', height: 80}} />
        </ScrollView>
        <Button 
          style={styles.continueButton}
          buttonType={isAccept ? ButtonStyles.FILLED : ButtonStyles.DISABLED}
          label="Continue"
          onPress={handleContinue}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.large,
    gap: Spacing.large,
    marginTop: Spacing.xxlarge,
    backgroundColor: '#fff',
  },
  continueButton: {
    position: 'absolute',
    bottom: 0,
    left:Spacing.large,
    right: Spacing.large
  }
});