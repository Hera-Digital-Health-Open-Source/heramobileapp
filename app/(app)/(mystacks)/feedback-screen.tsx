import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';
import { useAuth } from '@/context/AuthContext';

export default function FeedbackScreen() {
  const {profile} = useAuth();

  const languageLinks = {
    en: 'https://heradigitalhealth.org/frequently-asked-questions/',
    ar: 'https://heradigitalhealth.org/ar/frequently-asked-questions/',
    tr: 'https://heradigitalhealth.org/tr/sikca-sorulan-sorular/'
  };

  console.log(languageLinks[profile?.language_code!] );

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
