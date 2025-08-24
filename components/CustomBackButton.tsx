import React from 'react';
import { Pressable, Text, Platform, I18nManager } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from '@/hooks/useTranslation';
import { Colors } from '@/assets/theme';

interface CustomBackButtonProps {
  showText?: boolean;
  textStyle?: any;
}

export const CustomBackButton: React.FC<CustomBackButtonProps> = ({ 
  showText = false, 
  textStyle 
}) => {
  const navigation = useNavigation();
  const { t, locale } = useTranslation();

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  // Get the correct back icon based on platform and RTL direction
  const getBackIcon = () => {
    const isRTL = I18nManager.isRTL || locale === 'ar';
    
    if (Platform.OS === 'ios') {
      return isRTL ? 'chevron-forward' : 'chevron-back';
    } else {
      return isRTL ? 'arrow-forward' : 'arrow-back';
    }
  };

  return (
    <Pressable 
      onPress={handleGoBack}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
      }}
    >
      <Ionicons 
        name={getBackIcon()} 
        size={24} 
        color={Colors.primary} 
      />
      {showText && (
        <Text 
          style={[
            { 
              color: Colors.primary, 
              fontSize: 16,
              marginLeft: 4 
            }, 
            textStyle
          ]}
        >
          {t('intro_screen_back')}
        </Text>
      )}
    </Pressable>
  );
};

export default CustomBackButton;
