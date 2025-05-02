import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';
import { useAuth } from '@/context/AuthContext';

export default function UserAgreementScreen() {
  const {profile} = useAuth();

  const languageLinks = {
    en: 'https://heradigitalhealth.org/terms-and-conditions/',
    ar: 'https://heradigitalhealth.org/ar/terms-and-conditions/',
    tr: 'https://heradigitalhealth.org/tr/sartlar-ve-kosullar/',
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
