import { Stack } from "expo-router";

export default function AuthLayout({children}: {children: React.ReactNode}){
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="login" />
      <Stack.Screen name="otp-screen" />
      <Stack.Screen name="web-view-screen" />
    </Stack>  
  );
}