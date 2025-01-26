import { color } from '@/assets/theme';
import { Stack } from 'expo-router';
import React from 'react';

export default function RegistrationLayout(){
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
      <Stack.Screen name="pregnancy-yes-no" options={{title: ''}} />
      <Stack.Screen name="privacy-policy" options={{title: ''}} />
      <Stack.Screen name="children" options={{title: ''}} />
      <Stack.Screen name="child-add" options={{title: ''}} />
      <Stack.Screen name="child-info" options={{title: ''}} />
      <Stack.Screen name="pregnancy-info-complete" options={{title: ''}} />
      <Stack.Screen name="pregnancy-info" options={{title: ''}} />
    </Stack>
  );
}