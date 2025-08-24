import { Colors } from "@/assets/theme";
import { Stack } from "expo-router";
import { useTranslation } from "@/hooks/useTranslation";
import { Platform } from "react-native";
import CustomBackButton from "@/components/CustomBackButton";

export default function StacksLayout(){
  const { locale } = useTranslation(); // Subscribe to locale changes
  
  return (
    <Stack screenOptions={{
      headerTintColor: Colors.primary,
      headerShown: true,
      headerTitle: '',
      headerShadowVisible: false,
      // Use custom back button that respects language changes
      headerLeft: (props) => props.canGoBack ? <CustomBackButton /> : undefined,
      headerBackVisible: false, // Hide default back button
      headerTitleAlign: 'center',
    }}>
      <Stack.Screen name="index" options={{headerShown: false}} />
    </Stack>  
  );
}