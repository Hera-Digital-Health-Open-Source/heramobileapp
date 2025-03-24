import { color } from "@/assets/theme";
import { Stack } from "expo-router";

export default function StacksLayout(){
  return (
    <Stack screenOptions={{
      headerTintColor: color.primary,
      headerShown: true,
      headerTitle: '',
      headerShadowVisible: false,
    }}>
      <Stack.Screen name="index" options={{headerShown: false}} />
    </Stack>  
  );
}