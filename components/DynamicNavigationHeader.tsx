import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from '@/hooks/useTranslation';
import { Colors } from '@/assets/theme';
import { Platform } from 'react-native';
import CustomBackButton from './CustomBackButton';

interface DynamicNavigationHeaderProps {
  title?: string;
  showBackButton?: boolean;
  showBackText?: boolean;
}

export const DynamicNavigationHeader: React.FC<DynamicNavigationHeaderProps> = ({
  title = '',
  showBackButton = true,
  showBackText = false,
}) => {
  const navigation = useNavigation();
  const { t, locale } = useTranslation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: title,
      headerTintColor: Colors.primary,
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerShadowVisible: false,
      // Use custom back button
      headerLeft: showBackButton ? () => <CustomBackButton showText={showBackText} /> : undefined,
      // Hide default back button
      headerBackVisible: false,
      headerTitleAlign: 'center',
    });
  }, [navigation, title, locale, showBackButton, showBackText]); // Re-run when locale changes

  return null; // This component doesn't render anything
};

export default DynamicNavigationHeader;
