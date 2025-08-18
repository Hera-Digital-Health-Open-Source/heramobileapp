import { Colors } from '@/assets/theme';
import { Stack } from 'expo-router';
import React from 'react';
import { useTranslation } from "@/hooks/useTranslation";
import { Platform } from "react-native";

export default function RegistrationProfileLayout(){
  const { locale } = useTranslation(); // Subscribe to locale changes
  
  return (
    <Stack 
      screenOptions={{
        headerTintColor: Colors.primary,
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerShadowVisible: false,
        // Platform-specific back button configuration
        ...(Platform.OS === 'ios' ? {
          headerBackTitle: ' ', // Empty space for iOS to remove text
          headerBackTitleVisible: false,
        } : {
          headerBackTitle: '', // Empty string for Android
        }),
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen name="user-details" options={{title: ''}} />
      <Stack.Screen name="terms-of-use" options={{title: ''}} />
      <Stack.Screen name="privacy-policy" options={{title: ''}} />
    </Stack>
  );
}