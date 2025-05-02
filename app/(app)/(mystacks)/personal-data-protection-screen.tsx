import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';
import { useAuth } from '@/context/AuthContext';

export default function PersonalDataProtectionScreen() {
  const {profile} = useAuth();

  const languageLinks = {
    en: 'https://heradigitalhealth.org/data-protection-policy/',
    ar: 'https://heradigitalhealth.org/ar/data-protection-policy/',
    tr: 'https://heradigitalhealth.org/tr/kisisel-verilerin-korunmasi-politikasi/'
  };

  return (
    <WebView
      style={styles.container}
      source={{ uri: languageLinks[profile?.language_code!] }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
