import React from 'react';
import { TouchableOpacity, TouchableNativeFeedback, Text, Platform, I18nManager, View } from 'react-native';
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

  const handlePress = () => {
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

  if (Platform.OS === 'android') {
    const androidButtonContent = (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          width: 48,
          height: 48,
          borderRadius: 24,
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
      </View>
    );

    return (
      <TouchableNativeFeedback
        onPressOut={handlePress}
        background={TouchableNativeFeedback.Ripple('#eee', true)}
        accessibilityRole="button"
        accessibilityLabel="Back button"
        useForeground={true}
        delayPressIn={0}
        delayPressOut={0}
        delayLongPress={500}
      >
        <View style={{ overflow: 'hidden', borderRadius: 24, width: 48, height: 48 }}>
          {androidButtonContent}
        </View>
      </TouchableNativeFeedback>
    );
  }

  // iOS button content - more traditional iOS styling
  return (
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.6}
      accessibilityRole="button"
      accessibilityLabel="Back button"
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
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
    </TouchableOpacity>
  );
};

export default CustomBackButton;
