import { color } from '@/assets/theme';
import { Stack } from 'expo-router';
import React from 'react';

export default function RegistrationProfileLayout(){
  return (
    <Stack 
      screenOptions={{
        headerTintColor: color.primary,
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="user-details" options={{title: ''}} />
      <Stack.Screen name="terms-of-use" options={{title: ''}} />
      <Stack.Screen name="privacy-policy" options={{title: ''}} />
    </Stack>
  );
}