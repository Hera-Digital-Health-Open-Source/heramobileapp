import { Colors } from '@/assets/theme';
import { Stack } from 'expo-router';
import React from 'react';
import { useTranslation } from "@/hooks/useTranslation";
import { Platform } from "react-native";

export default function RegistrationMetaProfileLayout(){
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
      <Stack.Screen name="pregnancy-yes-no" options={{title: ''}} />
      <Stack.Screen name="children" options={{title: ''}} />
      <Stack.Screen name="child-add" options={{title: ''}} />
      <Stack.Screen name="child-info" options={{title: ''}} />
      <Stack.Screen name="pregnancy-info-complete" options={{title: ''}} />
      <Stack.Screen name="pregnancy-info" options={{title: ''}} />
    </Stack>
  );
}